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
  Chip,
  IconButton,
} from "@mui/material";
import {
  Delete,
  Add,
  Edit,
  Image as MuiImage,
  Close,
} from "@mui/icons-material";
import { useGallery } from "@/features/gallery/hooks/use-gallery";
import { GalleryItem } from "@/shared/types";
import Image from "next/image";

interface FormItem {
  imageUrl: string[];
  caption: string;
}

export default function GalleryEditorPage() {
  const { items, loading, error, addMultipleItems, updateItem, deleteItem } =
    useGallery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [message, setMessage] = useState("");

  const [formItems, setFormItems] = useState<FormItem[]>([
    { imageUrl: [""], caption: "" },
  ]);

  const resetForm = () => {
    setFormItems([{ imageUrl: [""], caption: "" }]);
  };

  const addFormField = () => {
    setFormItems([...formItems, { imageUrl: [""], caption: "" }]);
  };

  const removeFormField = (index: number) => {
    if (formItems.length > 1) {
      setFormItems(formItems.filter((_, i) => i !== index));
    }
  };

  const addImageUrlField = (formIndex: number) => {
    const updatedItems = [...formItems];
    updatedItems[formIndex].imageUrl.push("");
    setFormItems(updatedItems);
  };

  const removeImageUrlField = (formIndex: number, urlIndex: number) => {
    const updatedItems = [...formItems];
    if (updatedItems[formIndex].imageUrl.length > 1) {
      updatedItems[formIndex].imageUrl = updatedItems[
        formIndex
      ].imageUrl.filter((_, i) => i !== urlIndex);
      setFormItems(updatedItems);
    }
  };

  const updateFormField = (
    formIndex: number,
    field: keyof Omit<FormItem, "imageUrl">,
    value: string
  ) => {
    const updatedItems = [...formItems];
    updatedItems[formIndex] = { ...updatedItems[formIndex], [field]: value };
    setFormItems(updatedItems);
  };

  const updateImageUrl = (
    formIndex: number,
    urlIndex: number,
    value: string
  ) => {
    const updatedItems = [...formItems];
    updatedItems[formIndex].imageUrl[urlIndex] = value;
    setFormItems(updatedItems);
  };

  const handleAddItems = async () => {
    const itemsToAdd = formItems
      .map((item) => ({
        imageUrl: item.imageUrl.filter((url) => url.trim() !== ""),
        caption: item.caption.trim(),
      }))
      .filter((item) => item.imageUrl.length > 0);

    if (itemsToAdd.length === 0) {
      setMessage("Добавьте хотя бы одно изображение");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setMessage("Добавление изображений...");

    const result = await addMultipleItems(itemsToAdd);

    if (result) {
      setMessage(`Успешно добавлено ${result.length} элементов галереи`);
      resetForm();
      setDialogOpen(false);
    } else {
      setMessage("Ошибка при добавлении элементов галереи");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEditItem = (item: GalleryItem) => {
    setEditingItem(item);
    setFormItems([{ imageUrl: item.imageUrl, caption: item.caption }]);
    setDialogOpen(true);
  };

  const handleUpdateItem = async () => {
    if (
      !editingItem ||
      formItems[0].imageUrl.filter((url) => url.trim() !== "").length === 0
    )
      return;

    setMessage("Обновление...");
    const success = await updateItem(editingItem.id, {
      imageUrl: formItems[0].imageUrl.filter((url) => url.trim() !== ""),
      caption: formItems[0].caption.trim(),
    });

    if (success) {
      setMessage("Элемент галереи обновлен!");
      setDialogOpen(false);
      setEditingItem(null);
      resetForm();
    } else {
      setMessage("Ошибка при обновлении элемента галереи");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteItem = async (id: string) => {
    setMessage("Удаление...");
    const success = await deleteItem(id);
    if (success) {
      setMessage("Элемент галереи удален!");
    } else {
      setMessage("Ошибка при удалении элемента галереи");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const filledItemsCount = formItems.filter((item) =>
    item.imageUrl.some((url) => url.trim() !== "")
  ).length;

  const totalImageUrls = formItems.reduce(
    (acc, item) =>
      acc + item.imageUrl.filter((url) => url.trim() !== "").length,
    0
  );

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
          Элементы в галерее ({items.length})
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
          Добавить элементы
        </Button>
      </Box>

      {loading && items.length === 0 ? (
        <Typography textAlign="center" py={3}>
          Загрузка...
        </Typography>
      ) : items.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={3}>
          Элементы не добавлены
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
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
                    {item.imageUrl[0] ? (
                      <Image
                        src={item.imageUrl[0]}
                        alt={item.caption || "Изображение галереи"}
                        fill
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <MuiImage
                        sx={{
                          fontSize: 48,
                          color: "text.secondary",
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Изображений: {item.imageUrl.length}
                  </Typography>
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

      <Dialog
        open={dialogOpen}
        onClose={() => !loading && setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingItem
            ? "Редактировать элемент галереи"
            : `Добавить элементы ${
                filledItemsCount > 0 ? `(${filledItemsCount})` : ""
              }`}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {formItems.map((formItem, formIndex) => (
              <Box
                key={formIndex}
                sx={{
                  mb: 3,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={2}
                >
                  <Typography variant="subtitle1">
                    Элемент галереи {formIndex + 1}
                  </Typography>
                  {!editingItem && formItems.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => removeFormField(formIndex)}
                      color="error"
                      disabled={loading}
                    >
                      <Close />
                    </IconButton>
                  )}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  URL изображений:
                </Typography>

                {formItem.imageUrl.map((url, urlIndex) => (
                  <Box
                    key={urlIndex}
                    display="flex"
                    alignItems="flex-start"
                    gap={1}
                    mb={1}
                  >
                    <TextField
                      label={`URL изображения ${urlIndex + 1}`}
                      value={url}
                      onChange={(e) =>
                        updateImageUrl(formIndex, urlIndex, e.target.value)
                      }
                      fullWidth
                      margin="normal"
                      disabled={loading}
                      placeholder="https://example.com/image.jpg"
                    />
                    {formItem.imageUrl.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => removeImageUrlField(formIndex, urlIndex)}
                        color="error"
                        disabled={loading}
                        sx={{ mt: 1 }}
                      >
                        <Close />
                      </IconButton>
                    )}
                  </Box>
                ))}

                <Button
                  startIcon={<Add />}
                  onClick={() => addImageUrlField(formIndex)}
                  disabled={loading}
                  size="small"
                  sx={{ mb: 2 }}
                >
                  Добавить URL
                </Button>

                <TextField
                  label="Подпись к элементу"
                  value={formItem.caption}
                  onChange={(e) =>
                    updateFormField(formIndex, "caption", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  multiline
                  rows={2}
                  disabled={loading}
                  placeholder="Описание элемента галереи..."
                  helperText="Необязательное поле"
                />

                {/* Предпросмотр первого изображения */}
                {formItem.imageUrl.map((el, idx) => (
                  <Box sx={{ mt: 2 }} key={idx}>
                    <Typography variant="subtitle2" gutterBottom>
                      Предпросмотр {idx + 1} изображения:
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
                        src={formItem.imageUrl[0]}
                        alt={`Предпросмотр ${formIndex + 1}`}
                        fill
                        style={{ objectFit: "contain" }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}

            {!editingItem && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Button
                  startIcon={<Add />}
                  onClick={addFormField}
                  variant="outlined"
                  disabled={loading}
                >
                  Добавить еще один элемент
                </Button>
                <Box display="flex" gap={1}>
                  <Chip
                    label={`Элементов: ${filledItemsCount}`}
                    color={filledItemsCount > 0 ? "primary" : "default"}
                    variant="outlined"
                  />
                  <Chip
                    label={`Изображений: ${totalImageUrls}`}
                    color={totalImageUrls > 0 ? "secondary" : "default"}
                    variant="outlined"
                  />
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={loading}>
            Отмена
          </Button>
          {!editingItem && (
            <Button
              onClick={addFormField}
              startIcon={<Add />}
              disabled={loading}
            >
              Еще элемент
            </Button>
          )}
          <Button
            onClick={() => {
              setDialogOpen(false);
              if (editingItem) handleUpdateItem();
              else handleAddItems();
            }}
            variant="contained"
            disabled={
              !formItems.some((item) =>
                item.imageUrl.some((url) => url.trim())
              ) || loading
            }
          >
            {loading
              ? "Сохранение..."
              : editingItem
              ? "Сохранить"
              : "Добавить все"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
