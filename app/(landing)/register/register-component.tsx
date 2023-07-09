"use client";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSnackbar } from "notistack";
import axiosClient from "@/src/axios/axios-client";
import { emailRegex } from "@/src/regex";

interface RegProps {
  email: string;
  name: string;
  password: string;
  password2: string;
}

const RegisterComponent: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegProps>({ mode: "onBlur" });

  const onSubmit = async (data: RegProps) => {
    const { password2: _omitPwd, ...rest } = data;
    try {
      const res = await axiosClient.post("/auth/register", rest);

      if (res.status === 201) {
        enqueueSnackbar("Account created successfully!", {
          variant: "success",
        });

        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "90svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={theme => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: theme.spacing(5),
          padding: theme.spacing(2),
        })}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" component="h1">
          Create a new account
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            "& > a": {
              color: theme => theme.palette.primary.main,
            },
          }}
        >
          Already have an account?{" "}
          <Link href="/login">Log in here instead</Link>
        </Typography>

        <FormControl fullWidth variant="outlined" error={!!errors.email}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            label="Email"
            {...register("email", {
              pattern: emailRegex,
              validate: value => emailRegex.test(value),
              required: true,
            })}
          />
          {!!errors.email && (
            <FormHelperText>Please enter a valid email address.</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth variant="outlined" error={!!errors.name}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            id="username"
            label="Username"
            {...register("name", {
              minLength: 3,
              maxLength: 20,
              required: true,
            })}
          />
          {!!errors.name && (
            <FormHelperText>Please enter some username.</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth variant="outlined" error={!!errors.password}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 32,
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  tabIndex={-1}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {!!errors.password && (
            <FormHelperText>
              Please enter a valid password. (8 - 32 characters)
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth variant="outlined" error={!!errors.password2}>
          <InputLabel htmlFor="passoword2">Repeat password</InputLabel>
          <OutlinedInput
            id="passoword2"
            type={showPassword ? "text" : "password"}
            {...register("password2", {
              required: true,
              validate: value => value === watch("password"),
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  tabIndex={-1}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Repeat password"
          />
          {!!errors.password2 && (
            <FormHelperText>Passwords don&apos;t match.</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </Paper>
    </Container>
  );
};

export default RegisterComponent;
