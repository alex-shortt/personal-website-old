import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Display from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Display />).toJSON()

  expect(tree).toMatchSnapshot()
})
