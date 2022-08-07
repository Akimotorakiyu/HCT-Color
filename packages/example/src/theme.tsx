import { defineFunctionComponent } from './func/defineFunctionComponent'
import { computed, Ref } from 'vue'
import { TColorHCT, getHctColor } from './hct'
import { themeFromSourceColor } from '@material/material-color-utilities'
import { ArgbCard } from './card'

export const Theme = defineFunctionComponent(
  (props: { color: Ref<TColorHCT> }) => {
    const { color } = props

    const hctColor = computed(() => {
      return getHctColor(color.value)
    })

    const theme = computed(() => {
      return themeFromSourceColor(hctColor.value?.toInt())
    })
    return {
      theme,
      render() {
        return (
          <div class="w-full h-full">
            {Object.entries(theme.value.palettes).map(([type, palette]) => {
              const tones = Array.from(Array(10))

              return (
                <div>
                  <div>{type}</div>
                  {tones.map((_, index) => {
                    const color = palette.tone(index * 10)
                    return (
                      <span class="inline-block w-8 h-8">
                        <ArgbCard key={`${color}`} color={color}></ArgbCard>
                      </span>
                    )
                  })}
                </div>
              )
            })}

            {Object.entries(theme.value.schemes).map(([type, schema]) => {
              return (
                <div>
                  <div>{type}</div>
                  <div class="grid grid-cols-2">
                    {Object.entries(schema.toJSON()).map(([type, color]) => {
                      return (
                        <span class="flex flex-col">
                          <span class="inline-block  w-32  h-32  text-center">
                            <ArgbCard key={`${color}`} color={color}></ArgbCard>
                          </span>
                          <span class=" text-xs">{type}</span>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )
      },
    }
  },
)
