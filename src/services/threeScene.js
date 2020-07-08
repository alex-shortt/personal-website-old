import * as THREE from "three"
import Stats from "stats.js"
import * as dat from "dat.gui"

import NoiseBox from "world/noisebox"
import Environment from "world/environment"
import Sizer from "services/noisesizer"
import DisplayRenderer from "world/displayRenderer"

export class ThreeScene {
  threeSetup = containerRef => {
    // get container dimensions and use them for scene sizing
    const { clientWidth: width, clientHeight: height } = containerRef

    // scene
    const scene = new THREE.Scene()

    // camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 2, 20000)
    camera.position.set(0, Sizer.getCameraHeight(), 0)
    camera.lookAt(0, camera.position.y, 1200)

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.autoClear = false
    containerRef.appendChild(renderer.domElement) // mount using React ref

    // DisplayRenderer
    const displayRenderer = new DisplayRenderer(scene, containerRef)

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
    this.displayRenderer = displayRenderer
    this.stats = stats
    this.gui = gui

    // events
    window.addEventListener("resize", this.handleWindowResize)
    window.addEventListener("mousemove", this.handleMouseMove)
    window.addEventListener("touchmove", this.handleTouchMove)
    window.addEventListener("touchstart", this.handleTouchStart)
  }

  handleWindowResize = () => {
    const {
      containerRef,
      renderer,
      camera,
      environment,
      noisebox,
      displayRenderer
    } = this
    const { clientWidth: width, clientHeight: height } = containerRef

    // resize renderers
    renderer.setSize(width, height)
    displayRenderer.handleResize(width, height)

    // camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    camera.position.set(0, Sizer.getCameraHeight(), 0)
    camera.lookAt(0, camera.position.y, 900)

    // resize classes
    environment.handleResize()
    noisebox.handleResize()
  }

  handleInput = (x, y) => {
    const { containerRef } = this

    const { clientWidth: width, clientHeight: height } = containerRef

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

  handleTouchStart = e => {
    this.touchStartX = e.touches[0].clientX
    this.touchStartY = e.touches[0].clientY
  }

  handleTouchMove = e => {
    const { touchStartX = 0, touchStartY = 0 } = this
    const deltaX = e.touches[0].clientX - touchStartX
    const deltaY = e.touches[0].clientY - touchStartY
    this.handleInput(
      window.innerWidth / 2 + deltaX,
      window.innerHeight / 2 + deltaY
    )
  }

  handleMouseMove = e =>
    !this.touchStartX &&
    !this.touchStartY &&
    this.handleInput(e.clientX, e.clientY)

  sceneSetup = () => {
    const { renderer, scene, gui } = this

    const noisebox = new NoiseBox()
    noisebox.addGuiFolder(gui)

    const environment = new Environment(scene, { azimuth: 0.456 })
    environment.addGuiFolder(gui)

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
      offset,
      displayRenderer
    } = this

    stats.begin()

    if (offset) {
      camera.position.x = 50 * (offset.x - 0.5)
      camera.position.y = Sizer.getCameraHeight() + 50 * (offset.y - 0.5)
      camera.lookAt(0, Sizer.getCameraHeight(), 900)
    }

    noisebox.render(renderer, scene)
    environment.render(renderer, scene)
    renderer.render(scene, camera)
    displayRenderer.render(scene, camera)
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
