"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { Delete, Add, Edit, Image as MuiImage } from "@mui/icons-material";
import { useGallery } from "@/features/gallery/hooks/use-gallery";
import { GalleryItem } from "@/shared/types";
import Image from "next/image";

export default function GalleryEditorPage() {
  const { items, loading, error, addItem, updateItem, deleteItem } =
    useGallery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [message, setMessage] = useState("");

  // Поля формы
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const resetForm = () => {
    setImageUrl("");
    setCaption("");
  };

  const handleAddItem = async () => {
    if (!imageUrl.trim()) {
      setMessage("Введите ссылку на изображение");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const result = await addItem({
      imageUrl: imageUrl.trim(),
      caption: caption.trim(),
    });

    if (result) {
      setMessage("Изображение добавлено!");
      resetForm();
      setDialogOpen(false);
    } else {
      setMessage("Ошибка при добавлении изображения");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEditItem = (item: GalleryItem) => {
    setEditingItem(item);
    setImageUrl(item.imageUrl);
    setCaption(item.caption);
    setDialogOpen(true);
  };

  const handleUpdateItem = async () => {
    if (!editingItem || !imageUrl.trim()) return;

    const success = await updateItem(editingItem.id, {
      imageUrl: imageUrl.trim(),
      caption: caption.trim(),
    });

    if (success) {
      setMessage("Изображение обновлено!");
      setDialogOpen(false);
      setEditingItem(null);
      resetForm();
    } else {
      setMessage("Ошибка при обновлении изображения");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteItem = async (id: string) => {
    const success = await deleteItem(id);
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
        Управление галереей изображений
      </Typography>

      {(message || error) && (
        <Alert
          severity={message.includes("Ошибка") || error ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {message || error}
        </Alert>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6">
          Изображения в галерее ({items.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            resetForm();
            setEditingItem(null);
            setDialogOpen(true);
          }}
          disabled={loading}
        >
          Добавить изображение
        </Button>
      </Box>

      {loading && items.length === 0 ? (
        <Typography textAlign="center" py={3}>
          Загрузка...
        </Typography>
      ) : items.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={3}>
          Изображения не добавлены
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid key={item.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      mb: 2,
                      borderRadius: 1,
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.caption || "Изображение галереи"}
                        objectFit="cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                        layout="fill"
                      />
                    ) : (
                      <MuiImage
                        sx={{
                          fontSize: 48,
                          color: "text.secondary",
                          width: 100,
                          height: 100,
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.caption || "Без подписи"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditItem(item)}
                    disabled={loading}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteItem(item.id)}
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

      {/* Диалог добавления/редактирования изображения */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingItem ? "Редактировать изображение" : "Добавить изображение"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Ссылка на изображение *"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
              margin="normal"
              required
              placeholder="https://example.com/image.jpg"
              helperText="Введите полный URL изображения"
            />
            <TextField
              label="Подпись к изображению"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={2}
              placeholder="Описание изображения..."
              helperText="Необязательное поле"
            />

            {/* Предпросмотр изображения */}
            {imageUrl && (
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
                    src={imageUrl}
                    alt="Предпросмотр"
                    objectFit="contain"
                    layout="fill"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button
            onClick={editingItem ? handleUpdateItem : handleAddItem}
            variant="contained"
            disabled={!imageUrl.trim()}
          >
            {editingItem ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
