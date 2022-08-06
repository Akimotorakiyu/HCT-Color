import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { Ref } from 'vue'
import { getHctColor, rgbaFromHct, TColorHCT, EColorHCT } from '../hct'

import { CanvasPanel } from '../canvasPanel'

export const AlphaPicker = defineFunctionComponent(
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
