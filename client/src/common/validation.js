const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;

const validate = {
  username: (value)=>{
    return (value.trim().length < 6)? 
     {username: true, usernameError: "Username must be atlest 6 characters long"}
     :{username: false, usernameError: false}
  },

  password: (value)=>{
     return (passwordRegex.test(value))
     ? {password: false, passwordError:  false}
     :{password: true, passwordError: "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 symbol (@$%#^&*), 1 number (0-9)."}
  },

  confirmPassword: (value, password)=>{
    return (value === password)
      ?{confirmPassword :false, confirmPasswordError: false}
      : {confirmPassword: true, confirmPasswordError:"Password does not match."}
  }
}

export default validate
