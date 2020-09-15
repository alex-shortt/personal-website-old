import * as THREE from "three"
import Stats from "stats.js"
import * as dat from "dat.gui"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"

import NoiseBox from "world/noisebox"
import Environment from "world/environment"
import Sizer from "services/noisesizer"
import DisplayRenderer from "world/displayRenderer"

const SHOW_DEV_TOOLS = false // show stats and gui controls

export class ThreeScene {
  threeSetup = containerRef => {
    // get container dimensions and use them for scene sizing
    const { clientWidth: width, clientHeight: height } = containerRef

    // scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xaaaaaa, 600, 1750)
    const light = new THREE.AmbientLight(0x404040, 0.82) // soft white light
    scene.add(light)

    // camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 200, 2000)
    camera.position.set(0, Sizer.getCameraHeight(), 0)
    camera.lookAt(0, camera.position.y, 1200)

    // renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(3, window.devicePixelRatio))
    renderer.autoClear = false
    containerRef.appendChild(renderer.domElement) // mount using React ref

    // DisplayRenderer
    const displayRenderer = new DisplayRenderer(scene, containerRef)

    // post processing
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    this.setupPostProcessing(renderer, composer)

    // stats
    if (SHOW_DEV_TOOLS) {
      const stats = new Stats()
      document.body.appendChild(stats.dom)
      this.stats = stats
    }

    // gui
    if (SHOW_DEV_TOOLS) {
      const gui = new dat.GUI()
      this.gui = gui
    }

    // exports
    this.containerRef = containerRef
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.composer = composer
    this.displayRenderer = displayRenderer

    // events
    window.addEventListener("resize", this.handleWindowResize)
    window.addEventListener("mousemove", this.handleMouseMove)
    window.addEventListener("touchmove", this.handleTouchMove)
    window.addEventListener("touchstart", this.handleTouchStart)
    window.addEventListener("touchend", this.handleTouchEnd)
  }

  handleWindowResize = () => {
    const {
      containerRef,
      renderer,
      camera,
      environment,
      noisebox,
      displayRenderer,
      composer
    } = this
    const { clientWidth: width, clientHeight: height } = containerRef

    // resize renderers
    renderer.setSize(width, height)
    composer.setSize(width, height)
    displayRenderer.handleResize(width, height)

    // camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    camera.position.y = Sizer.getCameraHeight()
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
    // remember where touch started
    this.touchStartX = e.touches[0].clientX
    this.touchStartY = e.touches[0].clientY
  }

  handleTouchMove = e => {
    const { touchStartX = 0, touchStartY = 0 } = this

    // get delta from touch start
    const deltaX = e.touches[0].clientX - touchStartX
    const deltaY = e.touches[0].clientY - touchStartY

    if (!this.touchOffsetX) {
      this.touchOffsetX = 0
      this.touchOffsetY = 0
    }

    // move based on aggregated offset + deltas
    this.handleInput(
      window.innerWidth / 2 + this.touchOffsetX + deltaX,
      window.innerHeight / 2 + this.touchOffsetY + deltaY
    )
  }

  handleTouchEnd = e => {
    const touch = e.changedTouches[0]
    const { clientX, clientY } = touch
    const { touchStartX = 0, touchStartY = 0 } = this

    // calc x aggregated offset as total delta
    this.touchOffsetX += clientX - touchStartX
    this.touchOffsetX = Math.min(this.touchOffsetX, window.innerWidth / 2)
    this.touchOffsetX = Math.max(this.touchOffsetX, -window.innerWidth / 2)

    this.touchOffsetY += clientY - touchStartY
    this.touchOffsetY = Math.min(this.touchOffsetY, window.innerHeight / 2)
    this.touchOffsetY = Math.max(this.touchOffsetY, -window.innerHeight / 2)
  }

  handleMouseMove = e =>
    !this.touchStartX &&
    !this.touchStartY &&
    this.handleInput(e.clientX, e.clientY)

  sceneSetup = () => {
    const { renderer, scene, gui } = this

    const noisebox = new NoiseBox()
    const environment = new Environment(scene, { azimuth: 0.456 })

    if (SHOW_DEV_TOOLS) {
      noisebox.addGuiFolder(gui)
      environment.addGuiFolder(gui)
    }

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
      displayRenderer,
      composer
    } = this

    if (SHOW_DEV_TOOLS) {
      stats.begin()
    }

    if (offset) {
      camera.position.x = 70 * (offset.x - 0.5)
      camera.position.y = Sizer.getCameraHeight() + 70 * (offset.y - 0.5)
      camera.lookAt(0, Sizer.getCameraHeight(), 900)
    }

    noisebox.render(renderer, scene)
    environment.render(renderer, scene)
    // renderer.render(scene, camera)
    composer.render()
    displayRenderer.render(scene, camera)

    if (SHOW_DEV_TOOLS) {
      stats.end()
    }

    this.requestID = window.requestAnimationFrame(this.startAnimationLoop)
  }

  setupPostProcessing = (renderer, composer) => {
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.4,
      0.2,
      0.93
    )
    composer.addPass(bloomPass)

    const fxaaPass = new ShaderPass(FXAAShader)
    const pixelRatio = renderer.getPixelRatio()
    fxaaPass.material.uniforms.resolution.value.x =
      1 / (window.innerWidth * pixelRatio)
    fxaaPass.material.uniforms.resolution.value.y =
      1 / (window.innerHeight * pixelRatio)

    composer.addPass(fxaaPass)
  }

  unmount = () => {
    const { requestID, controls } = this

    window.removeEventListener("resize", this.handleWindowResize)
    window.cancelAnimationFrame(requestID)
    controls.dispose()
  }
}
