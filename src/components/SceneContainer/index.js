import React from "react"
import styled from "styled-components/macro"

export const fadeTime = 1000

export default styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  &.fade-appear,
  &.fade-enter {
    opacity: 0;
    z-index: 1;
  }

  &.fade-appear-active,
  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity ${fadeTime}ms ease-out ${fadeTime / 2}ms;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity ${fadeTime / 2}ms ease-out;
  }
`
