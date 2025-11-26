"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import { Save, Phone, Email, LocationOn, Language } from "@mui/icons-material";
import { Telegram, WhatsApp } from "@mui/icons-material"; // Добавлены иконки
import { useContacts } from "@/features/contacts/hooks/use-contacts";

export default function ContactsEditorPage() {
  const { contacts, loadingContacts, errorContacts, updateContacts } =
    useContacts();
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    mapLink: "",
    website: "",
    telegram: "",
    whatsapp: "",
  });
  const [message, setMessage] = useState("");

  // Загружаем данные в форму при загрузке
  useEffect(() => {
    setFormData(contacts);
  }, [contacts]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const success = await updateContacts(formData);
    if (success) {
      setMessage("Контакты успешно сохранены!");
    } else {
      setMessage("Ошибка при сохранении контактов");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Редактирование контактов
      </Typography>

      {(message || errorContacts) && (
        <Alert
          severity={
            message.includes("Ошибка") || errorContacts ? "error" : "success"
          }
          sx={{ mb: 2 }}
        >
          {message || errorContacts}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Форма редактирования */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Редактировать контактную информацию
            </Typography>

            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Номер телефона"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                fullWidth
                placeholder="+7 (XXX) XXX-XX-XX"
                helperText="Введите номер телефона в международном формате"
                InputProps={{
                  startAdornment: (
                    <Phone sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />

              <TextField
                label="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                fullWidth
                placeholder="example@company.com"
                helperText="Введите адрес электронной почты"
                InputProps={{
                  startAdornment: (
                    <Email sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />

              <TextField
                label="Адрес"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                fullWidth
                multiline
                rows={2}
                placeholder="г. Москва, ул. Примерная, д. 123"
                helperText="Введите физический адрес компании"
                InputProps={{
                  startAdornment: (
                    <LocationOn sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />

              <TextField
                label="Ссылка на карту (Яндекс.Карты)"
                value={formData.mapLink}
                onChange={(e) => handleChange("mapLink", e.target.value)}
                fullWidth
                placeholder="https://yandex.ru/maps/?text=..."
                helperText="Скопируйте ссылку на местоположение из Яндекс.Карт"
                InputProps={{
                  startAdornment: (
                    <LocationOn sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />

              <TextField
                label="Официальный сайт"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                fullWidth
                placeholder="https://company.com"
                helperText="Введите полный URL официального сайта"
                InputProps={{
                  startAdornment: (
                    <Language sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />

              {/* Добавлено поле для Telegram */}
              <TextField
                label="Ссылка на Telegram"
                value={formData.telegram}
                onChange={(e) => handleChange("telegram", e.target.value)}
                fullWidth
                placeholder="https://t.me/username или https://t.me/chatlink"
                helperText="Введите ссылку на Telegram-чат или профиль"
                InputProps={{
                  startAdornment: (
                    <Telegram sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />

              {/* Добавлено поле для WhatsApp */}
              <TextField
                label="Ссылка на WhatsApp"
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                fullWidth
                placeholder="https://wa.me/79991234567"
                helperText="Введите ссылку для связи через WhatsApp"
                InputProps={{
                  startAdornment: (
                    <WhatsApp sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />

              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                disabled={loadingContacts}
                sx={{ alignSelf: "flex-start", minWidth: 120 }}
              >
                {loadingContacts ? "Сохранение..." : "Сохранить"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Блок с подсказками */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Подсказки по форматам ссылок
            </Typography>
            
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="body2">
                <strong>Telegram:</strong><br />
                • Для профиля: https://t.me/username<br />
                • Для чата: https://t.me/chatname<br />
                • С предзаполненным сообщением: https://t.me/username?start=hello
              </Typography>

              <Typography variant="body2">
                <strong>WhatsApp:</strong><br />
                • По номеру: https://wa.me/79991234567<br />
                • С предзаполненным сообщением: https://wa.me/79991234567?text=Hello
              </Typography>

              <Typography variant="body2">
                <strong>Телефон:</strong><br />
                • Указывайте в международном формате: +7 (999) 123-45-67
              </Typography>

              <Typography variant="body2">
                <strong>Карты:</strong><br />
                • Яндекс.Карты: https://yandex.ru/maps/-/CDUfzBw2<br />
                • Google Maps: https://goo.gl/maps/...
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}