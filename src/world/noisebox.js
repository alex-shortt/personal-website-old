import PerlinNoise from "perlin-noise-3d"
import * as THREE from "three"

import NoiseSizer from "services/noisesizer"

export default class NoiseBox {
  constructor(props = {}) {
    const { seed = Math.random() * 10000 } = props

    // perlin noise
    const noise = new PerlinNoise()
    noise.noiseSeed(seed)

    // constants
    this.distance = 900
    this.resolution = 328 // zoom
    this.density = 20 // grooves per unit distance
    this.depth = 100 // depth of the grooves
    this.speed = 0.5
    this.WIDTH = NoiseSizer.getWidth()
    this.HEIGHT = NoiseSizer.getHeight()
    this.lightIntensity = 0.8
    this.lightColorDifference = 1.26

    // clock
    const clock = new THREE.Clock()

    // exports
    this.noise = noise
    this.clock = clock

    this.setupPlane()
    this.setupLights()
  }

  setupPlane = () => {
    const { WIDTH, HEIGHT, distance } = this

    // geometry
    const geometry = new THREE.PlaneGeometry(2000, 2000, 200, 200)
    geometry.dynamic = true

    // material
    const material = new THREE.MeshPhongMaterial({
      shading: THREE.SmoothShading,
      shininess: 0.4,
      specular: 0xffffff
    })

    // plane
    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = Math.PI
    plane.position.z = distance
    plane.position.y = HEIGHT / 2
    plane.scale.set(WIDTH / 2000, HEIGHT / 2000, 1)

    // exports
    this.plane = plane
  }

  setupLights = () => {
    const { WIDTH, HEIGHT, lightIntensity, distance, depth } = this

    // create lights
    const lights = []
    const numlights = 3
    for (let i = 0; i < numlights; i += 1) {
      lights.push(new THREE.PointLight(0xff0000, lightIntensity))
    }

    for (const [i, light] of lights.entries()) {
      const x = -WIDTH / 2 + WIDTH * (i / (lights.length - 1))
      const y = -HEIGHT / 2
      const z = distance - depth - 50
      light.position.set(x, y, z)
    }

    // exports
    this.lights = lights
  }

  addToScene = scene => {
    const { plane, lights } = this

    scene.add(plane)

    for (const light of lights) {
      scene.add(light)
    }
  }

  addGuiFolder = gui => {
    const folder = gui.addFolder("Noise Box")
    folder.add(this, "speed", 0, 2)

    // noise
    const noiseFolder = folder.addFolder("Noise")
    noiseFolder.add(this, "resolution", 100, 1000)
    noiseFolder.add(this, "density", 0, 40, 0.5)
    noiseFolder.add(this, "depth", 0, 100)

    // lights
    const lightsFolder = folder.addFolder("Lights")
    lightsFolder.add(this, "lightIntensity", 0, 1, 0.1)
    lightsFolder.add(this, "lightColorDifference", 0.5, 5, 0.01)
  }

  render = (renderer, scene) => {
    const { plane, noise, WIDTH, HEIGHT, clock, lights } = this
    const { resolution, density, depth, speed } = this

    const time = clock.getElapsedTime()

    // update noise
    for (let i = 0; i < plane.geometry.vertices.length; i += 1) {
      const vertex = plane.geometry.vertices[i]
      const x = (vertex.x + 1000) / resolution
      const y = (vertex.y + 1000) / resolution
      const vNoise = noise.get(x, y) * density

      let heightMult = Math.cos(time * speed + vNoise) * 0.5 + 0.5
      if (heightMult > 0.99) {
        heightMult = 0.99
      }

      vertex.z = heightMult * depth
    }

    // update lights
    for (const [i, light] of lights.entries()) {
      const huePos = time * speed * 0.15 * Math.pow(-1, i)
      const hue = (huePos + (i / lights.length) * this.lightColorDifference) % 1
      const sat = 1
      const value = 1
      const [hu, sa, l] = hsvToHSL(hue, sat, value)

      light.color.setHSL(hu, sa, l)
      light.intensity = this.lightIntensity
    }

    // request plane re-render
    plane.geometry.verticesNeedUpdate = true
  }

  handleResize = () => {
    const { plane, lights, distance, depth } = this

    const width = NoiseSizer.getWidth()
    const height = NoiseSizer.getHeight()

    // update plane
    plane.scale.set(width / 2000, height / 2000, 1)
    plane.position.y = height / 2

    // update lights
    for (const [i, light] of lights.entries()) {
      const x = -width / 2 + width * (i / (lights.length - 1))
      const y = -height / 2
      const z = distance - depth - 50
      light.position.set(x, y, z)
    }

    // exportss
    this.WIDTH = width
    this.HEIGHT = height
  }
}

function hsvToHSL(h, s, v) {
  // both hsv and hsl values are in [0, 1]
  const l = ((2 - s) * v) / 2

  if (l !== 0) {
    if (l === 1) {
      // eslint-disable-next-line no-param-reassign
      s = 0
    } else if (l < 0.5) {
      // eslint-disable-next-line no-param-reassign
      s = (s * v) / (l * 2)
    } else {
      // eslint-disable-next-line no-param-reassign
      s = (s * v) / (2 - l * 2)
    }
  }

  return [h, s, l]
}
