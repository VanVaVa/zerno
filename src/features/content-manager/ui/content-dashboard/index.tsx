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
  company: {
    title: "О компании",
    description: "Информация о компании",
    link: "about-us",
  },
  contacts: {
    title: "Контакты",
    description: "Контактная информация",
    link: "feedback",
  },
  map: {
    title: "Точки на карте",
    description: "Управление точками проектов на карте",
    link: "about-us",
  },
  services: {
    title: "Услуги",
    description: "Управление услугами",
    link: "services",
  },
  gallery: {
    title: "Портфолио",
    description: "Управление портфолио",
    link: "portfolio",
  },
  "wow-park": {
    title: "Wow-парк",
    description: "Управление изображениями",
    link: "wow-park",
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
                onClick={() => router.push(`/${config.link}`)}
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
