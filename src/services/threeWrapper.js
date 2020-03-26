import * as THREE from "three"
import Stats from "stats.js"

import Terrain from "world/terrain"

export class ThreeWrapper {
  sceneSetup = containRef => {
    this.containerRef = containRef

    const { containerRef } = this

    // get container dimensions and use them for scene sizing
    const width = containerRef.clientWidth
    const height = containerRef.clientHeight

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      40, // fov
      width / height, // aspect ratio
      1, // near plane
      2000 // far plane
    )
    this.camera.position.set(0, 80, 0)
    this.camera.lookAt(0, 0, 300)

    this.clock = new THREE.Clock()

    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(width, height)
    containerRef.appendChild(this.renderer.domElement) // mount using React ref

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    window.addEventListener("resize", this.handleWindowResize)
    window.addEventListener("mousemove", this.handleMouseMove)
  }

  handleMouseMove = event => {
    const { spotlight } = this
    const { offsetX, offsetY } = event
    const x = (offsetX / window.innerWidth - 0.5) * 200
    spotlight.position.set(x, 250, 0)
  }

  handleWindowResize = () => {
    const { containerRef, renderer, camera } = this
    const width = containerRef.clientWidth
    const height = containerRef.clientHeight

    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  addCustomSceneObjects = () => {
    const { scene, camera } = this

    this.spotlight = new THREE.SpotLight(0xffffff)

    const { spotlight } = this
    spotlight.position.set(0, 250, 0)
    spotlight.intensity = 8
    spotlight.penumbra = 1

    scene.add(spotlight)

    this.terrain = new Terrain(camera)
    this.terrain.addToScene(scene)
  }

  startAnimationLoop = () => {
    const { terrain, renderer, scene, camera, clock, stats } = this

    stats.begin()
    terrain.update(clock.getElapsedTime() / 2)
    renderer.render(scene, camera)
    stats.end()
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop)
  }

  unmount = () => {
    const { requestID, controls } = this

    window.removeEventListener("resize", this.handleWindowResize)
    window.cancelAnimationFrame(requestID)
    controls.dispose()
  }
}
