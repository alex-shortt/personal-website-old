import * as THREE from "three"
import Stats from "stats.js"

import NoiseBox from "world/noisebox"

export class ThreeWrapper {
  sceneSetup = containRef => {
    this.containerRef = containRef

    const { containerRef } = this

    // get container dimensions and use them for scene sizing
    const { clientWidth: width, clientHeight: height } = containerRef

    this.scene = new THREE.Scene()

    const frustumSize = 600
    const aspect = width / height
    const orthoWidth = (frustumSize * aspect) / 2
    const orthoHeight = frustumSize / 2

    this.camera = new THREE.PerspectiveCamera(
      50, // fov
      width / height, // aspect ratio
      1, // near plane
      2000
    )

    // setup camera
    // this.camera = new THREE.OrthographicCamera(
    //   -orthoWidth,
    //   orthoWidth,
    //   orthoHeight,
    //   -orthoHeight,
    //   1,
    //   1700
    // )
    // this.cameraHelper = new THREE.CameraHelper(this.camera)
    // this.scene.add(this.cameraHelper)
    this.camera.position.set(0, 0, 0)
    this.camera.lookAt(0, 0, 500)

    this.clock = new THREE.Clock()

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(width, height)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.appendChild(this.renderer.domElement) // mount using React ref

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    window.addEventListener("resize", this.handleWindowResize)
    window.addEventListener("mousemove", this.handleMouseMove)
  }

  handleMouseMove = event => {
    // foo
  }

  handleWindowResize = () => {
    const { containerRef, renderer, camera, noisebox } = this
    const { clientWidth: width, clientHeight: height } = containerRef

    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    noisebox.handleResize()
  }

  addCustomSceneObjects = () => {
    const { scene } = this

    // add ambient light
    // this.ambientLight = new THREE.AmbientLight(0xffffff)
    // this.ambientLight.intensity = 0.2
    // this.ambientLight.penumbra = 1
    // scene.add(this.ambientLight)

    // add other light

    this.noisebox = new NoiseBox()
    this.noisebox.addToScene(scene)
  }

  startAnimationLoop = () => {
    const { noisebox, renderer, scene, camera, clock, stats } = this

    stats.begin()
    noisebox.update(clock.getElapsedTime())
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
