import { defineFunctionComponent } from './func/defineFunctionComponent'
import { getGreeting } from '@template/template'
import { ref } from 'vue'
import { TColorHCT, EColorHCT } from './hct'
import { ChromaTonePicker } from './picker/chromaTone'
import { AlphaPicker } from './picker/alphaPicker'
import { HuePicker } from './picker/huePicker'

export const ColorPicker = defineFunctionComponent(() => {
  const color = ref<TColorHCT>([0.5, 0.6, 0.7, 1])

  return {
    render() {
      return (
        <div class="h-full">
          <div class="h-full grid grid-cols-12 grid-rows-6">
            <div class="col-span-11 row-span-5 shadow-gray-400 shadow-sm">
              <ChromaTonePicker
                color={color}
                modes={[EColorHCT.chroma, EColorHCT.tone]}
              ></ChromaTonePicker>
            </div>
            <div class="col-span-1 row-span-5 shadow-gray-400 shadow-sm">
              <AlphaPicker
                color={color}
                modes={[EColorHCT.alpha]}
              ></AlphaPicker>
            </div>
            <div class="col-span-11 row-span-1 shadow-gray-400 shadow-sm">
              <HuePicker color={color} modes={[EColorHCT.hue]}></HuePicker>
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
