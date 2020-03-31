import * as THREE from "three"
import { Sky } from "three/examples/jsm/objects/Sky"
import { Water } from "three/examples/jsm/objects/Water"

import waterNormalsImg from "assets/textures/waternormals.jpg"

export default class Environment {
  constructor(props = {}) {
    const { time = 0.48 } = props

    // directional light
    const light = new THREE.DirectionalLight(0xffffff, 0.8)

    // sky
    const sky = new Sky()
    sky.material.uniforms.turbidity.value = 10
    sky.material.uniforms.rayleigh.value = 2
    sky.material.uniforms.luminance.value = 1
    sky.material.uniforms.mieCoefficient.value = 0.005
    sky.material.uniforms.mieDirectionalG.value = 0.8

    // water
    const waterTexture = new THREE.TextureLoader().load(waterNormalsImg)
    waterTexture.wrapS = THREE.RepeatWrapping
    waterTexture.wrapT = THREE.RepeatWrapping
    const waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000)
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterTexture,
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 2.7,
      fog: true,
      size: 6
    })
    water.rotation.x = -Math.PI / 2

    // cube camera for reflections
    const cubeCamera = new THREE.CubeCamera(0.1, 1, 512)
    cubeCamera.renderTarget.texture.generateMipmaps = true
    cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipmapLinearFilter

    // exports
    this.time = time
    this.sky = sky
    this.light = light
    this.cubeCamera = cubeCamera
    this.water = water

    // hooks
    this.updateSun()
  }

  addToScene = (renderer, scene) => {
    const { cubeCamera, sky, light, water } = this

    cubeCamera.update(renderer, sky)

    // eslint-disable-next-line no-param-reassign
    scene.background = this.cubeCamera.renderTarget

    scene.add(light)
    scene.add(water)
  }

  addGuiFolder = gui => {
    const folder = gui.addFolder("Environment")
    folder.add(this, "time", 0, 1, 0.01).onChange(this.updateSun)
  }

  updateSun = () => {
    const { time, light, sky, water } = this

    const parameters = {
      distance: 400,
      inclination: time,
      azimuth: 0.205
    }

    const theta = Math.PI * (parameters.inclination - 0.5)
    const phi = 2 * Math.PI * (parameters.azimuth - 0.5)
    light.position.x = parameters.distance * Math.cos(phi)
    light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta)
    light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta)

    sky.material.uniforms.sunPosition.value = light.position.copy(
      light.position
    )

    water.material.uniforms.sunDirection.value.copy(light.position).normalize()

    this.needsCameraUpdate = true
  }

  render = (renderer, scene) => {
    const { water, cubeCamera, sky, needsCameraUpdate = false } = this

    if (needsCameraUpdate) {
      cubeCamera.update(renderer, sky)

      // eslint-disable-next-line no-param-reassign
      scene.background = cubeCamera.renderTarget

      this.needsCameraUpdate = false
    }

    water.material.uniforms.time.value += 1.0 / 120.0
  }

  handleResize = () => {
    // foo
  }
}
