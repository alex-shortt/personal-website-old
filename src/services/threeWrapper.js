import * as THREE from "three"
import Stats from "stats.js"
import * as dat from "dat.gui"

import NoiseBox from "world/noisebox"
import Environment from "world/environment"

export class ThreeWrapper {
  threeSetup = containerRef => {
    // get container dimensions and use them for scene sizing
    const { clientWidth: width, clientHeight: height } = containerRef

    // scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 250, 2000)

    // camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 2, 2000)
    camera.position.set(0, 100, 0)
    camera.lookAt(0, 100, 1200)

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(scene.fog.color, 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.autoClear = false
    containerRef.appendChild(renderer.domElement) // mount using React ref

    // stats
    const stats = new Stats()
    document.body.appendChild(stats.dom)

    // gui
    const gui = new dat.GUI()

    // exports
    this.containerRef = containerRef
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.stats = stats
    this.gui = gui

    // events
    window.addEventListener("resize", this.handleWindowResize)
  }

  handleWindowResize = () => {
    const { containerRef, renderer, camera, noisebox, environment } = this
    const { clientWidth: width, clientHeight: height } = containerRef

    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    environment.handleResize()
    noisebox.handleResize()
  }

  sceneSetup = () => {
    const { renderer, scene, gui } = this

    const noisebox = new NoiseBox()
    noisebox.addGuiFolder(gui)

    const environment = new Environment()
    environment.addGuiFolder(gui)

    this.addControls()
    environment.addToScene(renderer, scene)
    noisebox.addToScene(scene)

    // exports
    this.noisebox = noisebox
    this.environment = environment
  }

  addControls = () => {
    const { renderer, camera, scene } = this

    // add camera
    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.maxPolarAngle = Math.PI * 0.495
    // camera.position.set(0, 400, 0)
    // camera.lookAt(new THREE.Vector3(0, 400, 1200))
    // controls.minDistance = 40.0
    // controls.maxDistance = 200.0
    // controls.update()

    // exports
    // this.controls = controls
  }

  startAnimationLoop = () => {
    const { noisebox, renderer, scene, camera, environment, stats } = this

    stats.begin()
    noisebox.render(renderer, scene)
    environment.render(renderer, scene)
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
