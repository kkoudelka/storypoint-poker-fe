"use client";

import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const DarkModeSwitcher: React.FC = () => {
  const {
    palette: { mode },
  } = useTheme();

  const router = useRouter();

  const isDark = mode === "dark";

  const handleToggle = () => {
    Cookies.set("prefers-dark-mode", (!isDark).toString(), {
      expires: 30 * 12,
      path: "/",
    });
    router.refresh();
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          onChange={handleToggle}
          control={<Switch defaultChecked={isDark} />}
          label="Dark theme"
        />
      </FormGroup>
    </>
  );
};

export default DarkModeSwitcher;
