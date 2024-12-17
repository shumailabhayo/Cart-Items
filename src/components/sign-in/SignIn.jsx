import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SignInImage from "../assets/man.webp";

// Validation schema using yup
const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(7, "Password must be at least 7 characters").max(10, "Password must be at most 10 characters").required("Password is required"),
});

const SignIn = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);  // Handle login here (e.g., call API for authentication)
  };

  return (
    <Box className="d-flex justify-content-center align-items-center vh-100">
      <Box>
        <img src={SignInImage} alt="SignIn" />
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Typography className="fw-bold" variant="h4">
              Sign in to E-Store
            </Typography>
            <Typography variant="h6">
              Welcome to FreshCart! Enter your email to get started.
            </Typography>

            {/* Email input */}
            <Box className="my-3">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                    placeholder="Email"
                    size="small"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>

            {/* Password input */}
            <Box className="my-3">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
                    placeholder="Password"
                    size="small"
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

            {/* Submit button */}
            <Button className="my-3 bg-success" type="submit" fullWidth variant="contained">
              Sign In
            </Button>

            {/* Sign Up link */}
            <Typography className="mt-3" variant="body1">
              Don’t have an account?{' '}
              <Link className="text-decoration-none" to="/sign-up">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;

