import { defineFunctionComponent } from './func/defineFunctionComponent'
import { getGreeting } from '@template/template'
import { computed, ref, watch } from 'vue'
import { getZModePixelColor } from './hct'

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
  (props: {
    imageBitmapRender?: (
      imageBitmap: ImageData,
      width: number,
      height: number,
    ) => ImageData
  }) => {
    const { imageBitmapRender } = props
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
        return <canvas class="w-full h-full" ref={canvas}></canvas>
      },
    }
  },
)

export const ColorPickerZ = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <CanvasPanel
          imageBitmapRender={(imageData, width, height) => {
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const i = width * y * 4 + x * 4

                const color = getZModePixelColor(y / height, 'Tone')

                imageData.data[i + 0] = color[0] // R value
                imageData.data[i + 1] = color[1] // G value
                imageData.data[i + 2] = color[2] // B value
                imageData.data[i + 3] = color[3] // A value
              }
            }
            return imageData
          }}
        ></CanvasPanel>
      )
    },
  }
})

export const ColorPickerXY = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <CanvasPanel
          imageBitmapRender={(imageData, width, height) => {
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const i = width * y * 4 + x * 4

                const color = getZModePixelColor(x / width, 'Tone')

                imageData.data[i + 0] = color[0] // R value
                imageData.data[i + 1] = color[1] // G value
                imageData.data[i + 2] = color[2] // B value
                imageData.data[i + 3] = color[3] // A value
              }
            }
            return imageData
          }}
        ></CanvasPanel>
      )
    },
  }
})

export const ColorPicker = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <div class="h-full flex">
          <div class="flex-1">
            <ColorPickerXY></ColorPickerXY>
          </div>
          <div class="w-10 ">
            <ColorPickerZ></ColorPickerZ>
          </div>
        </div>
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
          <div class=" h-80">
            <ColorPicker></ColorPicker>
          </div>
        </div>
      )
    },
  }
})
