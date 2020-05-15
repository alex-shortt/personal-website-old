import React from "react"
import styled, { keyframes } from "styled-components/macro"

import { Button as ButtonBase } from "components/common"

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`

const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 0 25px;
  justify-content: center;
`

const Wrapper = styled.div`
  box-sizing: border-box;
  max-width: 350px;
  animation: ${fadeIn} 1s ease-out forwards;
`

const Title = styled.h2`
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0.25em 0 0;
  text-transform: uppercase;
  letter-spacing: 1.7px;
`

const Subtitle = styled.h4`
  font-family: proxima-nova, sans-serif;
  font-weight: 100;
  font-size: 0.9rem;
  margin: 0.15em 0 0.75em;
  text-transform: uppercase;
  letter-spacing: 1.7px;
  font-style: italic;
`

const Text = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 200;
  font-size: 1.1rem;
  margin: 0.25em 0;
  line-height: 1.45em;
`

const Button = styled(ButtonBase)`
  font-size: 1.1rem;
  display: inline-block;
  text-align: center;
  margin: 15px 0 0 50%;
  transform: translateX(-50%);
`

const Container = styled.div`
  width: 100%;
  flex: 1;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const BackgroundImage = styled.div`
  width: 60%;
  height: 85%;
  background-position: right;
  background-size: cover;
  background-image: url(${props => props.imgSrc});
  animation: ${slideIn} 1s ease-out forwards;
`

export default function PieceDisplay(props) {
  const { piece } = props

  const { id, title, subtitle, abstract, heroImage } = piece

  return (
    <Container>
      <BackgroundImage imgSrc={heroImage} key={id} />
      <Content>
        <Wrapper key={id}>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <Text>{abstract}</Text>
          <Button to={`/art/${id}`}>Read More</Button>
        </Wrapper>
      </Content>
    </Container>
  )
}
