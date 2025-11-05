"use client";

import { LoginForm } from "@/features/auth/ui/login-form";
import { AuthGuard } from "@/features/auth/ui/auth-guard";
import { Container, Paper, Typography, Box } from "@mui/material";

export default function AdminLoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Вход в админку
            </Typography>
            <LoginForm />
          </Paper>
        </Box>
      </Container>
    </AuthGuard>
  );
}
