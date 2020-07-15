import React from "react"
import styled from "styled-components/macro"

const Container = styled.a`
  display: inline-block;
  margin: 30px 15px;
  justify-content: space-around;
  position: relative;
  width: 90%;
  max-width: 400px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  &:hover {
    & > img {
      filter: brightness(1.2);
    }
    & > div {
      color: white;
      &::after {
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
  transition: filter 0.15s linear;
`

const TextBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  transform: translateY(-4px);

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 0;
    left: 0;
    top: 0;
    background-color: black;
    transition: all ease 0.3s;
  }
`

const TitleLink = styled.h1`
  font-size: 1.4rem;
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.7px;
  position: relative;
  cursor: pointer;
  transition: color ease 0.3s;
  padding: 8px 0;
  display: block;
  margin: 0;
  color: inherit;
  text-decoration: none !important;
`

const Subtitle = styled.h3`
  font-size: 1.1rem;
  font-family: proxima-nova, sans-serif;
  font-weight: 100;
  margin: 0;
  font-style: italic;
  padding: 0;
  color: inherit;
  text-decoration: none !important;
  transition: color ease 0.3s;
`

export default function Entry(props) {
  const { id, title, subtitle, link, image } = props
  return (
    <Container key={id} href={link} target="_blank">
      <Image src={image} />
      <TextBox>
        <TitleLink>{title}</TitleLink>
        <Subtitle>{subtitle}</Subtitle>
      </TextBox>
    </Container>
  )
}
