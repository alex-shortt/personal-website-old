export class NoiseSizer {
  constructor(props = {}) {
    const { fov = 50, distance = 900 } = props

    this.distance = distance
    this.fov = fov
  }

  getWidth = () => {
    return this.getHeight() * (window.innerWidth / window.innerHeight)
  }

  getHeight = () => {
    const vFOV = (this.fov * Math.PI) / 180
    const fullHeight = 2 * Math.tan(vFOV / 2) * Math.abs(this.distance)

    return Math.min(480, fullHeight * 0.9)
  }

  getCameraHeight = () => {
    return this.getHeight() * 0.45
  }
}

export default new NoiseSizer()
