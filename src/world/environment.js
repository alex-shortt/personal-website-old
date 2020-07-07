import * as THREE from "three"
import { Sky } from "three/examples/jsm/objects/Sky"
import { Water } from "three/examples/jsm/objects/Water"

import waterNormalsImg from "assets/textures/waternormals.jpg"

export default class Environment {
  constructor(scene, props = {}) {
    const { inclination = 0.48, azimuth = 0.4 } = props

    // sun
    const sun = new THREE.DirectionalLight(0xffffff, 0.8)

    // sky
    const sky = new Sky()
    sky.scale.setScalar(10000)
    sky.material.uniforms.turbidity.value = 15
    sky.material.uniforms.rayleigh.value = 1.5
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
      sunDirection: new THREE.Vector3(),
      sunColor: 0x777777,
      waterColor: 0x001e0f,
      distortionScale: 4.7,
      fog: scene.fog !== undefined,
      size: 1,
      alpha: 1
    })
    water.rotation.x = -Math.PI / 2

    // exports
    this.scene = scene
    this.inclination = inclination
    this.azimuth = azimuth
    this.sun = sun
    this.sky = sky
    this.water = water
    this.time = 0

    // hooks
    this.updateSun()
  }

  addToScene = (renderer, scene) => {
    const { sky, sun, water } = this

    const pmremGenerator = new THREE.PMREMGenerator(renderer)

    scene.add(sun)
    scene.add(water)
    scene.add(sky)

    // eslint-disable-next-line no-param-reassign
    scene.environment = pmremGenerator.fromScene(sky).texture

    this.pmremGenerator = pmremGenerator
  }

  addGuiFolder = gui => {
    const folder = gui.addFolder("Environment")
    folder.add(this, "inclination", 0, 0.5, 0.0001).onChange(this.updateSun)
    folder.add(this, "azimuth", 0, 1, 0.0001).onChange(this.updateSun)
    folder.add(this, "time", 0, 23, 0.01).onChange(this.updateToTime)
    folder.open()
  }

  updateSun = () => {
    const {
      inclination,
      azimuth,
      sun,
      water,
      sky,
      pmremGenerator,
      scene
    } = this

    const theta = Math.PI * (inclination - 0.5)
    const phi = 2 * Math.PI * (azimuth - 0.5)
    sun.position.x = Math.cos(phi)
    sun.position.y = Math.sin(phi) * Math.sin(theta)
    sun.position.z = Math.sin(phi) * Math.cos(theta)

    sky.material.uniforms.sunPosition.value.copy(sun.position)
    water.material.uniforms.sunDirection.value.copy(sun.position).normalize()

    if (pmremGenerator) {
      scene.environment = pmremGenerator.fromScene(sky).texture
    }
  }

  updateToTime = () => {
    const { time: overrideTime, sun } = this

    // update sun pos based on time
    const month = new Date().getMonth()
    const hours = new Date().getHours()
    const mins = new Date().getMinutes()
    const time =
      overrideTime === 0 ? (hours + mins / 60).toFixed(2) : overrideTime

    // monthdiff greater during summer
    const monthDiff = (1 - Math.abs((month - 6) / 6)) * 0.05
    // darkest
    const maxIncl = 0.5 - monthDiff
    // brightest
    const minIncl = 0.24 - monthDiff

    const maxIntensity = 0.8
    const minIntensity = 0.2

    // sunrise from 6.5 to 9
    // sunset from 17.5 to 20

    let newInclination
    if (time <= 6.5) {
      // early morning
      newInclination = maxIncl
      sun.intensity = minIntensity
    } else if (time > 6.5 && time <= 9) {
      // sunrise
      const perc = (time - 6.5) / 2.5
      newInclination = maxIncl - perc * (maxIncl - minIncl)
      sun.intensity = minIntensity + perc * (maxIntensity - minIntensity)
    } else if (time > 9 && time <= 17.5) {
      // day
      newInclination = minIncl
      sun.intensity = maxIntensity
    } else if (time > 17.5 && time < 20) {
      // sunset
      const perc = (time - 17.5) / 2.5
      newInclination = minIncl + perc * (maxIncl - minIncl)
      sun.intensity = maxIntensity - perc * (maxIntensity - minIntensity)
    } else {
      // dawn
      newInclination = maxIncl
      sun.intensity = minIntensity
    }

    if (newInclination !== this.inclination) {
      console.log(`set to ${newInclination}`)
      this.inclination = newInclination
      this.updateSun()
    }
  }

  render = (renderer, scene) => {
    const { water } = this

    water.material.uniforms.time.value += 1.0 / 120.0

    this.updateToTime()
  }

  handleResize = () => {
    // foo
  }
}
