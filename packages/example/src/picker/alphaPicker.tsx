import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { computed, Ref } from 'vue'
import { getHctColor, rgbaFromHct, TColorHCT } from '../hct'

import { CanvasPanel } from '../canvasPanel'

export const AlphaPicker = defineFunctionComponent(
  ({ color }: { color: Ref<TColorHCT> }) => {
    const rgbaColor = computed(() => {
      const hctColor = getHctColor(color.value)
      const rgbaColor = rgbaFromHct(hctColor)
      return rgbaColor
    })

    return {
      render() {
        return (
          <CanvasPanel
            onMove={(x, y) => {
              color.value[3] = y
            }}
            imageBitmapRender={(imageData, width, height) => {
              const argb = rgbaColor.value

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
