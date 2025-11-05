"use client";

import { useAuth } from "../providers/auth-provider";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Logout, ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Админка лендинга
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            color="inherit"
            startIcon={<ArrowBack />}
            onClick={() => router.push("/")}
            size="small"
          >
            На сайт
          </Button>
          <Typography variant="body2">{user?.email}</Typography>
          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={logout}
            size="small"
          >
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
