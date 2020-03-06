import React, { Component } from "react"
import AdminLayout from "../../Hoc/AdminLayout"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import CircularProgress from "@material-ui/core/CircularProgress"
import Stripes from "../../Resources/images/stripes.png"
import { firebaseStore } from "../../firebase"
import { firebaseLooper, reverseArray } from "../ui/misc"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { toast } from "react-toastify"
import Payment from "./Payment"
import { Link } from "react-router-dom"

toast.configure()

/* rewrite to functional component to POST */

class TheStore extends Component {
  state = {
    isLoading: true,
    items: []
  }

  componentDidMount() {
    console.log(this.state.items)
    firebaseStore.once("value").then(snapshot => {
      const store = firebaseLooper(snapshot)
      this.setState({ isLoading: false, items: store })
    })
    console.log(this.state.items)
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
                {console.log(this.state.items)}
                {this.state.items
                  ? this.state.items.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>
                          <Link to={`/store/${item.id}`}>
                            <span className="matches_tag_blue">
                              {item.name}
                            </span>
                            <strong> VS </strong>
                            <span className="matches_tag_blue">
                              {item.price}
                            </span>
                          </Link>
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

export default TheStore
