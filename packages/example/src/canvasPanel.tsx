import { defineFunctionComponent } from './func/defineFunctionComponent'
import { computed, ref, watch, watchEffect } from 'vue'

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
    onMove: (x: number, y: number) => void
  }) => {
    const { imageBitmapRender, onMove } = props
    const canvas = ref<HTMLCanvasElement>()
    const context2D = computed(() => {
      return canvas.value?.getContext('2d')
    })

    const updater = () => {
      if (context2D.value) {
        if (imageBitmapRender) {
          const { width, height } = context2D.value.canvas
          const imageData = context2D.value.createImageData(width, height)
          const s = performance.now()
          renderData(
            context2D.value,
            imageBitmapRender(imageData, width, height),
          )

          console.log(performance.now() - s)
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
              )
            }}
            onPointermove={(event) => {
              const canvas = event.target as HTMLCanvasElement
              if (canvas.hasPointerCapture(event.pointerId)) {
                const { offsetX, offsetY } = event
                onMove?.(
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
              )
            }}
          ></canvas>
        )
      },
    }
  },
)
