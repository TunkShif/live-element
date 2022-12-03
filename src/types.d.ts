declare global {
  class LiveSocket {
    execJS(el: Element, js: string): void
  }

  interface Window {
    liveSocket: LiveSocket
  }
}

export interface JSCommandMap {
  set_attr: {
    attr: [string, string]
    to: string | null
  }
  remove_attr: {
    attr: string
    to: string | null
  }
}
