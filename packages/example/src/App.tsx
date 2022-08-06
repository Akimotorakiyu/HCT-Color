import { defineFunctionComponent } from './func/defineFunctionComponent'
import { getGreeting } from '@template/template'
import { computed, ref, watch } from 'vue'

export function renderData(
  context2D: CanvasRenderingContext2D,
  imageData: ImageData,
) {
  context2D.putImageData(imageData, 0, 0)
}

export function clearContext(context2D: CanvasRenderingContext2D) {
  const { width, height } = context2D.canvas
  context2D.clearRect(0, 0, width, height)
}

export const CanvasPanel = defineFunctionComponent(
  (props: { imageBitmapRender?: (imageBitmap: ImageData) => ImageData }) => {
    const { imageBitmapRender } = props
    const canvas = ref<HTMLCanvasElement>()
    const context2D = computed(() => {
      return canvas.value?.getContext('2d')
    })

    watch(context2D, () => {
      if (context2D.value) {
        if (imageBitmapRender) {
          const imageData = context2D.value.createImageData(
            context2D.value.canvas.width,
            context2D.value.canvas.height,
          )
          renderData(context2D.value, imageBitmapRender(imageData))
        } else {
          clearContext(context2D.value)
        }
      }
    })

    return {
      render() {
        return <canvas width="100" height="100" ref={canvas}></canvas>
      },
    }
  },
)

export const ColorPicker = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <CanvasPanel
          imageBitmapRender={(imageData) => {
            for (let i = 0; i < imageData.data.length; i += 4) {
              // Modify pixel data
              imageData.data[i + 0] = 190 // R value
              imageData.data[i + 1] = 0 // G value
              imageData.data[i + 2] = 210 // B value
              imageData.data[i + 3] = 255 // A value
            }
            return imageData
          }}
        ></CanvasPanel>
      )
    },
  }
})

export const App = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <div>
          {getGreeting()}
          <ColorPicker></ColorPicker>
        </div>
      )
    },
  }
})
