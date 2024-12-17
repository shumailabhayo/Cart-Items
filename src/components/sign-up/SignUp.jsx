import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SignUpImage from '../assets/signupimage.webp';

// Validation schema using yup
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  secondName: yup.string().required("Second name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(7, "Password must be at least 7 characters").max(10, "Password must be at most 10 characters").required("Password is required"),
});

const SignUp = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);  // Handle the sign up here (e.g., call API to create a new user)
  };

  return (
    <Box className='d-flex justify-content-center align-items-center vh-100'>
      <Box className='px-5'>
        <img src={SignUpImage} alt="SignUp" />
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Typography className='fw-bold' variant='h4' gutterBottom>
              Get Started Shopping
            </Typography>
            <Typography variant='h6' gutterBottom>
              Welcome to FreshCart! Enter your details to get started.
            </Typography>

            {/* First Name */}
            <Box className='my-3'>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <TextField
                    error={Boolean(errors?.firstName)}
                    helperText={errors?.firstName?.message}
                    placeholder='First Name'
                    size='small'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>

            {/* Second Name */}
            <Box className='my-3'>
              <Controller
                control={control}
                name="secondName"
                render={({ field }) => (
                  <TextField
                    error={Boolean(errors?.secondName)}
                    helperText={errors?.secondName?.message}
                    placeholder='Second Name'
                    size='small'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>

            {/* Email */}
            <Box className='my-3'>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                    placeholder='Email'
                    size='small'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>

            {/* Password */}
            <Box className='my-3'>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
                    placeholder='Password'
                    size='small'
                    type={ShowPassword ? 'text' : 'password'}
                    fullWidth
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" onClick={() => setShowPassword(!ShowPassword)}>
                          {ShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            {/* Submit Button */}
            <Button className='my-3 bg-success' type='submit' fullWidth variant="contained">
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;

