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
import NOTshirt from "../../Resources/images/NOTshirt.jpg"

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
      <div className="store-items-wrapper">
        {console.log(this.state.items)}
        {this.state.items
          ? this.state.items.map((item, i) => (
              <div className="player_card_wrapper" key={i}>
                <Link to={`/store/${item.id}`}>
                  <div className="player_card_thmb" style={{ background: `#f2f9ff url(${NOTshirt})` }} />
                  <div className="player_card_info">
                    <div className="player_card_number">{`$${item.price}`}</div>
                    <div className="player_card_name">
                      <span>{item.name}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : null}

        <div className="admin_progress">
          {this.state.isloading ? <CircularProgress thickness={7} style={{ color: "#98c5e9" }} /> : ""}
        </div>
      </div>
    )
  }
}

export default TheStore
