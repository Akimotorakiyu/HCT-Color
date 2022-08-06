import {
  alphaFromArgb,
  blueFromArgb,
  greenFromArgb,
  Hct,
  redFromArgb,
} from '@material/material-color-utilities'

type TColorRGBA = [R: number, G: number, B: number, A: number]

function getChanel(start: number, end: number, percent: number) {
  const length = end - start
  const res = start + percent * length
  return res
}

function getZModePixelColorWithTone(percent: number) {
  const color = Hct.from(0, 0, getChanel(0, 100, percent))

  const argb = color.toInt()

  return [
    redFromArgb(argb),
    greenFromArgb(argb),
    blueFromArgb(argb),
    alphaFromArgb(argb),
  ] as TColorRGBA
}

export function getZModePixelColor(percent: number, mode: 'Tone') {
  switch (mode) {
    case 'Tone':
      return getZModePixelColorWithTone(percent)

      break

    default:
      break
  }

  return [255, 255, 255, 255] as TColorRGBA
}
