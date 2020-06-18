import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import styled from "styled-components/macro"
import useReactRouter from "use-react-router"

import { EnvironmentProvider } from "services/environment"
import GlobalStyles from "styles/globalStyles"
import FullScreenLoading from "components/FullScreenLoading"
import GA from "services/ga"
import Display from "components/Display"
import Environment from "components/Environment"
import Websites from "scenes/Websites"
import Art from "scenes/Art"
import About from "scenes/About"
import Menu from "scenes/Menu"

import PageTransition from "./components/PageTransition"
import ReadMore from "./scenes/ReadMore"

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
          <EnvironmentProvider>
            <Environment />
            <Display>
              <PageTransition
                render={location => (
                  <Switch location={location}>
                    <Route path="/" exact component={Menu} />
                    <Route path="/websites" exact component={Websites} />
                    <Route path="/art" exact component={Art} />
                    <Route path="/about" exact component={About} />
                    <Route path="/websites/:id" exact component={ReadMore} />
                    <Route path="/art/:id" exact component={ReadMore} />
                    <Redirect to="/" />
                    {/* TODO: 404 Page */}
                  </Switch>
                )}
              />
            </Display>
          </EnvironmentProvider>
        </Router>
      </React.Suspense>
    </>
  )
}
