import React from "react"
import styled, { css } from "styled-components/macro"
import { Link as LinkBase } from "react-router-dom"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 7%;
  justify-content: center;
`

const LinkStyles = css`
  cursor: pointer;
  margin: 5px 0;
  text-decoration: none;
  color: black;
  font-size: 2.5rem;
  font-family: proxima-nova, sans-serif;
  transition: 0.15s linear;

  &:hover {
    opacity: 0.75;
  }
`

const Link = styled(LinkBase)`
  ${LinkStyles}
`

const Anchor = styled.a`
  ${LinkStyles}
`

export default function NavLinks(props) {
  const { ...restProps } = props

  return (
    <Container {...restProps}>
      <Link to="/websites">websites</Link>
      <Link to="/art">art</Link>
      <Link to="/about">about</Link>
      <Anchor href="https://medium.com" target="_blank">
        blog
      </Anchor>
    </Container>
  )
}
