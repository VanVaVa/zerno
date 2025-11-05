"use client";

import { useRouter } from "next/navigation";
import { Grid } from "@mui/material"; // или import Grid from '@mui/material/Grid2'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { Edit, Preview } from "@mui/icons-material";

const sectionsConfig = {
  hero: {
    title: "Главный баннер",
    description: "Редактирование заголовка и описания",
  },
  features: {
    title: "Преимущества",
    description: "Управление списком преимуществ",
  },
  about: {
    title: "О компании",
    description: "Информация о компании",
  },
  contacts: {
    title: "Контакты",
    description: "Контактная информация",
  },
} as const;

export function ContentDashboard() {
  const router = useRouter();

  return (
    <Grid container spacing={3}>
      {Object.entries(sectionsConfig).map(([sectionId, config]) => (
        <Grid
          key={sectionId}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {config.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {config.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<Edit />}
                onClick={() => router.push(`/admin/editor/${sectionId}`)}
              >
                Редактировать
              </Button>
              <Button
                size="small"
                startIcon={<Preview />}
                onClick={() => router.push("/")}
              >
                Посмотреть
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
