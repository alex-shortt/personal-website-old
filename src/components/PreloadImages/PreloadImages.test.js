import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import PreloadImages from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<PreloadImages />).toJSON()

  expect(tree).toMatchSnapshot()
})
