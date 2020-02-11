import React from "react"
import Layout from "./Hoc/Layout"
import { Switch, Route } from "react-router-dom"
import Home from "./components/home"
import SignIn from "./components/signin/index"
import Dashboard from "./components/admin/Dashboard"
import PrivateRoutes from "./components/authRoutes/privateRoutes"

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/sign_in" exact component={SignIn} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes
