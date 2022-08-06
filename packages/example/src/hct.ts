import {
  alphaFromArgb,
  blueFromArgb,
  greenFromArgb,
  Hct,
  redFromArgb,
} from '@material/material-color-utilities'

export enum EColorHCT {
  hue,
  chroma,
  tone,
  alpha,
}
export type TEColorHCT = typeof EColorHCT

export type TMode = 'tone' | 'hue' | 'chroma' | 'alpha'

export type TColorHCT = [
  hue: number,
  chroma: number,
  tone: number,
  alpha: number,
]

function getChanel(start: number, end: number, percent: number) {
  const length = end - start
  const res = start + percent * length
  return res
}

export function rgbaFromHct(color: Hct) {
  const argb = color.toInt()

  return [
    redFromArgb(argb),
    greenFromArgb(argb),
    blueFromArgb(argb),
    alphaFromArgb(argb),
  ] as const
}

export function getHctColor(hctPercent: TColorHCT) {
  const hue = getChanel(0, 360, hctPercent[0])
  const chroma = getChanel(0, 100, hctPercent[1])
  const tone = getChanel(0, 100, hctPercent[2])

  const color = Hct.from(hue, chroma, tone)

  return color
}
