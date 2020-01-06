import uuid from "uuid/v4"
import PerlinNoise from "perlin-noise-3d"
import * as THREE from "three"

export default class Terrain {
  constructor(props = {}) {
    const { seed = Math.random() * 10000 } = props

    this.seed = seed
    this.noise = new PerlinNoise()
    this.noise.noiseSeed(seed)

    this.geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100)
    this.geometry.dynamic = true

    const material = new THREE.MeshPhongMaterial({
      color: 0xe80c7a,
      shininess: 8,
      specular: 0xff540d,
      shading: THREE.FlatShading
    })

    this.plane = new THREE.Mesh(this.geometry, material)
    const { plane, noise } = this

    plane.rotation.x = -Math.PI / 2
    plane.position.y = -30

    this.update(0)
  }

  addToScene(scene) {
    const { plane } = this
    this.scene = scene
    scene.add(plane)
  }

  update(time) {
    const { plane } = this

    for (let i = 0; i < this.plane.geometry.vertices.length; i += 1) {
      const vertex = this.plane.geometry.vertices[i]
      this.plane.geometry.vertices[i].z =
        this.noise.get(vertex.x, vertex.y, time) * 20
    }

    plane.geometry.verticesNeedUpdate = true
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
