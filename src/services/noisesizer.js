class NoiseSizer {
  constructor() {
    this.distance = 900
    this.fov = 50
  }

  getWidth = () => {
    return this.getHeight() * (window.innerWidth / window.innerHeight)
  }

  getHeight = () => {
    const vFOV = (this.fov * Math.PI) / 180
    const fullHeight = 2 * Math.tan(vFOV / 2) * Math.abs(this.distance)

    return Math.min(550, fullHeight * 0.9)
  }

  getCameraHeight = () => {
    return this.getHeight() * 0.45
  }
}

export default new NoiseSizer()
