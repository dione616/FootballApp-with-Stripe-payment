import React from "react"
import Layout from "./Hoc/Layout"
import { Switch } from "react-router-dom"
import Home from "./components/home"
import SignIn from "./components/signin/index"
import Dashboard from "./components/admin/Dashboard"
import PrivateRoutes from "./components/authRoutes/privateRoutes"
import PublicRoutes from "./components/authRoutes/publicRoutes"
import AdminMatches from "./components/admin/matches"
import AddEditMatch from "./components/admin/matches/addEditMatch"

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
        <PrivateRoutes
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />
        <PublicRoutes
          {...props}
          restricted={true}
          path="/sign_in"
          exact
          component={SignIn}
        />
      </Switch>
    </Layout>
  )
}

export default Routes
//do not go next before understand all
