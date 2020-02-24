import React, { Component } from "react"
import PlayerCard from "../ui/playerCard"
import Fade from "react-reveal/Fade"
import Stripes from "../../Resources/images/stripes.png"
import { firebasePlayers, firebase } from "../../firebase"
import { firebaseLooper } from "../ui/misc"
import { Promise } from "core-js"

class TheTeam extends Component {
  state = { loading: true, players: [] }

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot)

      let promises = []

      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("players")
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url
                resolve() //tells that everything is OK
              })
          })
        )
      }
      Promise.all(promises).then(() => {
        this.setState({ loading: false, players })
      })
    })
  }
  render() {
    return (
      <div
        className="the_team_container"
        style={{
          background: `url(${Stripes}) repeat `
        }}
      ></div>
    )
  }
}

export default TheTeam
//L56 15:00
