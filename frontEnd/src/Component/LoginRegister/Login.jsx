import React from 'react'

const Login = () => {
  return (
   <div class="login-container">
  <div class="login-card">
    <div class="login-header">
      <h2>Welcome Back</h2>
      <p>Login to access your report dashboard</p>
    </div>
    
    <form class="login-form">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email"/>
      </div>
      
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" />
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>
      
      <button type="submit" class="login-button">Login</button>
      
      <div class="social-login">
        <p>Or login with</p>
        <div class="social-icons">
          <button class="google-btn"><i class="icon-google"></i></button>
          <button class="microsoft-btn"><i class="icon-microsoft"></i></button>
        </div>
      </div>
      
      <div class="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </form>
  </div>
</div>
  )
}

export default Login
