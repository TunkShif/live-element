import LiveViewJS from "./liveview-js"

interface QueryOptions {
  customRoot?: boolean
  all?: boolean
  part?: boolean
}

export const query =
  (query: string, options?: QueryOptions) => (target: any, propertyKey: string) => {
    const key = `_${propertyKey}`
    Reflect.defineProperty(target, propertyKey, {
      get(this: any) {
        if (this[key] === undefined) {
          const root = options?.customRoot ? this.root : this
          const selector = options?.part ? `[data-part="${query}"]` : query
          if (options?.all) {
            this[key] = root.querySelectorAll(selector)
          } else {
            this[key] = root.querySelector(selector)
          }
        }
        return this[key]
      },
      enumerable: true,
      configurable: true
    })
  }

interface AttrOptions {
  converter?: (val: string | null) => any
  live?: boolean
}

export const attr =
  (name: string, options?: AttrOptions) => (target: Element, propertyKey: string) => {
    Reflect.defineProperty(target, propertyKey, {
      get(this: Element) {
        const value = this.getAttribute(name)
        return options?.converter ? options.converter(value) : value
      },
      set(this: Element, value: string) {
        if (options?.live) {
          LiveViewJS.setAttribute(this, name, value)
        } else {
          this.setAttribute(name, value)
        }
      },
      enumerable: true,
      configurable: true
    })
  }
