import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  display: inline-block;
  margin: 30px 15px;
  justify-content: space-around;
  position: relative;
  width: 90%;
  max-width: 400px;
`

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

const TextBox = styled.div`
  width: 100%;
  color: black;
  box-sizing: border-box;
  padding: 10px 0;
  transform: translateY(-4px);
`

const TitleLink = styled.a`
  font-size: 1.4rem;
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.7px;
  position: relative;
  cursor: pointer;
  transition: color ease 0.3s;
  color: black;
  padding: 10px;
  display: block;
  margin-bottom: 5px;

  &:hover {
    color: white;
    &::after {
      width: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 0%;
    left: 0;
    bottom: 0;
    background-color: black;
    transition: all ease 0.3s;
  }
`

const Subtitle = styled.h3`
  font-size: 1.1rem;
  font-family: proxima-nova, sans-serif;
  font-weight: 100;
  margin: 0;
  font-style: italic;
  padding: 0 10px;
`

export default function Entry(props) {
  const { id, title, subtitle, link, image } = props
  return (
    <Container key={id}>
      <Image src={image} />
      <TextBox>
        <TitleLink href={link} target="_blank">
          {title}
        </TitleLink>
        <Subtitle>{subtitle}</Subtitle>
      </TextBox>
    </Container>
  )
}
