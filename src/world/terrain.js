import uuid from "uuid/v4"
import PerlinNoise from "perlin-noise-3d"
import * as THREE from "three"
import * as dat from "dat.gui"

export default class Terrain {
  constructor(camera, props = {}) {
    const { seed = Math.random() * 10000, width = 800, height = 900 } = props

    this.camera = camera
    this.noise = new PerlinNoise()
    this.noise.noiseSeed(seed)

    this.resolution = 500 // zoom
    this.density = 17 // grooves per unit distance
    this.height = 26 // height of the grooves
    this.speed = 0.69

    this.WIDTH = width
    this.HEIGHT = height

    this.gui = new dat.GUI()
    this.gui.add(this, "resolution", 0, 1000)
    this.gui.add(this, "density", 0, 100)
    this.gui.add(this, "height", 0, 100)
    this.gui.add(this, "speed", 0, 2)

    this.clickIndex = 0

    this.raycaster = new THREE.Raycaster()
    window.addEventListener("mousedown", this.onMouseDown)

    this.setup()
    this.update(0)
  }

  onMouseDown = e => {
    const { raycaster, camera, plane } = this
    e.preventDefault()

    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    )
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects([plane])

    for (let i = 0; i < intersects.length; i += 1) {
      const { face } = intersects[i]
      this.clickIndex += 1
      face.clicked.push([this.clickIndex, 0])
    }
  }

  setup = () => {
    const { WIDTH, HEIGHT } = this
    this.geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 50, 50)
    this.geometry.dynamic = true

    const material = new THREE.MeshPhongMaterial({
      shading: THREE.FlatShading,
      vertexColors: THREE.FaceColors
    })

    this.plane = new THREE.Mesh(this.geometry, material)
    const { plane } = this

    plane.rotation.x = -Math.PI / 2
    plane.position.y = -30

    for (let i = 0; i < plane.geometry.vertices.length; i += 1) {
      const vertex = plane.geometry.vertices[i]
      vertex.xi = vertex.x
      vertex.yi = vertex.y
      vertex.zi = vertex.z
    }

    for (let i = 0; i < plane.geometry.faces.length; i += 1) {
      const face = plane.geometry.faces[i]
      face.clicked = []
    }
  }

  addToScene = scene => {
    const { plane } = this
    this.scene = scene
    scene.add(plane)
  }

  update = time => {
    const {
      plane,
      noise,
      WIDTH,
      HEIGHT,
      camera,
      resolution: r,
      density: d,
      height: h,
      speed: s
    } = this

    for (let i = 0; i < plane.geometry.vertices.length; i += 1) {
      const vertex = plane.geometry.vertices[i]
      const vNoise =
        noise.get((vertex.x + WIDTH / 2) / r, (vertex.y + HEIGHT / 2) / r) * d
      const playerOffset = Math.pow(vertex.distanceTo(camera.position), 2) / 20
      const heightMult = Math.min(Math.max(0, playerOffset), 1)

      vertex.z = Math.cos(time * s + vNoise) * h * heightMult
    }

    for (let i = 0; i < plane.geometry.faces.length; i += 1) {
      const face = plane.geometry.faces[i]

      const va = plane.geometry.vertices[face.a]
      const vb = plane.geometry.vertices[face.b]
      const vc = plane.geometry.vertices[face.c]
      const area = faceArea(va, vb, vc)
      const zDist = zOffset(va, vb, vc)

      const hue = (time * s * 0.1) % 1
      const sat = 1 - zDist / h
      const value = 1 - zDist / h
      const [hu, sa, l] = hsvToHSL(hue, sat, value)

      face.color.setHSL(hu, sa, l)
    }

    plane.geometry.verticesNeedUpdate = true
    plane.geometry.colorsNeedUpdate = true
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
