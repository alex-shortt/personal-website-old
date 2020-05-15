import React from "react"
import styled from "styled-components/macro"

import { Button as ButtonBase } from "components/common"

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 125px 0;
  justify-content: space-around;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &:nth-of-type(even) {
    flex-direction: row-reverse;

    & > div {
      margin-left: 0 !important;
      margin-right: 20px;
    }
  }
`

const Image = styled.img`
  width: 425px;
`

const TextBox = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-family: proxima-nova, sans-serif;
  margin: 0 0 12px;
  font-weight: 500;
`

const Subtitle = styled.h3`
  font-size: 1.25rem;
  font-family: proxima-nova, sans-serif;
  margin: 0 0 5px;
  font-weight: 200;
  //font-style: italic;
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
      <Image src={image} className="colorful-shadow" />
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
