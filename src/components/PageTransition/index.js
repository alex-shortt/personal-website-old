import React, { useContext } from "react"
import styled from "styled-components/macro"
import {
  TransitionGroup as TransitionGroupBase,
  CSSTransition
} from "react-transition-group"
import { Route } from "react-router-dom"

import { EnvironmentContext } from "services/environment"

export const FADE_TIME = 750
export const DELAY = 3650

const DEPTH_TIME = DELAY / 2.5
const DEPTH_DELAY = FADE_TIME * 0.8

const MAX_DEPTH = 60

const TransitionGroup = styled(TransitionGroupBase)`
  width: 100%;
  height: 100%;
  position: relative;
`

// ease-in, 0 maps to 1 and 1 maps to 0
const ease = x => (Math.cos(Math.PI * x) + 1) / 2

export default function PageTransition(props) {
  const { scene } = useContext(EnvironmentContext)
  const { render } = props

  const onEnter = () => {
    const startDate = new Date()

    const animIn = () => {
      const diff = new Date() - startDate - DEPTH_DELAY
      const perc = Math.min(1, Math.max(0, diff / DEPTH_TIME))
      const eased = 1 - ease(perc)
      if (perc < 1) {
        scene.noisebox.depth = eased * MAX_DEPTH
        setTimeout(animIn, 1)
      }
    }

    const animOut = () => {
      const diff = new Date() - startDate - 2 * FADE_TIME - DELAY + DEPTH_TIME
      const perc = diff / DEPTH_TIME
      const eased = ease(perc)
      if (perc <= 0) {
        setTimeout(animOut, 1)
      } else if (perc > 0 && perc < 1) {
        scene.noisebox.depth = eased * MAX_DEPTH
        setTimeout(animOut, 1)
      } else {
        scene.noisebox.depth = 0
      }
    }

    animIn()
    animOut()
  }

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={FADE_TIME * 2 + DELAY}
            onEnter={onEnter}
            classNames="fade"
          >
            {render(location)}
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  )
}
