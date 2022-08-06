import { defineFunctionComponent } from './func/defineFunctionComponent'
import { computed, ref, watch, watchEffect } from 'vue'

function throttle<Args extends any[], T>(
  func: (...args: Args) => T,
  timeFrame: number,
) {
  let lastTime = 0

  let hasSc = false

  const runner = function (...args: Args) {
    const now = Date.now()
    if (now - lastTime >= timeFrame) {
      hasSc = false
      func(...args)
      lastTime = now
    } else {
      if (hasSc) {
        return
      }
      hasSc = true
      setTimeout(() => {
        if (!hasSc) {
          runner(...args)
        }
      }, timeFrame - (now - lastTime))
    }
  }

  return runner
}

function renderData(context2D: CanvasRenderingContext2D, imageData: ImageData) {
  context2D.putImageData(imageData, 0, 0)
}

function clearContext(context2D: CanvasRenderingContext2D) {
  const { width, height } = context2D.canvas
  context2D.clearRect(0, 0, width, height)
}

export const CanvasPanel = defineFunctionComponent(
  (props: {
    imageBitmapRender?: (
      imageBitmap: ImageData,
      width: number,
      height: number,
    ) => ImageData
    onMove: (x: number, y: number, status: 'start' | 'changing' | 'end') => void
    throttleFrame?: number
  }) => {
    const { imageBitmapRender, onMove, throttleFrame } = props
    const canvas = ref<HTMLCanvasElement>()
    const context2D = computed(() => {
      return canvas.value?.getContext('2d')
    })

    const updater = () => {
      if (context2D.value) {
        if (imageBitmapRender) {
          const { width, height } = context2D.value.canvas
          const imageData = context2D.value.createImageData(width, height)
          // const s = performance.now()
          renderData(
            context2D.value,
            imageBitmapRender(imageData, width, height),
          )

          // console.log(performance.now() - s)
        } else {
          clearContext(context2D.value)
        }
      }
    }

    watch(context2D, () => {
      updater()
    })

    watchEffect(() => {
      updater()
    })

    const changing = throttleFrame
      ? throttle((x: number, y: number) => {
          onMove?.(x, y, 'changing')
        }, throttleFrame || 0)
      : (x: number, y: number) => {
          onMove?.(x, y, 'changing')
        }

    return {
      render() {
        return (
          <canvas
            ref={canvas}
            class="w-full h-full"
            onPointerdown={(event) => {
              const { offsetX, offsetY } = event

              const canvas = event.target as HTMLCanvasElement

              canvas.setPointerCapture(event.pointerId)

              onMove?.(
                offsetX / canvas.clientWidth,
                offsetY / canvas.clientHeight,
                'start',
              )
            }}
            onPointermove={(event) => {
              const canvas = event.target as HTMLCanvasElement
              const { offsetX, offsetY } = event

              if (canvas.hasPointerCapture(event.pointerId)) {
                changing(
                  offsetX / canvas.clientWidth,
                  offsetY / canvas.clientHeight,
                )
              }
            }}
            onPointerup={(event) => {
              const { offsetX, offsetY } = event

              const canvas = event.target as HTMLCanvasElement

              canvas.releasePointerCapture(event.pointerId)

              onMove?.(
                offsetX / canvas.clientWidth,
                offsetY / canvas.clientHeight,
                'end',
              )
            }}
          ></canvas>
        )
      },
    }
  },
)
