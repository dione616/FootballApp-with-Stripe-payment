import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Stripes from "../../Resources/images/stripes.png"
import { firebaseDB, firebaseStore } from "../../firebase"
import { firebaseLooper } from "../ui/misc"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { toast } from "react-toastify"
import Payment from "./Payment"
import { Link } from "react-router-dom"
import AdminLayout from "../../Hoc/AdminLayout"

class TheStoreItem extends Component {
  state = {
    formdata: {
      name: {
        value: ""
      },
      price: {
        value: ""
      }
    }
  }
  updateFields(match, teamOptions, teams, type, matchId) {
    const newFormdata = {
      ...this.state.formdata
    }

    console.log(this.state.formdata, newFormdata)

    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key] //match come from server
      }
    }

    this.setState({ formdata: newFormdata })
  }

  componentDidMount() {
    const matchId = this.props.match.params.id

    const getTeams = match => {
      console.log(match)

      this.updateFields(match /* , teamOptions, teams, type , matchId*/)
    }

    //EDIT EXISTING MATCH
    firebaseDB
      .ref(`items/${matchId}`)
      .once("value")
      .then(snapshot => {
        const match = snapshot.val()
        getTeams(match /* "Edit Match" */)
      })
  }

  render() {
    console.log(this.state)

    return (
      <div>
        <div className="item-wrapper"></div>
        <Payment data={this.state} />
      </div>
    )
  }
}

export default TheStoreItem
