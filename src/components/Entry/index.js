import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { Button as ButtonBase } from "components/common"

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 50px 0;

  &:first-of-type {
    margin-top: 0;
  }
`

const Image = styled.img`
  width: 350px;
`

const TextBox = styled.div`
  flex: 1;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 2rem;
  font-family: roboto-mono, sans-serif;
  margin: 0 0 5px;
`

const Subtitle = styled.h3`
  font-size: 1.25rem;
  font-family: aktiv-grotesk, sans-serif;
  margin: 0 0 5px;
  font-weight: 200;
  font-style: italic;
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const Button = styled(ButtonBase)`
  font-size: 1rem;
`

export default function Entry(props) {
  const { id, title, subtitle, link, image } = props
  return (
    <Container>
      <Image src={image} />
      <TextBox>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <br />
        <Row>
          <Button href={link} target="_blank" type="a">
            Visit
          </Button>
          <Button to={`/websites/${id}`}>Read More</Button>
        </Row>
      </TextBox>
    </Container>
  )
}
