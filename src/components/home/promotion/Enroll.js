import React, { Component } from "react"
import Fade from "react-reveal/Fade"
import FormField from "../../ui/formFields"
import { validate } from "../../ui/misc"
import { firebasePromotions } from "../../../firebase"

export default class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  }

  updateForm(element) {
    const newFormData = { ...this.state.formdata }
    //copy of the element to mutate
    const newElement = { ...newFormData[element.id] }

    newElement.value = element.event.target.value //current input text
    let validData = validate(newElement)

    newElement.valid = validData[0]
    newElement.validationMessage = validData[1]

    newFormData[element.id] = newElement //update state copy with new element
    this.setState({ formError: false, formdata: newFormData }) //update whole formdata state
  }

  submitForm(event) {
    event.preventDefault()

    let dataToSubmit = {} //submit key:value
    let formIsValid = true

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value
      //check if form is valid
      formIsValid = this.state.formdata[key].valid && formIsValid
    }

    if (formIsValid) {
      firebasePromotions
        .orderByChild("email")
        .equalTo(dataToSubmit.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() === null) {
            firebasePromotions.push(dataToSubmit)
            this.resetFormSuccess(true)
          } else {
            this.resetFormSuccess(false)
          }
        })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  resetFormSuccess(type) {
    const newFormData = { ...this.state.formdata }

    for (let key in newFormData) {
      newFormData[key].value = ""
      newFormData[key].valid = false
      newFormData[key].validationMessage = ""
    }

    this.setState({
      formError: false,
      formdata: newFormData,
      formSuccess: type ? "Congrat!!!" : "Already in the database"
    })
    this.successMessage()
  }

  successMessage() {
    setTimeout(() => {
      this.setState({ formSuccess: "" })
    }, 2000)
  }

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={"email"}
                formdata={this.state.formdata.email}
                change={element => this.updateForm(element)}
              />

              {/* if formError true display err message */}
              {this.state.formError ? (
                <div className="error_label">Somthing is wrong!</div>
              ) : null}

              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={event => this.submitForm(event)}>Enroll</button>
              <div className="enroll_discl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit veniam enim eveniet obcaecati consequatur hic magni
                temporibus ut ipsum, possimus quae dicta amet fugit praesentium
                aspernatur omnis aut nobis ad?
              </div>
            </div>
          </form>
        </div>
      </Fade>
    )
  }
}
//37 l
