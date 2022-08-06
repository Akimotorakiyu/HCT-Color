import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { Ref } from 'vue'
import { getHctColor, TColorHCT, EColorHCT } from '../hct'

import { CanvasPanel } from '../canvasPanel'
import {
  alphaFromArgb,
  blueFromArgb,
  greenFromArgb,
  redFromArgb,
} from '@material/material-color-utilities'

export const HuePicker = defineFunctionComponent(
  ({ color }: { color: Ref<TColorHCT> }) => {
    return {
      render() {
        return (
          <div class="h-full relative">
            <CanvasPanel
              onMove={(x, y) => {
                color.value[0] = x
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
