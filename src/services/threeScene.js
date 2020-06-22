import * as THREE from "three"
import Stats from "stats.js"
import * as dat from "dat.gui"

import NoiseBox from "world/noisebox"
import Environment from "world/environment"
import Sizer from "services/noisesizer"

export class ThreeScene {
  threeSetup = containerRef => {
    // get container dimensions and use them for scene sizing
    const { clientWidth: width, clientHeight: height } = containerRef

    // scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 250, 2000)

    // camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 2, 2000)
    camera.position.set(0, Sizer.getCameraHeight(), 0)
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
    window.addEventListener("mousemove", this.handleMouseMove)
  }

  handleWindowResize = () => {
    const { containerRef, renderer, camera, environment, noisebox } = this
    const { clientWidth: width, clientHeight: height } = containerRef

    // resize renderer
    renderer.setSize(width, height)

    // camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    camera.position.set(0, Sizer.getCameraHeight(), 0)
    camera.lookAt(0, camera.position.y, 1200)

    // resize classes
    environment.handleResize()
    noisebox.handleResize()
  }

  handleMouseMove = e => {
    const { containerRef, renderer, camera, environment, noisebox } = this
    const { clientWidth: width, clientHeight: height } = containerRef
    const { clientX: x, clientY: y } = e

    const xPerc = x / width
    const centeredXRange = 0.55
    const xOffset = Math.min(
      Math.max((xPerc - (1 - centeredXRange) / 2) / centeredXRange, 0),
      1
    )

    const yPerc = y / height
    const centeredYRange = 0.5
    const yOffset = Math.min(
      Math.max((yPerc - (1 - centeredYRange) / 2) / centeredYRange, 0),
      1
    )

    this.offset = {
      x: xOffset,
      y: yOffset
    }
  }

  sceneSetup = () => {
    const { renderer, scene, gui } = this

    const noisebox = new NoiseBox()
    noisebox.addGuiFolder(gui)

    const environment = new Environment({ azimuth: 0.21 })
    environment.addGuiFolder(gui)

    this.offsetPos = 10
    this.offsetRot = 0.001
    const folder = gui.addFolder("Parallax")
    folder.add(this, "offsetPos", 0, 50, 1)
    folder.add(this, "offsetRot", 0, 0.02, 0.001)
    folder.open()

    environment.addToScene(renderer, scene)
    noisebox.addToScene(scene)

    // exports
    this.noisebox = noisebox
    this.environment = environment
  }

  startAnimationLoop = () => {
    const {
      noisebox,
      renderer,
      scene,
      camera,
      environment,
      stats,
      offset = {}
    } = this

    camera.position.x = 50 * (offset.x - 0.5)
    camera.position.y = Sizer.getCameraHeight() + 50 * (offset.y - 0.5)
    camera.lookAt(0, Sizer.getCameraHeight(), 1200)
    // camera.rotation.z = Math.PI * 2

    stats.begin()
    if (this.displayRef) {
      const posX = (offset.x - 0.5) * this.offsetPos
      const posY = (offset.y - 0.5) * this.offsetPos
      const rotX = (offset.y - 0.5) * this.offsetRot
      const rotY = (offset.x - 0.5) * this.offsetRot
      this.displayRef.style.transform = `rotateX(${rotX}rad) rotateY(${rotY}rad) translate(${posX}px, ${posY}px)`
    }
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
