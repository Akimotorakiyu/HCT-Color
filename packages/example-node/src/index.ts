import { resolve } from 'path'
import { promises } from 'fs'

console.log('hello world!\n')

console.log('this file content:')
promises.readFile(resolve(__dirname, './index.ts')).then((value) => {
  console.log(value.toString())
})
console.log('-----------')
