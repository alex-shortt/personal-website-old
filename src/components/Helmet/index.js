import React from "react"
import { Helmet as ReactHelmet } from "react-helmet"

export default function Helmet(props) {
  const { title, children } = props

  return (
    <ReactHelmet>
      <title>{title ? `${title} | alex shortt` : "alex shortt"}</title>
      {children}
    </ReactHelmet>
  )
}
