import { Link } from "react-router-dom";
import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fields are mandatory!");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
  };

  render() {
    return (
      <div className="main">
        <h2>Add Contact</h2>
        <Link to="/">
          <button className="btn-back">Back to ContactList</button>
        </Link>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="btn-add">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;