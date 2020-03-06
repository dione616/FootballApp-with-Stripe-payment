import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import { firebaseMatches } from "../../firebase"
import { firebaseLooper, reverseArray } from "../ui/misc"
import LeagueTable from "./table"
import MatchesList from "./matchesList"

class TheMatches extends Component {
  state = {
    isLoading: true,
    matches: [],
    filterMatches: [],
    playerFilter: "All",
    resultFilter: "All"
  }

  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot)

      this.setState({
        isLoading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      })
    })
  }

  showPlayed(played) {
    const list = this.state.matches.filter(match => {
      return match.final === played
    })

    this.setState({
      filterMatches: played === "All" ? this.state.matches : list,
      playerFilter: played,
      resultFilter: "All"
    })
  }

  render() {
    const state = this.state
    return (
      <div className="the_matches_container">
        {this.state.isLoading ? (
          <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
        ) : (
          ""
        )}
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">Show match</div>
              </div>
              <div className="cont">
                <div
                  onClick={() => {
                    this.showPlayed("All")
                  }}
                  className={`option`}
                >
                  All
                </div>
                <div
                  onClick={() => {
                    this.showPlayed("Yes")
                  }}
                  className={`option`}
                >
                  Played
                </div>
                <div
                  onClick={() => {
                    this.showPlayed("No")
                  }}
                  className={`option`}
                >
                  Not Played
                </div>
              </div>
            </div>
            <MatchesList matches={state.filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    )
  }
}

export default TheMatches
