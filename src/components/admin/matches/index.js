import React, { Component } from "react"
import { Link } from "react-router-dom"
import AdminLayout from "../../../Hoc/AdminLayout"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { firebaseMatches } from "../../../firebase"
import { firebaseLooper, reverseArray } from "../../ui/misc"
import CircularProgress from "@material-ui/core/CircularProgress"

class AdminMatches extends Component {
  state = {
    isloading: true,
    matches: []
  }

  componentDidMount() {
    console.log(this.state.matches)

    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot)

      this.setState({
        isloading: false,
        matches: reverseArray(matches)
      })
    })
    console.log(this.state.matches)
  }

  render() {
    return (
      <AdminLayout>
        <div className="">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(this.state.matches)}
                {this.state.matches
                  ? this.state.matches.map((match, i) => (
                      <TableRow key={i}>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <Link to={`/admin_matches/edit_match/${match.id}`}>
                            <span className="span_tag_blue">{match.away}</span>
                            <strong> VS </strong>
                            <span className="span_tag_blue">{match.local}</span>
                          </Link>
                        </TableCell>
                        <TableCell>
                          {match.resultAway}
                          <strong> - </strong>
                          {match.resultLocal}
                        </TableCell>
                        <TableCell>
                          {match.final === "Yes" ? (
                            <span className="matches_tag_red">Final</span>
                          ) : (
                            <span className="span_tag_green">
                              Not played yet
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isloading ? (
              <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
            ) : (
              ""
            )}
          </div>
        </div>
      </AdminLayout>
    )
  }
}

export default AdminMatches
