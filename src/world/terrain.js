import uuid from "uuid/v4"
import PerlinNoise from "perlin-noise-3d"
import * as THREE from "three"

export default class Terrain {
  constructor(props = {}) {
    const { seed = Math.random() * 10000 } = props

    this.seed = seed
    this.noise = new PerlinNoise()
    this.noise.noiseSeed(seed)

    this.geometry = new THREE.PlaneGeometry(1000, 1000, 250, 250)
    this.geometry.dynamic = true

    const material = new THREE.MeshPhongMaterial({
      shininess: 8,
      specular: 0xffffff22,
      shading: THREE.FlatShading,
      vertexColors: THREE.FaceColors
    })

    this.plane = new THREE.Mesh(this.geometry, material)
    const { plane, noise } = this

    plane.rotation.x = -Math.PI / 2
    plane.position.y = -30

    this.maxarea = 1

    for (let i = 0; i < plane.geometry.vertices.length; i += 1) {
      const vertex = plane.geometry.vertices[i]
      vertex.xi = vertex.x
      vertex.yi = vertex.y
      vertex.zi = vertex.z
    }

    console.log(plane)
    console.log()

    this.update(0)
  }

  addToScene(scene) {
    const { plane } = this
    this.scene = scene
    scene.add(plane)
  }

  update(time) {
    const { plane, noise } = this

    const r = 500
    const p = 30
    const h = 30
    const { width, height } = plane.geometry.parameters

    for (let i = 0; i < plane.geometry.vertices.length; i += 1) {
      const vertex = plane.geometry.vertices[i]
      const vNoise =
        noise.get((vertex.x + width / 2) / r, (vertex.y + height / 2) / r) * p
      vertex.z = Math.cos(time + vNoise) * h
    }

    for (let i = 0; i < plane.geometry.faces.length; i += 1) {
      const face = plane.geometry.faces[i]
      const va = plane.geometry.vertices[face.a]
      const vb = plane.geometry.vertices[face.b]
      const vc = plane.geometry.vertices[face.c]
      const area = faceArea(va, vb, vc)
      const zDist = zOffset(va, vb, vc)

      if (this.maxarea < zDist) {
        this.maxarea = zDist
        console.log("maxarea: ", zDist)
      }

      const hue = (time / 10) % 1
      const sat = zDist / this.maxarea
      const value = zDist / this.maxarea
      const [hu, s, l] = hsvToHSL(hue, sat, value)

      face.color.setHSL(hu, s, l)
    }

    plane.geometry.verticesNeedUpdate = true
    plane.geometry.colorsNeedUpdate = true
  }
}

function randNum(n) {
  const p =
    (Math.random() +
      Math.random() +
      Math.random() +
      Math.random() +
      Math.random() +
      Math.random() -
      3) /
    3
  return p * n
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
