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
import AdminPlayers from "./components/admin/players"
import AddEditPlayers from "./components/admin/players/addEditPlayers"
import TheTeam from "./components/theTeam"

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/admin_players/add_players"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/add_players/:id"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players"
          exact
          component={AdminPlayers}
        />

        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match"
          exact
          component={AddEditMatch}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />

        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
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
        <PublicRoutes
          {...props}
          restricted={false}
          path="/the_team"
          exact
          component={TheTeam}
        />
      </Switch>
    </Layout>
  )
}

export default Routes
//do not go next before understand all
