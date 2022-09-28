import { Locator } from "@playwright/test"

export async function getElementPropertyValue(element: Locator, value: string) {
   return await ((element)).evaluate((el, value) => {
       return window.getComputedStyle(el).getPropertyValue(value)
    }, value)
}
