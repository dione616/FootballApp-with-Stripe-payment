import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Stripes from "../../Resources/images/stripes.png"
import { firebaseStore } from "../../firebase"
import { firebaseLooper } from "../ui/misc"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { toast } from "react-toastify"

toast.configure()

/* rewrite to functional component to POST */

class TheStore extends Component {
  state = {
    isLoading: true,
    items: [{ id: "cap001", name: "M.City Cap", price: 555 }]
  }

  componentDidMount() {
    firebaseStore.once("value").then(snapshot => {
      const store = firebaseLooper(snapshot)
      this.setState({ isLoading: false, items: store })
    })
    console.log(this.state.items[0])
  }

  async handleToken(token) {
    console.log(this.state)

    const response = await axios.post(
      "https://uojcx.sse.codesandbox.io/checkout",
      { token }
    )
    const { status } = response.data()
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" })
    } else {
      toast("Failure! Something went wrong", { type: "error" })
    }
  }

  render() {
    console.log(this.state.items[0])

    return (
      <div
        className="the_team_container"
        style={{ background: `url(${Stripes}) repeat` }}
      >
        {this.state.isLoading ? (
          <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
        ) : (
          ""
        )}
        <div className="store_container">The Store</div>

        <div className="store_wrapper">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {this.state.items
                ? this.state.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          <StripeCheckout
            stripeKey="pk_test_UclFoF5f0JeleayORl9NIVwE00GfM2oo7L"
            token={this.handleToken}
            billingAddress
            shippingAddress
            amount={this.state.items[0].price * 100}
            name={this.state.items[0].name}
          />
        </div>
      </div>
    )
  }
}

export default TheStore
