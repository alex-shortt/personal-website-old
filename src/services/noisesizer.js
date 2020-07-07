export class NoiseSizer {
  constructor(props = {}) {
    const { fov = 50, distance = 900 } = props

    this.distance = distance
    this.fov = fov
  }

  getWidth = () => {
    if (window.innerWidth < 500) {
      return window.innerWidth
    }

    if (window.innerWidth < 750) {
      return Math.min(
        window.innerWidth * 0.91,
        this.getHeight() * (1000 / window.innerHeight)
      )
    }

    if (window.innerWidth < 1000) {
      return this.getHeight() * (1000 / window.innerHeight)
    }

    return Math.min(
      1200,
      this.getHeight() * (window.innerWidth / window.innerHeight)
    )
  }

  getHeight = () => {
    const vFOV = (this.fov * Math.PI) / 180
    const fullHeight = 2 * Math.tan(vFOV / 2) * Math.abs(this.distance)

    return Math.min(540, fullHeight)
  }

  getCameraHeight = () => {
    return this.getHeight() * 0.45
  }
}

export default new NoiseSizer()
