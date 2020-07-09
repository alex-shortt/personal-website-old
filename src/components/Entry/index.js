import React from "react"
import styled, { keyframes } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ExternalIcon = styled(FontAwesomeIcon).attrs({
  icon: "external-link-alt"
})`
  font-size: 0.8em;
  margin: 0 20px 0 0;
`

const enterSandman = keyframes`
  0% {
    pointer-events: none;
    visibility: hidden; 
  }
  99% {
    pointer-events: none;
    visibility: hidden; 
  }
  100% {
    pointer-events: all;
    visibility: visible; 
  }
`

const Container = styled.div`
  display: inline-block;
  margin: 30px 15px;
  justify-content: space-around;
  position: relative;
  width: 90%;
  max-width: 400px;
  cursor: pointer;

  &:hover {
    & > a {
      animation: ${enterSandman} 0.2s forwards;
    }

    & > div {
      opacity: 1;
      & > div::after {
        height: 100%;
      }
    }
  }
`

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

const LinkBox = styled.a`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  z-index: 6;
  cursor: pointer;
`

const TextBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  color: white;
  opacity: 0;
  box-sizing: border-box;
  transition: opacity 0.25s ease;
`

const TextWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 5%;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 0%;
    left: 0;
    bottom: 0;
    background-color: black;
    transition: all ease 0.3s;
  }
`

const Title = styled.h1`
  font-size: 1.3rem;
  font-family: proxima-nova, sans-serif;
  margin: 0 0 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.7px;
`

const Subtitle = styled.h3`
  font-size: 1.05rem;
  font-family: proxima-nova, sans-serif;
  font-weight: 100;
  margin: 0;
  font-style: italic;
`

export default function Entry(props) {
  const { id, title, subtitle, link, image } = props
  return (
    <Container key={id}>
      <Image src={image} />
      <LinkBox href={link} target="_blank" />
      <TextBox>
        <TextWrapper>
          <Title>
            {title} <ExternalIcon />
          </Title>
          <Subtitle>{subtitle}</Subtitle>
        </TextWrapper>
      </TextBox>
    </Container>
  )
}
