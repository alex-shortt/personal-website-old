import PerlinNoise from "perlin-noise-3d"
import * as THREE from "three"

export default class Terrain {
  constructor(props = {}) {
    const { seed = Math.random() * 10000 } = props

    // perlin noise
    const noise = new PerlinNoise()
    noise.noiseSeed(seed)

    // constants
    this.distance = 700
    this.resolution = 328 // zoom
    this.density = 20 // grooves per unit distance
    this.depth = 50 // depth of the grooves
    this.speed = 0.5
    this.WIDTH = window.innerWidth * 0.5
    this.HEIGHT = window.innerHeight * 0.5
    this.lightIntensity = 0.3

    // clock
    const clock = new THREE.Clock()

    // exports
    this.noise = noise
    this.clock = clock

    this.setupPlane()
    this.setupLights()
  }

  setupPlane = () => {
    const { WIDTH, HEIGHT, depth, distance } = this

    // geometry
    const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 200, 200)
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
    plane.position.z = distance + depth
    plane.position.y = HEIGHT / 4

    // assign initial positions to verticies
    for (let i = 0; i < geometry.vertices.length; i += 1) {
      const vertex = geometry.vertices[i]
      vertex.xi = vertex.x
      vertex.yi = vertex.y
      vertex.zi = vertex.z
    }

    // exports
    this.plane = plane
  }

  setupLights = () => {
    const { WIDTH, HEIGHT, depth, distance, lightIntensity } = this

    // create light
    const light1 = new THREE.PointLight(0xff0000, lightIntensity)
    light1.position.set(WIDTH / 4, HEIGHT / 4, distance - depth - 50)

    const light2 = new THREE.PointLight(0xff0000, lightIntensity)
    light2.position.set(-WIDTH / 4, HEIGHT / 4, distance - depth - 50)

    // export
    this.lights = [light1, light2]
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
    noiseFolder.add(this, "depth", 0, 200)

    // lights
    const lightsFolder = folder.addFolder("Lights")
    lightsFolder.add(this, "lightIntensity", 0, 2, 0.1)
  }

  render = (renderer, scene) => {
    const { plane, noise, WIDTH, HEIGHT, clock, lights } = this
    const { resolution: r, density: d, depth, speed: s } = this

    const time = clock.getElapsedTime()

    // update noise
    for (let i = 0; i < plane.geometry.vertices.length; i += 1) {
      const vertex = plane.geometry.vertices[i]
      const x = (vertex.x + WIDTH / 2) / r
      const y = (vertex.y + HEIGHT / 2) / r
      const vNoise = noise.get(x, y) * d

      let heightMult = Math.cos(time * s + vNoise) * 0.5 + 0.5
      if (heightMult > 0.99) {
        heightMult = 0.99
      }

      vertex.z = heightMult * depth
    }

    // update lights
    for (const [i, light] of lights.entries()) {
      const hue = (time * s * s * s + i * 0.5) % 1
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
    this.WIDTH = window.innerWidth * 0.5
    this.HEIGHT = window.innerHeight * 0.5
    // this.plane.geometry = new THREE.PlaneBufferGeometry(
    //   this.WIDTH,
    //   this.HEIGHT,
    //   200,
    //   200
    // )
    // this.setupPlane()
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
