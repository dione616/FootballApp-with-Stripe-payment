import React, { Component } from "react"
import AdminLayout from "../../../Hoc/AdminLayout"
import { firebaseDB, firebaseStore } from "../../../firebase"
import { validate, firebaseLooper } from "../../ui/misc"

class AddEditItem extends Component {
  state = {
    itemId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    items: [],
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Item name",
          name: "name_input",
          type: "input"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Item price",
          name: "price_input",
          type: "input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      }
    }
  }

  updateFields(item, itemsOptions, items, type, itemId) {
    const newFormdata = { ...this.state.formdata }
    console.log(newFormdata)
    console.log(item)

    for (let key in newFormdata) {
      /* newFormdata[key].value = item[key].value */
      console.log(newFormdata[key])
      newFormdata[key].value = item[key]
    }
    newFormdata.price.value = item.price
    console.log(newFormdata)

    this.setState({ itemId, formdata: newFormdata, items, formType: type })
    console.log(this.state)
  }

  componentDidMount() {
    const itemId = this.props.match.params.id
    console.log(itemId)

    const getItem = (item, type) => {
      firebaseStore.once("value").then(snapshot => {
        const items = firebaseLooper(snapshot)
        const itemsOptions = []

        snapshot.forEach(childSnapshot => {
          console.log(childSnapshot.val())

          itemsOptions.push({
            name: childSnapshot.val().name,
            price: childSnapshot.val().price
          })
        })
        console.log(item, itemsOptions, items, type, itemId)

        this.updateFields(item, itemsOptions, items, type, itemId)
      })
    }

    if (!itemId) {
      getItem(false, "Add Item")
    } else {
      firebaseDB
        .ref(`/items/${itemId}`)
        .once("value")
        .then(snapshot => {
          const item = snapshot.val()

          getItem(item, "Edit Item")
        })
    }
  }
  render() {
    console.log(this.state)

    return (
      <AdminLayout>
        <h2>{this.state.formType}</h2>
        <div>
          {this.state.formdata.name ? (
            <div>
              <div>{this.state.formdata.name.value}</div>
              <div>{this.state.formdata.name.price}</div>
            </div>
          ) : (
            "No"
          )}
        </div>
      </AdminLayout>
    )
  }
}

export default AddEditItem
