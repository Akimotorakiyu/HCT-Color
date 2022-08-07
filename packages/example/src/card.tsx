import { defineFunctionComponent } from './func/defineFunctionComponent'
import { computed, Ref } from 'vue'
import { TColorHCT, getHctColor, rgbaFromHct, rgbaFromInt } from './hct'
import { Hct, themeFromSourceColor } from '@material/material-color-utilities'

export const HctCard = defineFunctionComponent(
  (props: { color: Ref<TColorHCT> }) => {
    const { color } = props

    const hctColor = computed(() => {
      return getHctColor(color.value)
    })
    const rgbaColor = computed(() => {
      const rgbaColor = rgbaFromHct(hctColor.value)
      return rgbaColor
    })

    return {
      render() {
        return (
          <div
            class="w-full h-full"
            style={{
              'background-image':
                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADBJREFUOE9jfPbs2X8GPEBSUhKfNAPjqAHDIgz+//+PNx08f/4cfzoYNYCBceiHAQC5flV5JzgrxQAAAABJRU5ErkJggg==")',
            }}
          >
            <div
              class="w-full h-full"
              style={{
                backgroundColor: `rgba(${rgbaColor.value[0]},${rgbaColor.value[1]},${rgbaColor.value[2]},${color.value[3]})`,
              }}
            ></div>
          </div>
        )
      },
    }
  },
)

export const ArgbCard = defineFunctionComponent((props: { color: number }) => {
  const { color } = props

  const hctColor = computed(() => {
    return Hct.fromInt(color)
  })

  const rgbaColor = computed(() => {
    const rgbaColor = rgbaFromInt(color)
    return rgbaColor
  })

  return {
    render() {
      return (
        <div
          class="w-full h-full"
          style={{
            'background-image':
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADBJREFUOE9jfPbs2X8GPEBSUhKfNAPjqAHDIgz+//+PNx08f/4cfzoYNYCBceiHAQC5flV5JzgrxQAAAABJRU5ErkJggg==")',
          }}
        >
          <div
            class="w-full h-full"
            style={{
              backgroundColor: `rgba(${rgbaColor.value[0]},${rgbaColor.value[1]},${rgbaColor.value[2]},${rgbaColor.value[3]})`,
            }}
          ></div>
        </div>
      )
    },
  }
})
