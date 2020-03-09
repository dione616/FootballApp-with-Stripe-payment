import React, { Component } from "react"
import AdminLayout from "../../../Hoc/AdminLayout"
import { firebaseDB, firebaseStore } from "../../../firebase"
import { validate, firebaseLooper } from "../../ui/misc"
import FormField from "../../ui/formFields"

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
        valid: true,
        validationMessage: "",
        showlabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Item price",
          name: "price_input",
          type: "number",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      }
    }
  }

  updateForm(element) {
    const newFormdata = { ...this.state.formdata }
    const newElement = { ...newFormdata[element.id] }

    newElement.value = element.event.target.value

    let validData = validate(newElement)

    newElement.valid = validData[0]
    newElement.validationMessage = validData[1]

    newFormdata[element.id] = newElement

    this.setState({
      formError: false,
      formdata: newFormdata
    })
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

  successForm(message) {
    this.setState({
      formSuccess: message
    })
    setTimeout(() => {
      this.setState({ formSuccess: "" })
    }, 2000)
  }

  submitForm(event) {
    event.preventDefault()
    console.log(this.state)

    let dataToSubmit = {}
    let formIsValid = true

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value
    }

    console.log(formIsValid)

    if (formIsValid) {
      if (this.state.formType === "Edit Item") {
        console.log("in")
        firebaseDB
          .ref(`/items/${this.state.itemId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Updated Correctly")
          })
          .catch(e => {
            this.setState({
              formError: true
            })
          })
      } else {
        console.log("in2")
        firebaseStore
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_store")
          })
          .catch(e => {
            this.setState({ formError: true })
          })
      }
    } else {
      console.log("not in")
    }
  }
  render() {
    console.log(this.state)

    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div className="">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />

              <div className="select_team_layout">
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"price"}
                      formdata={this.state.formdata.price}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something wrong!!!</div>
              ) : (
                ""
              )}

              <div className="admin_submit">
                <button onClick={event => this.submitForm(event)}>
                  {this.state.formType}
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    )
  }
}

export default AddEditItem
