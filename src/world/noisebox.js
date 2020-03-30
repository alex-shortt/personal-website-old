import PerlinNoise from "perlin-noise-3d"
import * as THREE from "three"
import * as dat from "dat.gui"

export default class Terrain {
  constructor(props = {}) {
    const { seed = Math.random() * 10000 } = props

    this.noise = new PerlinNoise()
    this.noise.noiseSeed(seed)

    this.resolution = 118 // zoom
    this.density = 20 // grooves per unit distance
    this.height = 150 // height of the grooves
    this.speed = 0.5
    this.depth = 0.5

    this.WIDTH = window.innerWidth * 0.5
    this.HEIGHT = window.innerHeight * 0.5

    this.clock = new THREE.Clock()

    this.gui = new dat.GUI()
    this.gui.add(this, "resolution", 100, 1000)
    this.gui.add(this, "density", 0, 650)
    this.gui.add(this, "height", 0, 100)
    this.gui.add(this, "speed", 0, 2)
    this.gui.add(this, "depth", 0, 1)

    this.setup()
  }

  setup = () => {
    const { WIDTH, HEIGHT } = this
    this.geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 200, 200)
    this.geometry.dynamic = true

    const material = new THREE.MeshPhongMaterial({
      shading: THREE.SmoothShading,
      shininess: 0.4,
      specular: 0xffffff
    })

    // initialize plane
    this.plane = new THREE.Mesh(this.geometry, material)
    this.plane.rotation.x = Math.PI
    this.plane.position.z = 1200 - this.depth / 2

    for (let i = 0; i < this.plane.geometry.vertices.length; i += 1) {
      const vertex = this.plane.geometry.vertices[i]
      vertex.xi = vertex.x
      vertex.yi = vertex.y
      vertex.zi = vertex.z
    }
  }

  addToScene = scene => {
    const { plane } = this

    scene.add(plane)
  }

  render = (renderer, scene) => {
    const { plane, noise, WIDTH, HEIGHT, clock } = this
    const { resolution: r, density: d, height: h, speed: s, cutoff: c } = this

    const time = clock.getElapsedTime()

    for (let i = 0; i < plane.geometry.vertices.length; i += 1) {
      const vertex = plane.geometry.vertices[i]
      const x = (vertex.x + WIDTH / 2) / r
      const y = (vertex.y + HEIGHT / 2) / r
      const vNoise = noise.get(x, y) * d

      let heightMult = Math.cos(time * s + vNoise) * 0.5 + 0.5
      if (heightMult > 0.99) {
        heightMult = 0.99
      }

      if (heightMult < c) {
        heightMult = c
      }

      vertex.z = heightMult * h
    }

    plane.geometry.verticesNeedUpdate = true
    plane.geometry.colorsNeedUpdate = true
  }

  handleResize = () => {
    this.WIDTH = window.innerWidth * 0.5
    this.HEIGHT = window.innerHeight * 0.5
    this.setup()
  }
}
