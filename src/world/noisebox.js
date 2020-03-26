import PerlinNoise from "perlin-noise-3d"
import * as THREE from "three"
import * as dat from "dat.gui"

export default class Terrain {
  constructor(props = {}) {
    const { seed = Math.random() * 10000 } = props

    this.noise = new PerlinNoise()
    this.noise.noiseSeed(seed)

    this.resolution = 740 // zoom
    this.density = 5 // grooves per unit distance
    this.height = 69 // height of the grooves
    this.speed = 0.23
    this.cutoff = 0.05

    this.WIDTH = window.innerWidth * 0.5
    this.HEIGHT = window.innerHeight * 0.5

    this.lights = []

    this.gui = new dat.GUI()
    this.gui.add(this, "resolution", 200, 900)
    this.gui.add(this, "density", 0, 10)
    this.gui.add(this, "height", 0, 100)
    this.gui.add(this, "speed", 0, 2)
    this.gui.add(this, "cutoff", 0, 1)

    this.setup()
    this.setupLights()
    this.update(0)
  }

  setup = () => {
    const { WIDTH, HEIGHT } = this
    this.geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 200, 200)
    this.geometry.dynamic = true

    const material = new THREE.MeshPhongMaterial({
      shading: THREE.FlatShading,
      vertexColors: THREE.FaceColors
    })

    // initialize plane
    this.plane = new THREE.Mesh(this.geometry, material)
    this.plane.rotation.x = Math.PI
    this.plane.position.z = 700

    for (let i = 0; i < this.plane.geometry.vertices.length; i += 1) {
      const vertex = this.plane.geometry.vertices[i]
      vertex.xi = vertex.x
      vertex.yi = vertex.y
      vertex.zi = vertex.z
    }
  }

  setupLights = () => {
    const { plane } = this

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 0, 0)
    light.target = plane
    light.castShadow = true

    this.lights.push(light)
  }

  addToScene = scene => {
    const { plane, lights } = this

    this.scene = scene
    scene.add(plane)

    console.log(plane.geometry.vertices.length)

    for (const light of lights) {
      scene.add(light)
    }
  }

  update = time => {
    const { plane, noise, WIDTH, HEIGHT } = this
    const { resolution: r, density: d, height: h, speed: s, cutoff: c } = this

    for (let i = 0; i < plane.geometry.vertices.length; i += 1) {
      const vertex = plane.geometry.vertices[i]
      const x = ((vertex.x + WIDTH / 2) * d) / r
      const y = ((vertex.y + HEIGHT / 2) * d) / r
      const vNoise = noise.get(x, y, time / 10)

      let heightMult = vNoise
      if (heightMult > 0.9) {
        heightMult = 0.9
      }

      if (heightMult < c) {
        heightMult = c
      }

      vertex.z = heightMult * h
    }

    for (let i = 0; i < plane.geometry.faces.length; i += 1) {
      const face = plane.geometry.faces[i]

      const va = plane.geometry.vertices[face.a]
      const vb = plane.geometry.vertices[face.b]
      const vc = plane.geometry.vertices[face.c]

      const distFromBottom = (va.z + vb.z + vc.z) / h

      const area = faceArea(va, vb, vc)
      const zDist = zOffset(va, vb, vc)

      const hue = (time * s * 0.1) % 1
      const sat = 1 - zDist / h
      const value = 1 - zDist / h
      const [hu, sa, l] = hsvToHSL(hue, sat, value)

      if (distFromBottom <= c * 2 * 3) {
        const maxVal = c * 2 * 3
        const minVal = c * 3
        const fadeRange = (distFromBottom - minVal) / (maxVal - minVal)
        const alpha = 1 - fadeRange
        face.color.setHSL(hu, sa, l + alpha * (1 - l))
      } else {
        face.color.setHSL(hu, sa, l)
      }
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

function faceArea(va, vb, vc) {
  const t = new THREE.Triangle(va, vb, vc)
  return t.getArea()
}

function zOffset(va, vb, vc) {
  const maxZ = Math.max(va.z, vb.z, vc.z)
  const minZ = Math.min(va.z, vb.z, vc.z)
  return maxZ - minZ
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
