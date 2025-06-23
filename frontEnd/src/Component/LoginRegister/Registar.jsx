import React from 'react'

const Registar = () => {
  return (
   <div class="signup-container">
  <div class="signup-card">
    <div class="signup-header">
      <h2>Create Your Account</h2>
      <p>Get started with smart report submission</p>
    </div>
    
    <form class="signup-form">
      <div class="input-row">
        <div class="input-group">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" placeholder="John"/>
        </div>
        <div class="input-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" placeholder="Doe"/>
        </div>
      </div>
      
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="your.email@example.com" />
      </div>
      
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Create a password" />
        <div class="password-strength">
          <span class="strength-indicator weak"></span>
          <span class="strength-indicator medium"></span>
          <span class="strength-indicator strong"></span>
          <span class="strength-text">Password strength</span>
        </div>
      </div>
      
      <div class="input-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" placeholder="Confirm your password" />
      </div>
      
      <div class="terms-checkbox">
        <input type="checkbox" id="terms"/>
        <label for="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
      </div>
      
      <button type="submit" class="signup-button">Create Account</button>
      
      <div class="login-link">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </form>
  </div>
</div>
  )
}

export default Registar
