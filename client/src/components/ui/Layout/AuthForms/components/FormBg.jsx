import React from 'react'

export const FormBg = ({
  username,
  password,
  onChange,
  actionCall,
  slogan,
  btnText
}) => {
  return (
    <div className="auth-form ">
    <div className="left">
      <img src="images/logo.png" alt="" className="login-logo" />
      <p className="slogan"> { slogan }</p>
      <img src="/images/email-group.svg" alt="" className="email-group" />
    </div>
    <div className="right">

      <form
        className="authform"
        onSubmit={(e) => actionCall(e)}
      >
        <div className="form-control">
          <input name="username" type="text" value={username} onChange={onChange} className="input" autoComplete="new-off" required />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-control">
          <input name="password" type="password" value={password} onChange={onChange} className="input" autoComplete="new-off" required />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn--signup-header ">
          <h5>{btnText}</h5>
        </button>
      </form>
    </div>
  </div>
  )
}
