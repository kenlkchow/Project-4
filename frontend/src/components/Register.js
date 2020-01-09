import React from 'react'
import axios from 'axios'
import 'bulma'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        username: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }
  }
  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
    console.log(this.state.data)
  }
  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data, { headers: { 'Authorization': '' } })
      // .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }
  render() {
    return <section className="section">
      <div className="container">
        <div className="title">Register</div>
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="field">
            <label htmlFor="" className="label">
              Username
            </label>
            <div className="control">
              <input
                onChange={(e) => this.handleChange(e)}
                type="text"
                name="username"
                className="input"
              />
            </div>
            {this.state.errors.username && <small className="help is-danger">
              {this.state.errors.username}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Password
            </label>
            <div className="control">
              <input
                onChange={(e) => this.handleChange(e)}
                type="text"
                name="password"
                className="input"
              />
            </div>
            {this.state.errors.password && <small className="help is-danger">
              {this.state.errors.password}
            </small>}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Confirm password
            </label>
            <div className="control">
              <input
                onChange={(e) => this.handleChange(e)}
                type="text"
                name="password_confirmation"
                className="input"
              />
            </div>
            {this.state.errors.passwordConfirmation && <small className="help is-danger">
              {this.state.errors.passwordConfirmation}
            </small>}
          </div>
          <button className="button is-success">
            Complete registration
          </button>
        </form>
      </div>
    </section>
  }
}
export default Register