"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardActions,
  Alert,
  Grid,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { useWowPark } from "@/features/wow-park/hooks/use-wow-park";
import Image from "next/image";

export default function WowParkEditorPage() {
  const { images, loading, error, addImage, deleteImage } = useWowPark();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleAddImage = async () => {
    if (!newImageUrl.trim()) {
      setMessage("Введите ссылку на изображение");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const success = await addImage(newImageUrl.trim());
    if (success) {
      setMessage("Изображение добавлено!");
      setNewImageUrl("");
    } else {
      setMessage("Ошибка при добавлении изображения");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteImage = async (index: number) => {
    const success = await deleteImage(index);
    if (success) {
      setMessage("Изображение удалено!");
    } else {
      setMessage("Ошибка при удалении изображения");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Управление Wow-парком
      </Typography>

      {(message || error) && (
        <Alert
          severity={message.includes("Ошибка") || error ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {message || error}
        </Alert>
      )}

      {/* Форма добавления нового изображения */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Добавить новое изображение
        </Typography>

        <Box display="flex" gap={2} alignItems="flex-start">
          <TextField
            label="Ссылка на изображение *"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            fullWidth
            disabled={loading}
            placeholder="https://example.com/image.jpg"
            helperText="Введите полный URL изображения"
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddImage}
            disabled={loading || !newImageUrl.trim()}
            sx={{ minWidth: 120, mt: 1 }}
          >
            {loading ? "Добавление..." : "Добавить"}
          </Button>
        </Box>

        {/* Предпросмотр изображения */}
        {newImageUrl && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Предпросмотр:
            </Typography>
            <Box
              sx={{
                position: "relative",
                height: 200,
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={newImageUrl}
                alt="Предпросмотр"
                layout="fill"
                objectFit="contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </Box>
          </Box>
        )}
      </Paper>

      {/* Список изображений */}
      <Paper sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6">
            Изображения Wow-парка ({images.length})
          </Typography>
        </Box>

        {loading && images.length === 0 ? (
          <Typography textAlign="center" py={3}>
            Загрузка...
          </Typography>
        ) : images.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            Изображения не добавлены
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {images.map((imageUrl, index) => (
              <Grid key={index}>
                <Card>
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Wow-парк изображение ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </Box>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteImage(index)}
                      disabled={loading}
                      color="error"
                    >
                      Удалить
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
