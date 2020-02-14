import React, { Component } from "react"
import AdminLayout from "../../../Hoc/AdminLayout"
import FormField from "../../ui/formFields"
import { validate, firebaseLooper } from "../../ui/misc"
import { firebaseDB, firebaseMatches, firebaseTeams } from "../../../firebase"

class AddEditMatch extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formdata: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "Select local team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          label: "Result Local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "Select away team",
          name: "select_away",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          label: "Result Away",
          name: "result_away_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "raferee_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team result",
          name: "select_result",
          type: "select",
          options: [
            { key: "Won", value: "Won" },
            { key: "Lose", value: "Lose" },
            { key: "Draw", value: "Draw" },
            { key: "n/a", value: "Not Availible" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      final: {
        element: "select",
        value: "",
        config: {
          label: "Game played",
          name: "select_played",
          type: "select",
          options: [
            { key: "Yes", value: "Yes" },
            { key: "No", value: "No" }
          ]
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

  updateFields(match, teamOptions, teams, type, matchId) {
    const newFormdata = {
      ...this.state.formdata
    }

    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key] //match come from server
        newFormdata[key].valid = true
      }
      if (key === "local" || key === "away") {
        newFormdata[key].config.options = teamOptions
      }
    }
    console.log(newFormdata)

    this.setState({ matchId, formType: type, formdata: newFormdata, teams })
  }

  componentDidMount() {
    const matchId = this.props.match.params.id

    const getTeams = (match, type) => {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseLooper(snapshot)
        const teamOptions = []

        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName
          })
        })
        this.updateFields(match, teamOptions, teams, type, matchId)
      })
    }

    if (!matchId) {
      //ADD NEW MATCH
    } else {
      //EDIT EXISTING MATCH
      firebaseDB
        .ref(`matches/${matchId}`)
        .once("value")
        .then(snapshot => {
          const match = snapshot.val()

          getTeams(match, "Edit Match")
        })
    }
  }

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div className="">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"date"}
                formdata={this.state.formdata.date}
                change={element => this.updateForm(element)}
              />

              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"local"}
                      formdata={this.state.formdata.local}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="">
                    <FormField
                      id={"resultLocal"}
                      formdata={this.state.formdata.resultLocal}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>
              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"away"}
                      formdata={this.state.formdata.away}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="">
                    <FormField
                      id={"resultAway"}
                      formdata={this.state.formdata.resultAway}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="split_fields">
                <FormField
                  id={"referee"}
                  formdata={this.state.formdata.referee}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"stadium"}
                  formdata={this.state.formdata.stadium}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="split_fields last">
                <FormField
                  id={"result"}
                  formdata={this.state.formdata.result}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"final"}
                  formdata={this.state.formdata.final}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something wrond</div>
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

export default AddEditMatch
