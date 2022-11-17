import { cyan, magenta } from "colors";

export default function logger(key: string,value: string ){
    console.log(`${magenta(`${key}:`)} ${cyan(value)}`)
}