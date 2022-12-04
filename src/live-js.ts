import { JSCommandMap } from "./types"

const command = <TKind extends keyof JSCommandMap>(kind: TKind, args: JSCommandMap[TKind]) =>
  JSON.stringify([[kind, args]])

export class LiveJS {
  static get liveSocket() {
    if (!window.liveSocket) throw new Error("LiveSocket not initialized.")
    return window.liveSocket
  }

  static execute(element: Element, command: string | undefined | null) {
    this.liveSocket.execJS(element, command || "[]")
  }

  static setAttribute(element: Element, name: string, value: string, to: string | null = null) {
    this.execute(element, command("set_attr", { attr: [name, value], to: to }))
  }

  static removeAttribute(element: Element, name: string, to: string | null = null) {
    this.execute(element, command("remove_attr", { attr: name, to: to }))
  }
}
