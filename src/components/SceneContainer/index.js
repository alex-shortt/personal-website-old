import React from "react"
import styled from "styled-components/macro"

import { FADE_TIME, DELAY } from "components/PageTransition"

export default styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  &.fade-appear,
  &.fade-enter {
    opacity: 0;
    z-index: 1;
    transition-delay: ${DELAY + FADE_TIME}ms;
  }

  &.fade-appear-active,
  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity ${FADE_TIME}ms ease-in ${DELAY + FADE_TIME}ms;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity ${FADE_TIME}ms ease-out;
  }
`
