import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Menu from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Menu />).toJSON()

  expect(tree).toMatchSnapshot()
})
