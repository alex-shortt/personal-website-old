import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Arrow from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Arrow />).toJSON()

  expect(tree).toMatchSnapshot()
})
