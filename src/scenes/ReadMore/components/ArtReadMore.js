import React from "react"
import styled from "styled-components/macro"

import pieces from "scenes/Art/assets/pieces"

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 650px;
`

const Header = styled.div`
  width: 100%;
  margin-bottom: 20px;
  min-height: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    ${props => (props.dark ? "black" : "white")} 30%,
    transparent
  );
`

const HeaderImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
`

const Title = styled.h2`
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  font-size: 1.75rem;
  margin: 0.25em 0 0;
  text-transform: uppercase;
  letter-spacing: 1.7px;
  color: ${props => (props.dark ? "white" : "black")};
`

const Subtitle = styled.h4`
  font-family: proxima-nova, sans-serif;
  font-weight: 100;
  font-size: 1rem;
  margin: 0.15em 0 0.75em;
  text-transform: uppercase;
  letter-spacing: 1.7px;
  font-style: italic;
  color: ${props => (props.dark ? "white" : "black")};
`

const Content = styled.div`
  font-family: proxima-nova, sans-serif;
  font-weight: 200;
  font-size: 1.3rem;
  margin: 0.25em 0;
  line-height: 1.45em;
`

export default function ArtReadMore(props) {
  const { children, id, dark } = props
  const piece = pieces.find(item => item.id === id)
  const { title, subtitle, heroImage } = piece

  return (
    <Container>
      <Header dark={dark}>
        <HeaderImage src={heroImage} />
        <Title dark={dark}>{title}</Title>
        <Subtitle dark={dark}>{subtitle}</Subtitle>
      </Header>
      <Content>{children}</Content>
    </Container>
  )
}
