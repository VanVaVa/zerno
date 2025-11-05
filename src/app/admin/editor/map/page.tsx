"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { useMapPoints } from "@/features/map/hooks/use-map-points";

export default function MapEditorPage() {
  const { points, loading, error, addPoint, deletePoint } = useMapPoints();
  const [newLng, setNewLng] = useState("");
  const [newLat, setNewLat] = useState("");
  const [pointName, setPointName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddPoint = async () => {
    const lng = parseFloat(newLng);
    const lat = parseFloat(newLat);

    if (isNaN(lng) || isNaN(lat)) {
      setMessage("Введите корректные координаты");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const result = await addPoint({
      coordinates: [lng, lat],
      name: pointName || `Точка ${points.length + 1}`,
    });

    if (result) {
      setMessage("Точка добавлена!");
      setNewLng("");
      setNewLat("");
      setPointName("");
    } else {
      setMessage("Ошибка при добавлении точки");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeletePoint = async (id: string) => {
    const success = await deletePoint(id);
    if (success) {
      setMessage("Точка удалена!");
    } else {
      setMessage("Ошибка при удалении точки");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Редактирование точек на карте
      </Typography>

      {(message || error) && (
        <Alert
          severity={message.includes("Ошибка") || error ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {message || error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Добавить новую точку
        </Typography>

        <Box display="flex" gap={2} alignItems="flex-start" flexWrap="wrap">
          <TextField
            label="Название точки"
            value={pointName}
            onChange={(e) => setPointName(e.target.value)}
            placeholder="Необязательно"
            disabled={loading}
          />
          <TextField
            label="Долгота (lng)"
            value={newLng}
            onChange={(e) => setNewLng(e.target.value)}
            type="number"
            required
            disabled={loading}
          />
          <TextField
            label="Широта (lat)"
            value={newLat}
            onChange={(e) => setNewLat(e.target.value)}
            type="number"
            required
            disabled={loading}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddPoint}
            disabled={loading || !newLng || !newLat}
            sx={{ minWidth: 120 }}
          >
            {loading ? "Добавление..." : "Добавить"}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Точки на карте ({points.length})
        </Typography>

        {loading && points.length === 0 ? (
          <Typography textAlign="center" py={3}>
            Загрузка...
          </Typography>
        ) : points.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            Точки не добавлены
          </Typography>
        ) : (
          <List>
            {points.map((point) => (
              <ListItem
                key={point.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDeletePoint(point.id)}
                    color="error"
                    disabled={loading}
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={point.name || `Точка ${point.id}`}
                  secondary={`Координаты: ${point.coordinates[0]}, ${point.coordinates[1]}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}
