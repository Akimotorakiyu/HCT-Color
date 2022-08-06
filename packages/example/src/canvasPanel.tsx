import { defineFunctionComponent } from './func/defineFunctionComponent'
import { computed, ref, watch } from 'vue'

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
    onMove?: (x: number, y: number) => void
  }) => {
    const { imageBitmapRender, onMove } = props
    const canvas = ref<HTMLCanvasElement>()
    const context2D = computed(() => {
      return canvas.value?.getContext('2d')
    })

    watch(context2D, () => {
      if (context2D.value) {
        if (imageBitmapRender) {
          const { width, height } = context2D.value.canvas
          const imageData = context2D.value.createImageData(width, height)
          renderData(
            context2D.value,
            imageBitmapRender(imageData, width, height),
          )
        } else {
          clearContext(context2D.value)
        }
      }
    })

    return {
      render() {
        return (
          <canvas
            ref={canvas}
            class="w-full h-full"
            onClick={(event) => {
              const { offsetX, target, offsetY } = event
              event.offsetX

              const canvas = target as HTMLCanvasElement
              if (offsetX / canvas.clientWidth > 1) {
                console.log('xxxx')
              }

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
