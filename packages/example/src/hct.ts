import { Hct } from '@material/material-color-utilities'

type TColorHCT = [R: number, G: number, B: number, A: number]

function getChanel(start: number, end: number, percent: number) {
  const length = end - start
  const res = start + percent * length
  return res
}

function getHctColor(hctPercent: TColorHCT) {
  const hue = getChanel(0, 360, hctPercent[0])
  const chroma = getChanel(0, 100, hctPercent[1])
  const tone = getChanel(0, 100, hctPercent[2])

  const color = Hct.from(hue, chroma, tone)

  return color
}

type TMode = 'tone' | 'hue' | 'chroma'

export function getModePixelColor(mode: TMode, percentX: number) {
  switch (mode) {
    case 'tone':
      return getHctColor([percentX, 1, 0.6, 1])

      break

    default:
      break
  }
  return Hct.fromInt(0)
}

export function getModePixelColorXY(
  mode: TMode,
  percentX: number,
  percentY: number,
) {
  switch (mode) {
    case 'tone':
      return getHctColor([0, percentX, percentY, 1])
      break

    default:
      break
  }
  return Hct.fromInt(0)
}
