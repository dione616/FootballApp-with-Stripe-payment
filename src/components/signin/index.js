import React, { Component } from "react"
import FormField from "../ui/formFields"
import { validate } from "../ui/misc"
import { firebase } from "../../firebase"

export default class SignIn extends Component {
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
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
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
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          //use react-router
          this.props.history.push("/dashboard")
        })
        .catch(error => {
          this.setState({
            formError: true
          })
        })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: "100px" }}>
          <form onSubmit={event => this.submitForm(event)}></form>
          <h2>Please Login</h2>

          <FormField
            id={"email"}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"password"}
            formdata={this.state.formdata.password}
            change={element => this.updateForm(element)}
          />

          {this.state.formError ? (
            <div className="error_label">Somthing is wrong!</div>
          ) : null}

          <button onClick={event => this.submitForm(event)}>Log In</button>
        </div>
      </div>
    )
  }
}
