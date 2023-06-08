import React, { useState } from 'react';
import './signin.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordconfirm, setConfirmPassword] = useState('');
  const [passwordconfirmError, setConfirmPasswordError] = useState('');


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!email) {
      setEmailError('Email cannot be empty');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!password) {
      setPasswordError('Password cannot be empty');
      return;
    }
    if(!(password===passwordconfirm))
    {
      setConfirmPasswordError('Password should be same');
      return;
    }

    // If all validations pass, you can proceed with the sign-in logic
    // For this example, let's just log the values
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="div1">
    <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div className="validation-feedback invalid">{emailError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordconfirm && <div className="validation-feedback invalid">{passwordError}</div>}
        </div>
         {/* <div className="form-group">
          <label htmlFor="passwordconfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordconfirm"
            name="passwordconfirm"
            value={passwordconfirm}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {passwordconfirm && <div className="validation-feedback invalid">{passwordconfirmError}</div>}
        </div>  */}
        <div className="form-group">
          <button type="submit" className="signin-button w-100 btncolor">Sign-In</button>
        </div>
      </form>
      <div className="help-section">
        <a href="#">Forgot your password?</a>
        <hr />
        <p>New to 
          ThriftTrade?</p>
        <a href="#">Create your ThriftTrade account</a>
      </div>
    </div>
  );
};

export default Login;