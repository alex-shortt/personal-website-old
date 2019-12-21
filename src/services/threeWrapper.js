import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export class ThreeWrapper {
  constructor() {
    // foo
  }

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
      0.1, // near plane
      1000 // far plane
    )
    this.controls = new OrbitControls(this.camera, containerRef)

    // set some distance from a cube that is located at z = 0
    this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer()
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

    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    const lights = []
    lights[0] = new THREE.PointLight(0xffffff, 1, 0)
    lights[1] = new THREE.PointLight(0xffffff, 1, 0)
    lights[2] = new THREE.PointLight(0xffffff, 1, 0)

    lights[0].position.set(0, 200, 0)
    lights[1].position.set(100, 200, 100)
    lights[2].position.set(-100, -200, -100)

    scene.add(lights[0])
    scene.add(lights[1])
    scene.add(lights[2])
  }

  startAnimationLoop = () => {
    const { renderer } = this

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    renderer.render(this.scene, this.camera)
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop)
  }

  unmount = () => {
    const { requestID, controls } = this

    window.removeEventListener("resize", this.handleWindowResize)
    window.cancelAnimationFrame(requestID)
    controls.dispose()
  }
}
