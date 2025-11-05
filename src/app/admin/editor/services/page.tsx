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
  CardContent,
  CardActions,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { Delete, Add, Edit, AddPhotoAlternate } from "@mui/icons-material";
import { useServices } from "@/features/services/hooks/use-services";
import { ServiceContent, ServiceFeature } from "@/shared/types";
import { iconOptions } from "@/features/services/lib/icons";

export default function ServicesEditorPage() {
  const { services, loading, error, addService, updateService, deleteService } =
    useServices();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceContent | null>(
    null
  );
  const [message, setMessage] = useState("");

  // Поля формы
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [leftParagraph1, setLeftParagraph1] = useState("");
  const [leftParagraph2, setLeftParagraph2] = useState("");
  const [leftList, setLeftList] = useState<string[]>([""]);
  const [leftParagraph3, setLeftParagraph3] = useState("");
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [gallery, setGallery] = useState<string[]>([""]);

  const resetForm = () => {
    setName("");
    setSubtitle("");
    setHeaderTitle("");
    setLeftParagraph1("");
    setLeftParagraph2("");
    setLeftList([""]);
    setLeftParagraph3("");
    setFeatures([]);
    setGallery([""]);
  };

  const handleAddService = async () => {
    if (!name.trim() || !headerTitle.trim()) {
      setMessage("Заполните обязательные поля: название и заголовок услуги");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const result = await addService({
      name: name.trim(),
      subtitle: subtitle.trim(),
      headerTitle: headerTitle.trim(),
      leftParagraph1: leftParagraph1.trim(),
      leftParagraph2: leftParagraph2.trim(),
      leftList: leftList.filter((item) => item.trim()),
      leftParagraph3: leftParagraph3.trim(),
      features: features.filter(
        (feature) => feature.title.trim() && feature.text.trim()
      ),
      gallery: gallery.filter((url) => url.trim()),
    });

    if (result) {
      setMessage("Услуга добавлена!");
      resetForm();
      setDialogOpen(false);
    } else {
      setMessage("Ошибка при добавлении услуги");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEditService = (service: ServiceContent) => {
    setEditingService(service);
    setName(service.name);
    setSubtitle(service.subtitle);
    setHeaderTitle(service.headerTitle);
    setLeftParagraph1(service.leftParagraph1);
    setLeftParagraph2(service.leftParagraph2);
    setLeftList(service.leftList.length ? service.leftList : [""]);
    setLeftParagraph3(service.leftParagraph3);
    setFeatures(service.features);
    setGallery(service.gallery.length ? service.gallery : [""]);
    setDialogOpen(true);
  };

  const handleUpdateService = async () => {
    if (!editingService || !name.trim() || !headerTitle.trim()) return;

    const success = await updateService(editingService.id, {
      name: name.trim(),
      subtitle: subtitle.trim(),
      headerTitle: headerTitle.trim(),
      leftParagraph1: leftParagraph1.trim(),
      leftParagraph2: leftParagraph2.trim(),
      leftList: leftList.filter((item) => item.trim()),
      leftParagraph3: leftParagraph3.trim(),
      features: features.filter(
        (feature) => feature.title.trim() && feature.text.trim()
      ),
      gallery: gallery.filter((url) => url.trim()),
    });

    if (success) {
      setMessage("Услуга обновлена!");
      setDialogOpen(false);
      setEditingService(null);
      resetForm();
    } else {
      setMessage("Ошибка при обновлении услуги");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteService = async (id: string) => {
    const success = await deleteService(id);
    if (success) {
      setMessage("Услуга удалена!");
    } else {
      setMessage("Ошибка при удалении услуги");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  // Функции для работы со списками
  const addListItem = () => {
    setLeftList([...leftList, ""]);
  };

  const updateListItem = (index: number, value: string) => {
    const newList = [...leftList];
    newList[index] = value;
    setLeftList(newList);
  };

  const removeListItem = (index: number) => {
    const newList = leftList.filter((_, i) => i !== index);
    setLeftList(newList.length ? newList : [""]);
  };

  const addFeature = () => {
    setFeatures([
      ...features,
      {
        id: Date.now().toString(),
        title: "",
        text: "",
        iconName: "Build", // иконка по умолчанию
      },
    ]);
  };

  const updateFeature = (
    index: number,
    field: keyof ServiceFeature,
    value: string
  ) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFeatures(newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const addGalleryItem = () => {
    if (gallery.length < 6) {
      setGallery([...gallery, ""]);
    }
  };

  const updateGalleryItem = (index: number, value: string) => {
    const newGallery = [...gallery];
    newGallery[index] = value;
    setGallery(newGallery);
  };

  const removeGalleryItem = (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery.length ? newGallery : [""]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Управление услугами
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
        <Typography variant="h6">Услуги ({services.length})</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            resetForm();
            setEditingService(null);
            setDialogOpen(true);
          }}
          disabled={loading}
        >
          Добавить услугу
        </Button>
      </Box>

      {loading && services.length === 0 ? (
        <Typography textAlign="center" py={3}>
          Загрузка...
        </Typography>
      ) : services.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={3}>
          Услуги не добавлены
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: 2,
          }}
        >
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {service.subtitle}
                </Typography>
                <Typography variant="body2">
                  Особенности: {service.features.length}
                </Typography>
                <Typography variant="body2">
                  Изображения: {service.gallery.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleEditService(service)}
                  disabled={loading}
                >
                  Редактировать
                </Button>
                <Button
                  size="small"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteService(service.id)}
                  disabled={loading}
                  color="error"
                >
                  Удалить
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      {/* Диалог добавления/редактирования услуги */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {editingService ? "Редактировать услугу" : "Добавить услугу"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, maxHeight: "70vh", overflow: "auto" }}>
            <Grid container spacing={3}>
              {/* Основная информация */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Основная информация
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Название услуги *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Подзаголовок"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Заголовок услуги *"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* Левая часть */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Левая часть (текстовый контент)
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Первый абзац"
                  value={leftParagraph1}
                  onChange={(e) => setLeftParagraph1(e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Второй абзац (перед списком)"
                  value={leftParagraph2}
                  onChange={(e) => setLeftParagraph2(e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>

              {/* Список */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Маркированный список
                </Typography>
                {leftList.map((item, index) => (
                  <Box key={index} display="flex" gap={1} mb={1}>
                    <TextField
                      label={`Пункт ${index + 1}`}
                      value={item}
                      onChange={(e) => updateListItem(index, e.target.value)}
                      fullWidth
                    />
                    <IconButton
                      onClick={() => removeListItem(index)}
                      disabled={leftList.length === 1}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Button startIcon={<Add />} onClick={addListItem}>
                  Добавить пункт
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Третий абзац (после списка)"
                  value={leftParagraph3}
                  onChange={(e) => setLeftParagraph3(e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>

              {/* Правая часть - особенности */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Правая часть (особенности)
                </Typography>
                {features.map((feature, index) => (
                  <Paper key={feature.id} sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Заголовок особенности"
                          value={feature.title}
                          onChange={(e) =>
                            updateFeature(index, "title", e.target.value)
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Текст особенности"
                          value={feature.text}
                          onChange={(e) =>
                            updateFeature(index, "text", e.target.value)
                          }
                          multiline
                          rows={2}
                          fullWidth
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                          <InputLabel>Иконка</InputLabel>
                          <Select
                            value={feature.iconName}
                            label="Иконка"
                            onChange={(e) =>
                              updateFeature(index, "iconName", e.target.value)
                            }
                          >
                            {iconOptions.map((icon) => {
                              const IconComponent = icon.component;
                              return (
                                <MenuItem key={icon.name} value={icon.name}>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                                    {/*@ts-ignore */}
                                    <IconComponent />
                                    {icon.label}
                                  </Box>
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Button
                          startIcon={<Delete />}
                          onClick={() => removeFeature(index)}
                          color="error"
                        >
                          Удалить особенность
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Button startIcon={<Add />} onClick={addFeature}>
                  Добавить особенность
                </Button>
              </Grid>

              {/* Галерея */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Галерея изображений (1-6 штук)
                </Typography>
                {gallery.map((url, index) => (
                  <Box key={index} display="flex" gap={1} mb={1}>
                    <TextField
                      label={`Изображение ${index + 1}`}
                      value={url}
                      onChange={(e) => updateGalleryItem(index, e.target.value)}
                      fullWidth
                    />
                    <IconButton
                      onClick={() => removeGalleryItem(index)}
                      disabled={gallery.length === 1}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                {gallery.length < 6 && (
                  <Button
                    startIcon={<AddPhotoAlternate />}
                    onClick={addGalleryItem}
                  >
                    Добавить изображение
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button
            onClick={editingService ? handleUpdateService : handleAddService}
            variant="contained"
            disabled={!name.trim() || !headerTitle.trim()}
          >
            {editingService ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
