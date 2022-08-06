import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { computed, Ref } from 'vue'
import { getHctColor, TColorHCT, EColorHCT, rgbaFromHct } from '../hct'

import { CanvasPanel } from '../canvasPanel'
import {
  alphaFromArgb,
  blueFromArgb,
  greenFromArgb,
  redFromArgb,
} from '@material/material-color-utilities'

export const ChromaTonePicker = defineFunctionComponent(
  ({ color, modes }: { color: Ref<TColorHCT>; modes: EColorHCT[] }) => {
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

                  const hctColor = getHctColor([
                    color.value[0],
                    x / width,
                    y / height,
                    1,
                  ])
                  const argb = hctColor.toInt()

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
