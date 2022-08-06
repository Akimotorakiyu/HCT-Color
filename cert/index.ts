import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const certCrt = readFileSync(
  resolve(__dirname, './temp/cert.crt'),
).toString()
export const certKey = readFileSync(
  resolve(__dirname, './temp/cert.key'),
).toString()
