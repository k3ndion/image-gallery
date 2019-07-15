class Environments {
  constructor(apiUrl = '', needUpdate = true) {
    this.apiUrl = apiUrl
    this.needUpdate = needUpdate
  }

  /** Ensure environments are loaded */
  async ensure() {
    if (this.needUpdate) await this.update()
    return this
  }

  /** Load environments */
  async update() {
    const json = await fetch('/environments.json').then(res => res.json())
    this.apiUrl = json.apiUrl
    this.needUpdate = false
    return this
  }
}

export const environments = new Environments()
