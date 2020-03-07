import React, { Component } from "react"
import { firebaseStore } from "../../../firebase"
import { firebaseLooper, reverseArray } from "../../ui/misc"
import AdminLayout from "../../../Hoc/AdminLayout"
import CircularProgress from "@material-ui/core/CircularProgress"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Link } from "react-router-dom"

class AdminStore extends Component {
  state = {
    isloading: true,
    items: []
  }

  componentDidMount() {
    console.log(this.state)
    firebaseStore.once("value").then(snapshot => {
      const items = firebaseLooper(snapshot)
      console.log(items)

      this.setState({ isloading: false, items })
    })
  }

  render() {
    console.log(this.state)
    return (
      <AdminLayout>
        <h2>Store Admin</h2>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items
                ? this.state.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Link to={`/admin_store/edit_item/${item.id}`}>
                          <span className="span_tag_blue">{item.id}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin_store/edit_item/${item.id}`}>
                          <span className="span_tag_blue">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="span_tag_green">$ </span>
                        {item.price}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </Paper>
        <div className="lds-dual-ring"></div>
        {this.state.isloading ? (
          <CircularProgress thickness={8} style={{ color: "#98c5e9" }} />
        ) : (
          ""
        )}
      </AdminLayout>
    )
  }
}

export default AdminStore
