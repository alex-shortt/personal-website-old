import * as THREE from "three"
import Stats from "stats.js"
import * as dat from "dat.gui"

import NoiseBox from "world/noisebox"
import Environment from "world/environment"
import NoiseSizer from "services/noisesizer"

export class ThreeWrapper {
  threeSetup = containerRef => {
    // get container dimensions and use them for scene sizing
    const { clientWidth: width, clientHeight: height } = containerRef

    // scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 250, 2000)

    // camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 2, 2000)
    camera.position.set(0, NoiseSizer.getCameraHeight(), 0)
    camera.lookAt(0, camera.position.y, 1200)

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
    const { containerRef, renderer, camera, environment, noisebox } = this
    const { clientWidth: width, clientHeight: height } = containerRef

    // resize renderer
    renderer.setSize(width, height)

    // camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    camera.position.set(0, NoiseSizer.getCameraHeight(), 0)
    camera.lookAt(0, camera.position.y, 1200)

    // resize classes
    environment.handleResize()
    noisebox.handleResize()
  }

  sceneSetup = () => {
    const { renderer, scene, gui } = this

    const noisebox = new NoiseBox()
    noisebox.addGuiFolder(gui)

    const environment = new Environment()
    environment.addGuiFolder(gui)

    environment.addToScene(renderer, scene)
    noisebox.addToScene(scene)

    // exports
    this.noisebox = noisebox
    this.environment = environment
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
