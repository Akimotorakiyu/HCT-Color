import axios from 'axios'
import { URL } from 'url'
export async function main() {
  const url = `https://www.baidu.com`
  const res = await (await axios.get(url)).data
  console.log(res)
  console.log(new URL(url))
}

main()
