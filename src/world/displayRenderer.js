import {
  CSS3DObject,
  CSS3DRenderer
} from "three/examples/jsm/renderers/CSS3DRenderer"

import Sizer from "services/noisesizer"

export default class DisplayRenderer {
  constructor(scene, containerRef, props = {}) {
    const { clientWidth: width, clientHeight: height } = containerRef

    const cssRenderer = new CSS3DRenderer()
    cssRenderer.setSize(width, height)
    cssRenderer.domElement.style.position = "absolute"
    cssRenderer.domElement.style.top = "50%"
    cssRenderer.domElement.style.left = "50%"
    cssRenderer.domElement.style.transform = "translate(-50%, -50%)"
    cssRenderer.domElement.style.zIndex = 5
    cssRenderer.domElement.style.mixBlendMode = "overlay"
    containerRef.append(cssRenderer.domElement)

    this.cssRenderer = cssRenderer
    this.scene = scene
    this.containerRef = containerRef
    this.elements = []
  }

  addDomElementToScene = domElement => {
    const { scene } = this

    const object = new CSS3DObject(domElement)
    // eslint-disable-next-line no-param-reassign
    domElement.style.width = `${Sizer.getWidth()}px`
    // eslint-disable-next-line no-param-reassign
    domElement.style.height = `${Sizer.getHeight()}px`
    object.position.x = 0
    object.position.y = Sizer.getHeight() / 2
    object.position.z = 900
    object.rotation.y = Math.PI

    scene.add(object)

    this.elements.push(domElement)
  }

  render = (scene, camera) => {
    const { cssRenderer } = this
    cssRenderer.render(scene, camera)
  }

  handleResize = (width, height) => {
    const { elements, cssRenderer } = this

    cssRenderer.setSize(width, height)

    for (const element of elements) {
      element.style.width = `${Sizer.getWidth()}px`
      element.style.height = `${Sizer.getHeight()}px`
    }
  }
}
