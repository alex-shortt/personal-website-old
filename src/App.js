import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components/macro"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import useReactRouter from "use-react-router"

import GlobalStyles from "styles/globalStyles"
import FullScreenLoading from "components/FullScreenLoading"
import GA from "services/ga"
import Display from "components/Display"
import Environment from "components/Environment"

import { ThreeWrapper } from "./services/threeWrapper"

const View = React.lazy(() => import("scenes/View"))

const GoogleAnalytics = () => {
  const { location } = useReactRouter()
  useEffect(() => GA.pageview(location.pathname), [location])
  return <> </>
}

export default function App() {
  return (
    <>
      <GlobalStyles />
      <React.Suspense fallback={<FullScreenLoading />}>
        <Router>
          <GoogleAnalytics />
          <Environment />
          <Display>
            <Switch>
              <Route path="/" component={View} />
              {/* TODO: 404 Page */}
            </Switch>
          </Display>
        </Router>
      </React.Suspense>
    </>
  )
}
