import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Environment from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Environment />).toJSON()

  expect(tree).toMatchSnapshot()
})
