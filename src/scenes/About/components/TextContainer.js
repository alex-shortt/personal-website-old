import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  overflow-y: auto;
  padding: 25px 0;
`

const Title = styled.h2`
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0.25em 0 0;
  text-transform: uppercase;
  letter-spacing: 1.7px;
`

const Text = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 200;
  font-size: 1.1rem;
  margin: 0.25em 0;
  line-height: 1.45em;

  & > a {
    color: black;
    transition: color ease 0.3s;
    position: relative;
    text-decoration: none;
    padding: 2px 4px;

    &:hover {
      color: white;

      &::after {
        height: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 2px;
      left: 0;
      bottom: 0;
      background-color: black;
      transition: all ease 0.3s;
    }
  }
`

const CenteredText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.25em;
  line-height: 1.4em;
`

const AwgeLink = () => (
  <a href="https://awge.com" target="_blank" rel="noopener noreferrer">
    awge.com
  </a>
)

const MetaplugLink = () => (
  <a href="https://www.metaplug.io" target="_blank" rel="noopener noreferrer">
    Metaplug
  </a>
)

export default function TextContainer(props) {
  const { video, ...restProps } = props

  // update scroll percentage
  const [setup, setSetup] = useState(false)
  const scrollContainer = useRef()
  useEffect(() => {
    if (!setup || !scrollContainer || !scrollContainer.current) {
      scrollContainer.current.addEventListener("scroll", e => {
        const elem = e.target
        const maxScroll = elem.scrollHeight - elem.offsetHeight
        const perc = elem.scrollTop / maxScroll

        if (video.current) {
          const maxTime = video.current.duration
          const timePos = perc * maxTime
          if (timePos) {
            video.current.currentTime = timePos
          }
        }
      })
      setSetup(true)
    }
  }, [setup, video])

  return (
    <Container {...restProps} ref={scrollContainer}>
      <Title>Bio</Title>
      <Text>
        Between home-made drones and hackathons, I grew up living and breathing
        code. In highschool I managed to land a job to make the website for A$AP
        Rocky, <AwgeLink />, which opened me up to the creative side of
        programming. I kept this with me as I went to UC Santa Barbara to study
        Computer Science, where I found Media Arts classes to help me formalize
        my artistic interests. Alongside this, I am working on my company{" "}
        <MetaplugLink />. Both school and the company are ways for me to grow as
        a person which pushes my art further than I could have ever imagined. My
        current art mainly deals with GANs.
      </Text>
      <br />
      <br />
      <Title>Statement</Title>
      <Text>
        I see reality as one vector space: an infinite number of dimensions with
        a vector in the space corresponding to an idea. Generative Adversarial
        Networks (GANs) are a computer's implementation of this concept, at
        least within the image domain. I believe that researching this framework
        will lead to ( 1 ) a clearer understanding of our own reality and its
        meaning and ( 2 ) a means to <i>create</i> a new reality to continue the
        infinite chain of creation.
        <br />
        <br />
        My work aims to abstract this definition of reality to encompass both
        humans and computers and present it in a way that most effectively
        communicates the idea. Each piece I create highlights one consequence of
        this framework, primarily focusing on the most important aspects of our
        shared human experience:
      </Text>
      <CenteredText>
        <br />
        Information
        <br />
        Connection
        <br />
        Creation
        <br />
        Scale
      </CenteredText>
    </Container>
  )
}
