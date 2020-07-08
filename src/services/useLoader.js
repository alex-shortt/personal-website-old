import React, { useState, useEffect } from "react"

import waterNormalsImg from "assets/textures/waternormals.jpg"
import cloudImg from "assets/images/cloud.png"
import websites from "scenes/Websites/assets/websites"
import pieces from "scenes/Art/assets/pieces"

const siteImages = [waterNormalsImg]
const homeImages = [cloudImg]
const websiteImages = websites.map(site => site.image)
const artImages = pieces.map(piece => piece.heroImage)

const MIN_DURATION = 1.5

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener("load", () => {
      resolve()
    })
    image.addEventListener("error", () => {
      resolve()
    })
    image.src = url
  })
}

export default () => {
  const [landedPage] = useState(window.location.pathname.replace("/", ""))
  const [setup, setSetup] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [minTimePassed, setMinTimePassed] = useState(false)

  useEffect(() => {
    if (!setup) {
      setTimeout(() => setMinTimePassed(true), MIN_DURATION * 1000)

      const imagesToLoad = [...siteImages]
      if (landedPage === "") {
        imagesToLoad.push(...homeImages)
      } else if (landedPage === "websites") {
        imagesToLoad.push(...websiteImages)
      } else if (landedPage.includes("art")) {
        imagesToLoad.push(...artImages)
      }

      Promise.all(imagesToLoad.map(image => loadImage(image))).then(() =>
        setLoaded(true)
      )

      setSetup(true)
    }
  }, [landedPage, loaded, setup])

  return { loaded: minTimePassed && loaded }
}
