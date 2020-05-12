import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import PageTransition from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<PageTransition />).toJSON()

  expect(tree).toMatchSnapshot()
})
