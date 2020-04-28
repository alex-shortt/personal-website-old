import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import useReactRouter from "use-react-router"

import GlobalStyles from "styles/globalStyles"
import FullScreenLoading from "components/FullScreenLoading"
import GA from "services/ga"
import Display from "components/Display"
import Environment from "components/Environment"

const Menu = React.lazy(() => import("scenes/Menu"))
const Websites = React.lazy(() => import("scenes/Websites"))

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
              <Route path="/" exact component={Menu} />
              <Route path="/websites" exact component={Websites} />
              <Redirect to="/" />
              {/* TODO: 404 Page */}
            </Switch>
          </Display>
        </Router>
      </React.Suspense>
    </>
  )
}
