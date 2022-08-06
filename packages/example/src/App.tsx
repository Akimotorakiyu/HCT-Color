import { defineFunctionComponent } from './func/defineFunctionComponent'
import { getGreeting } from '@template/template'
import { computed, ref, watch } from 'vue'
import {
  getHctColor,
  getModePixelColor,
  getModePixelColorXY,
  rgbaFromHct,
} from './hct'
import {
  alphaFromArgb,
  blueFromArgb,
  greenFromArgb,
  redFromArgb,
} from '@material/material-color-utilities'

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
            for (let x = 0; x < width; x++) {
              const color = getModePixelColor('tone', x / height)
              for (let y = 0; y < height; y++) {
                const i = width * y * 4 + x * 4

                const argb = color.toInt()

                imageData.data[i + 0] = redFromArgb(argb) // R value
                imageData.data[i + 1] = greenFromArgb(argb) // G value
                imageData.data[i + 2] = blueFromArgb(argb) // B value
                imageData.data[i + 3] = alphaFromArgb(argb) // A value
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

                const color = getModePixelColorXY('tone', x / width, y / height)
                const argb = color.toInt()

                imageData.data[i + 0] = redFromArgb(argb) // R value
                imageData.data[i + 1] = greenFromArgb(argb) // G value
                imageData.data[i + 2] = blueFromArgb(argb) // B value
                imageData.data[i + 3] = alphaFromArgb(argb) // A value
              }
            }
            return imageData
          }}
        ></CanvasPanel>
      )
    },
  }
})

export const ColorPickerAlpha = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <CanvasPanel
          imageBitmapRender={(imageData, width, height) => {
            const color = getHctColor([0, 0.6, 0.7, 1])
            const argb = rgbaFromHct(color)
            console.log(argb)

            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const i = width * y * 4 + x * 4

                imageData.data[i + 0] = argb[0] // R value
                imageData.data[i + 1] = argb[1] // G value
                imageData.data[i + 2] = argb[2] // B value
                imageData.data[i + 3] = (y / height) * 255 // A value
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
        <div class="h-full grid grid-cols-12 grid-rows-6">
          <div class="col-span-11 row-span-5">
            <ColorPickerXY></ColorPickerXY>
          </div>
          <div class="col-span-1 row-span-5">
            <ColorPickerAlpha></ColorPickerAlpha>
          </div>
          <div class="col-span-11 row-span-1 ">
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
