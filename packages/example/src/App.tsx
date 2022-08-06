import { defineFunctionComponent } from './func/defineFunctionComponent'
import { computed, ref, Ref } from 'vue'
import { TColorHCT, getHctColor, rgbaFromHct } from './hct'
import { ChromaTonePicker } from './picker/chromaTone'
import { AlphaPicker } from './picker/alphaPicker'
import { HuePicker } from './picker/huePicker'

export const HctCard = defineFunctionComponent(
  (props: { color: Ref<TColorHCT> }) => {
    const { color } = props
    const rgbaColor = computed(() => {
      const hctColor = getHctColor(color.value)
      const rgbaColor = rgbaFromHct(hctColor)
      return rgbaColor
    })
    return {
      render() {
        return (
          <div
            class="w-full h-full"
            style={{
              backgroundColor: `rgba(${rgbaColor.value[0]},${rgbaColor.value[1]},${rgbaColor.value[2]},${color.value[3]})`,
            }}
          ></div>
        )
      },
    }
  },
)

export const ColorPicker = defineFunctionComponent(() => {
  const color = ref<TColorHCT>([0.5, 0.6, 0.7, 1])

  return {
    render() {
      return (
        <div>
          <div class="h-80 w-80 grid grid-cols-6 grid-rows-6 gap-2">
            <div class="col-span-5 row-span-5 shadow-gray-400 shadow-sm">
              <ChromaTonePicker color={color}></ChromaTonePicker>
            </div>
            <div class="col-span-1 row-span-5 shadow-gray-400 shadow-sm">
              <AlphaPicker color={color}></AlphaPicker>
            </div>
            <div class="col-span-5 row-span-1 shadow-gray-400 shadow-sm">
              <HuePicker color={color}></HuePicker>
            </div>
            <div class="col-span-1 row-span-1 shadow-gray-400 shadow-sm">
              <HctCard color={color}></HctCard>
            </div>
          </div>
          <div>
            <div class="flex justify-center mt-3">
              hct(
              <span class="inline-block w-8 text-right">
                {Math.round(color.value[0] * 360)},
              </span>
              <span class="inline-block w-6 text-right">
                {Math.round(color.value[1] * 100)},
              </span>
              <span class="inline-block w-6 text-right">
                {Math.round(color.value[2] * 100)},
              </span>
              <span class="inline-block w-8 text-right">
                {color.value[3].toFixed(2)}
              </span>
              )
            </div>
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
          <h1 class="flex justify-center leading-9">HCT Color Picker</h1>
          <div class="flex justify-center">
            <ColorPicker></ColorPicker>
          </div>
          <div class="flex justify-center">
            <a
              href="https://github.com/Akimotorakiyu/HCT-Color"
              target="_blank"
              class="text-blue-300 mt-3"
            >
              Github
            </a>
          </div>
          <div class="flex justify-center">
            <span class=" text-gray-400">
              use{' '}
              <a
                href="https://github.com/material-foundation/material-color-utilities"
                target="_blank"
                class="text-blue-300"
              >
                @material/material-color-utilities
              </a>
            </span>
          </div>
        </div>
      )
    },
  }
})
