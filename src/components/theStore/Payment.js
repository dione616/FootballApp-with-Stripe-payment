import React from "react"
import Stripes from "../../Resources/images/stripes.png"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { toast } from "react-toastify"

const Payment = props => {
  let [product, setProduct] = React.useState({
    name: props.data.formdata.name,
    price: props.data.formdata.price
  })
  let newData = props.data.formdata
  console.log(newData)

  console.log(product)

  async function handleToken(token) {
    setProduct(props.data.formdata.price)
    console.log(token)
    console.log(`----THIS IS PRODUCT----:${product}`)

    const response = await axios.post(
      "https://iekw7.sse.codesandbox.io/checkout",
      { token, product }
    )
    const { status } = response.data
    console.log(response)
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" })
    } else {
      toast("Failure! Something went wrong", { type: "error" })
    }
  }

  return (
    <div>
      {console.log(product)}
      <div
        className="content_wrapper"
        style={{ background: `url(${Stripes}) repeat` }}
      >
        <div className="item_wrapper">
          <h3>Item: {props.data.formdata.name.value}</h3>
          <div className="item_price">
            Price: ${props.data.formdata.price.value}
          </div>
        </div>
      </div>
      {
        <StripeCheckout
          stripeKey="pk_test_UclFoF5f0JeleayORl9NIVwE00GfM2oo7L"
          token={handleToken}
          billingAddress
          shippingAddress
          amount={props.data.formdata.price.value * 100}
          name={props.data.formdata.name.value}
        />
      }
    </div>
  )
}

export default Payment
