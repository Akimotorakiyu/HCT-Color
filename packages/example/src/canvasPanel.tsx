import { defineFunctionComponent } from './func/defineFunctionComponent'
import { computed, onUnmounted, ref, watch, watchEffect } from 'vue'

import { Subject } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

function renderData(context2D: CanvasRenderingContext2D, imageData: ImageData) {
  context2D.putImageData(imageData, 0, 0)
}

function clearContext(context2D: CanvasRenderingContext2D) {
  const { width, height } = context2D.canvas
  context2D.clearRect(0, 0, width, height)
}

function toRange(c: number) {
  return Math.max(0, Math.min(c, 1))
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

    const sub = new Subject<[x: number, y: number]>()

    sub.pipe(throttleTime(throttleFrame || 50)).subscribe(([x, y]) => {
      onMove?.(toRange(x), toRange(y), 'changing')
    })

    onUnmounted(() => {
      sub.unsubscribe()
    })

    return {
      render() {
        return (
          <canvas
            ref={canvas}
            class="w-full h-full select-none"
            onTouchstart={(e) => {
              e.preventDefault()
            }}
            onTouchmove={(e) => {
              e.preventDefault()
            }}
            onPointerdown={(event) => {
              const { offsetX, offsetY } = event

              const canvas = event.target as HTMLCanvasElement

              canvas.setPointerCapture(event.pointerId)

              sub.next([
                offsetX / canvas.clientWidth,
                offsetY / canvas.clientHeight,
              ])

              event.preventDefault()
            }}
            onPointermove={(event) => {
              const canvas = event.target as HTMLCanvasElement
              const { offsetX, offsetY } = event

              if (canvas.hasPointerCapture(event.pointerId)) {
                sub.next([
                  offsetX / canvas.clientWidth,
                  offsetY / canvas.clientHeight,
                ])
                event.preventDefault()
              }
            }}
            onPointerup={(event) => {
              const { offsetX, offsetY } = event

              const canvas = event.target as HTMLCanvasElement

              canvas.releasePointerCapture(event.pointerId)

              sub.next([
                offsetX / canvas.clientWidth,
                offsetY / canvas.clientHeight,
              ])
            }}
            style={{
              'background-image':
                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADBJREFUOE9jfPbs2X8GPEBSUhKfNAPjqAHDIgz+//+PNx08f/4cfzoYNYCBceiHAQC5flV5JzgrxQAAAABJRU5ErkJggg==")',
            }}
          ></canvas>
        )
      },
    }
  },
)
