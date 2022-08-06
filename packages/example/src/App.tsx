import { defineFunctionComponent } from './func/defineFunctionComponent'
import { getGreeting } from '@template/template'
import { computed, Ref, ref, watch } from 'vue'
import {
  getHctColor,
  getModePixelColor,
  getModePixelColorXY,
  rgbaFromHct,
  TColorHCT,
  EColorHCT,
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

export const ColorPickerHue = defineFunctionComponent(
  ({ color, modes }: { color: Ref<TColorHCT>; modes: EColorHCT[] }) => {
    const rgbaColor = computed(() => {
      const hctColor = getHctColor(color.value)
      const argb = rgbaFromHct(hctColor)

      return argb
    })
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
          </div>
        )
      },
    }
  },
)

export const ColorPickerHueChroma = defineFunctionComponent(
  ({ color, modes }: { color: Ref<TColorHCT>; modes: EColorHCT[] }) => {
    const rgbaColor = computed(() => {
      const hctColor = getHctColor(color.value)
      const argb = rgbaFromHct(hctColor)

      return argb
    })
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

                  const color = getModePixelColorXY(
                    'tone',
                    x / width,
                    y / height,
                  )
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
    const rgbaColor = computed(() => {
      const hctColor = getHctColor(color.value)
      const argb = rgbaFromHct(hctColor)

      return argb
    })
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
              <ColorPickerHueChroma
                color={color}
                modes={[EColorHCT.chroma, EColorHCT.tone]}
              ></ColorPickerHueChroma>
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
