type Constructor<T = {}> = new (...args: any[]) => T

export const LiveMixin = <TClass extends Constructor<HTMLElement>>(superClass: TClass) =>
  class extends superClass {
    connectedCallback() { }

    updatedCallback(
      _attribute: string,
      _oldValue: string | undefined | null,
      _newValue: string | undefined | null
    ) { }

    disconnectedCallback() { }

    attributeChangedCallback(
      attribute: string,
      oldValue: string | undefined | null,
      newValue: string | undefined | null
    ) {
      // `attributeChangedCallback` will be called when the component is mounted
      // at the first time with a null `oldValue`, even though the attribute is
      // set in the html, here we're preventing handle changes for this situation
      if (oldValue === null && newValue !== null) return
      if (oldValue === newValue) return
      this.updatedCallback(attribute, oldValue, newValue)
    }
  }

export const LiveElement = LiveMixin(HTMLElement)
