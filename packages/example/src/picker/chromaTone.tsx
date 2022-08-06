import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { Ref } from 'vue'
import { TColorHCT, EColorHCT, calcHctColorAndToRgba } from '../hct'

import { CanvasPanel } from '../canvasPanel'

export const ChromaTonePicker = defineFunctionComponent(
  ({ color }: { color: Ref<TColorHCT> }) => {
    return {
      render() {
        return (
          <CanvasPanel
            throttleFrame={80}
            onMove={(x, y) => {
              color.value[1] = x
              color.value[2] = y
            }}
            imageBitmapRender={(imageData, width, height) => {
              const map = new Map<
                `${number}-${number}-${number}`,
                readonly [number, number, number, number]
              >()

              for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                  const i = width * y * 4 + x * 4

                  const argb = calcHctColorAndToRgba(
                    [color.value[0], x / width, y / height, 1],
                    map,
                  )

                  imageData.data[i + 0] = argb[0] // R value
                  imageData.data[i + 1] = argb[1] // G value
                  imageData.data[i + 2] = argb[2] // B value
                  imageData.data[i + 3] = argb[3] // A value
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
