import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import styled from "styled-components/macro"
import useReactRouter from "use-react-router"
import {
  TransitionGroup as TransitionGroupBase,
  CSSTransition
} from "react-transition-group"

import { fadeTime } from "components/SceneContainer"
import GlobalStyles from "styles/globalStyles"
import FullScreenLoading from "components/FullScreenLoading"
import GA from "services/ga"
import Display from "components/Display"
import Environment from "components/Environment"
import Websites from "scenes/Websites"
import Art from "scenes/Art"
import Bio from "scenes/Bio"
import Menu from "scenes/Menu"

const GoogleAnalytics = () => {
  const { location } = useReactRouter()
  useEffect(() => GA.pageview(location.pathname), [location])
  return <> </>
}

const TransitionGroup = styled(TransitionGroupBase)`
  width: 100%;
  height: 100%;
  position: relative;
`

export default function App() {
  return (
    <>
      <GlobalStyles />
      <React.Suspense fallback={<FullScreenLoading />}>
        <Router>
          <GoogleAnalytics />
          <Environment />
          <Display>
            <Route
              render={({ location }) => (
                <TransitionGroup style={{ width: "100%", height: "100%" }}>
                  <CSSTransition
                    key={location.key}
                    timeout={fadeTime}
                    classNames="fade"
                  >
                    <Switch location={location}>
                      <Route path="/" exact component={Menu} />
                      <Route path="/websites" exact component={Websites} />
                      <Route path="/art" exact component={Art} />
                      <Route path="/bio" exact component={Bio} />
                      <Redirect to="/" />
                      {/* TODO: 404 Page */}
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          </Display>
        </Router>
      </React.Suspense>
    </>
  )
}
