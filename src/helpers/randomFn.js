import { clickedBlocks } from "./blocks"

export const randomElement = () => {
    let randomElem = clickedBlocks[Math.floor(Math.random() * clickedBlocks.length)]
   return randomElem.isClicked = true
}