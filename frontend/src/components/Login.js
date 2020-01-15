import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/authMethods'
import SignIn from './LoginForm'

const initialData = {
  username: '',
  password: ''
}

const initialErrors = ''

const Login = (props) => {

  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState(initialErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', data, { headers: { 'Authorization': '' } })
      .then(resp => {
        Auth.setToken(resp.data.token)
        props.history.push('/')
      })
      .catch(() => setErrors('Username or password incorrect')
      )
  }

  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value }
    const newErrors = ''
    setData(newData)
    setErrors(newErrors)
  }

  console.log(data)

  return <SignIn
    handleChange={handleChange}
    handleSubmit={handleSubmit}
  />
  // <section className="section">
  //   <div className="container" id="login">
  //     <h1 className="title home-form-title">
  //       <div className="title-name has-text-weight-bold">Login</div>
  //     </h1>
  //     <form className="form form-home" onSubmit={handleSubmit}>
  //       <div className="field">
  //         <label htmlFor="" className="label">
  //           Username
  //         </label>
  //         <div className="control">
  //           <input
  //             type="text"
  //             name="username"
  //             className="input"
  //             onChange={handleChange}
  //           />
  //           {errors && <small className="help is-primary">{errors}</small>}
  //         </div>
  //       </div>
  //       <div className="field">
  //         <label htmlFor="" className="label">
  //           Password
  //         </label>
  //         <div className="control">
  //           <input
  //             type="text"
  //             name="password"
  //             className="input"
  //             onChange={handleChange}
  //           />
  //           {errors && <small className="help is-primary">{errors}</small>}
  //         </div>
  //       </div>
  //       <button className="button is-link">
  //         Login
  //       </button>
  //     </form>
  //   </div>
  // </section>
}

export default Login