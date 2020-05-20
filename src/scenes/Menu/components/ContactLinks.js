import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Container = styled.div`
  padding: 25px 0;
  display: flex;
  box-sizing: border-box;
`

const Icon = styled(FontAwesomeIcon)`
  margin: 0 10px;
  font-size: 2rem;

  &:hover {
    opacity: 0.75;
  }
`

const Anchor = styled.a`
  color: black !important;
  cursor: pointer;
  transition: opacity 0.15s ease-out;

  &:hover {
    opacity: 0.75;
  }
`

function IconLink(props) {
  const { href, icon } = props
  return (
    <Anchor href={href} target="_blank" rel="noopener noreferrer">
      <Icon icon={icon} />
    </Anchor>
  )
}

export default function ContactLinks(props) {
  const { ...restProps } = props

  return (
    <Container {...restProps}>
      <IconLink
        href="https://github.com/alex-shortt"
        icon={["fab", "github"]}
      />
      <IconLink
        href="https://instagram.com/alexander.shortt"
        icon={["fab", "instagram"]}
      />
      <IconLink
        href="mailto:alexander.shortt@gmail.com"
        icon={["far", "envelope"]}
      />
    </Container>
  )
}
