import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Password = ({ passwordRef, id = 'password', label = 'Password' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDown = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        variant="standard"
        id={id}
        label={label}
        type={showPassword ? 'text' : 'password'} // Toggle between text and password
        fullWidth
        inputRef={passwordRef}
        inputProps={{ minLength: 6, maxLength: 20 }}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleEyeClick} onMouseDown={handleMouseDown} >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

export default Password;