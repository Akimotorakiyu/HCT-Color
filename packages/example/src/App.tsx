import { defineFunctionComponent } from './func/defineFunctionComponent'
import { getGreeting } from '@template/template'
import { computed, Ref, ref } from 'vue'
import { getHctColor, rgbaFromHct, TColorHCT, EColorHCT } from './hct'
import {
  alphaFromArgb,
  blueFromArgb,
  greenFromArgb,
  redFromArgb,
} from '@material/material-color-utilities'
import { CanvasPanel } from './canvasPanel'

export const ColorPickerHue = defineFunctionComponent(
  ({ color, modes }: { color: Ref<TColorHCT>; modes: EColorHCT[] }) => {
    return {
      render() {
        return (
          <div class="h-full relative">
            <CanvasPanel
              onMove={(x, y) => {
                color.value.forEach((value, index) => {
                  if (modes.includes(index)) {
                    color.value[index] = y
                  }
                })
              }}
              imageBitmapRender={(imageData, width, height) => {
                for (let x = 0; x < width; x++) {
                  const color = getHctColor([x / height, 1, 0.6, 1])
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
          </div>
        )
      },
    }
  },
)

export const ColorPickerChromaTone = defineFunctionComponent(
  ({ color, modes }: { color: Ref<TColorHCT>; modes: EColorHCT[] }) => {
    return {
      render() {
        return (
          <CanvasPanel
            onMove={(x, y) => {
              color.value.forEach((value, index) => {
                if (modes.includes(index)) {
                  color.value[index] = y
                }
              })
            }}
            imageBitmapRender={(imageData, width, height) => {
              for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                  const i = width * y * 4 + x * 4

                  const color = getHctColor([0, x / width, y / height, 1])
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
  },
)

export const ColorPickerAlpha = defineFunctionComponent(
  ({ color, modes }: { color: Ref<TColorHCT>; modes: EColorHCT[] }) => {
    return {
      render() {
        return (
          <CanvasPanel
            onMove={(x, y) => {
              color.value.forEach((value, index) => {
                if (modes.includes(index)) {
                  color.value[index] = y
                }
              })
            }}
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
  },
)

export const ColorPicker = defineFunctionComponent(() => {
  const color = ref<TColorHCT>([0.5, 0.6, 0.7, 1])

  const hctColor = computed(() => {
    const hctColor = getHctColor(color.value)

    return hctColor
  })

  const rgbaColor = computed(() => {
    const hctColor = getHctColor(color.value)
    const argb = rgbaFromHct(hctColor)

    return argb
  })

  return {
    render() {
      return (
        <div class="h-full">
          <div class="h-full grid grid-cols-12 grid-rows-6">
            <div class="col-span-11 row-span-5 shadow-gray-400 shadow-sm">
              <ColorPickerChromaTone
                color={color}
                modes={[EColorHCT.chroma, EColorHCT.tone]}
              ></ColorPickerChromaTone>
            </div>
            <div class="col-span-1 row-span-5 shadow-gray-400 shadow-sm">
              <ColorPickerAlpha
                color={color}
                modes={[EColorHCT.alpha]}
              ></ColorPickerAlpha>
            </div>
            <div class="col-span-11 row-span-1 shadow-gray-400 shadow-sm">
              <ColorPickerHue
                color={color}
                modes={[EColorHCT.hue]}
              ></ColorPickerHue>
            </div>
          </div>
          <div>
            {color.value[0]},{color.value[1]},{color.value[2]},{color.value[3]}
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
          <div class="flex justify-center">
            <div class=" h-80 w-80">
              <ColorPicker></ColorPicker>
            </div>
          </div>
        </div>
      )
    },
  }
})
