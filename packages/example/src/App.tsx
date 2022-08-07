import { defineFunctionComponent } from './func/defineFunctionComponent'
import { ref } from 'vue'
import { TColorHCT } from './hct'
import { ChromaTonePicker } from './picker/chromaTone'
import { AlphaPicker } from './picker/alphaPicker'
import { HuePicker } from './picker/huePicker'
import { HctCard } from './card'
import { Theme } from './theme'

export const ColorPicker = defineFunctionComponent(() => {
  const color = ref<TColorHCT>([0.5, 0.6, 0.7, 1])

  const showTheme = ref(false)

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
          <div class="flex justify-center my-4">
            <button
              class=" shadow-sm shadow-gray-300 bg-blue-500 text-light-50 rounded px-4 py-1"
              onClick={() => {
                showTheme.value = !showTheme.value
              }}
            >
              {showTheme.value ? 'show theme ' : 'hide theme'}
            </button>
          </div>
          {showTheme.value && <Theme color={color}></Theme>}
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
          <div></div>
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
