import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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
      75, // fov
      width / height, // aspect ratio
      0.0001, // near plane
      2000 // far plane
    )
    this.camera.position.set(0, 0, 80)
    this.controls = new OrbitControls(this.camera, containerRef)

    this.clock = new THREE.Clock()

    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(width, height)
    containerRef.appendChild(this.renderer.domElement) // mount using React ref

    window.addEventListener("resize", this.handleWindowResize)
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
    const { scene } = this

    const spotlight = new THREE.PointLight(0xffffff)
    spotlight.position.set(-20, 30, 55)
    scene.add(spotlight)

    this.terrain = new Terrain()
    this.terrain.addToScene(scene)
  }

  startAnimationLoop = () => {
    const { terrain, renderer, scene, camera, clock } = this

    terrain.update(clock.getElapsedTime() / 2)
    renderer.render(scene, camera)
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop)
  }

  unmount = () => {
    const { requestID, controls } = this

    window.removeEventListener("resize", this.handleWindowResize)
    window.cancelAnimationFrame(requestID)
    controls.dispose()
  }
}
