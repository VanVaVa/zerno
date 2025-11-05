import { ContentDashboard } from "@/features/content-manager/ui/content-dashboard";
import { Container, Typography } from "@mui/material";

export default function AdminDashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Панель управления лендингом
      </Typography>
      <ContentDashboard />
    </Container>
  );
}
