import React from "react"
import styled from "styled-components/macro"

export const fadeTime = 500
export const delay = 2000

export default styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  &.fade-appear,
  &.fade-enter {
    opacity: 0;
    z-index: 1;
    transition-delay: ${delay + fadeTime}ms;
  }

  &.fade-appear-active,
  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity ${fadeTime}ms ease-out ${delay + fadeTime}ms;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity ${fadeTime}ms ease-out;
  }
`
