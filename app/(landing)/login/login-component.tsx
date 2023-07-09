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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { emailRegex } from "@/src/regex";

interface LoginProps {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>({ mode: "onBlur" });

  const onSubmit = async (data: LoginProps) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/");
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
          Log in to an existing account
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            "& > a": {
              color: theme => theme.palette.primary.main,
            },
          }}
        >
          Don&apos;t have an account?{" "}
          <Link href="/register">Create one here</Link>
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

        <FormControl fullWidth variant="outlined" error={!!errors.password}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
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
            label="Password"
          />
          {!!errors.password && (
            <FormHelperText>Please enter a valid password.</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" disabled={isSubmitting}>
          Log in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginComponent;
