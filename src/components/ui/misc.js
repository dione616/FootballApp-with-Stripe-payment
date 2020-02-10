import React from "react"
import { Link } from "react-router-dom"

export const Tag = props => {
  const template = (
    <div
      style={{
        background: props.bck,
        fontSize: props.size,
        color: props.color,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add
      }}
    >
      {props.children}
    </div>
  )

  if (props.link) {
    return <Link to={props.linkto}>{template}</Link>
  } else {
    return template
  }
}

//pushing snapshot values to data and add id of snapshot
export const firebaseLooper = snapshot => {
  let data = []
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  })
  return data
}

//reverse matches array (because limitToLast(6)) to get from 7 to 12 matches
export const reverseArray = actualArray => {
  let reversedArray = []
  for (let i = actualArray.length - 1; i >= 0; i--) {
    reversedArray.push(actualArray[i])
  }
  return reversedArray
}

export const validate = element => {
  let error = [true, ""]

  //check for email
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value)
    const message = `${!valid ? "Must be a valid email" : ""}`
    error = !valid ? [valid, message] : error
  }

  //check for empty
  if (element.validation.required) {
    const valid = element.value.trim() !== ""
    const message = `${!valid ? "This field is required" : ""}`
    error = !valid ? [valid, message] : error
  }
  return error
}
