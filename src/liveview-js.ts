import { JSCommandMap } from "./types"

const command = <TKind extends keyof JSCommandMap>(kind: TKind, args: JSCommandMap[TKind]) =>
  JSON.stringify([[kind, args]])

const LiveViewJS = {
  exec(element: Element, command: string | undefined | null) {
    window.liveSocket.execJS(element, command || "[]")
  },
  setAttribute(element: Element, name: string, value: string, to: string | null = null) {
    LiveViewJS.exec(element, command("set_attr", { attr: [name, value], to: to }))
  },
  removeAttribute(element: Element, name: string, to: string | null = null) {
    LiveViewJS.exec(element, command("remove_attr", { attr: name, to: to }))
  }
}

export default LiveViewJS
