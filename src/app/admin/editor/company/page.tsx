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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Add, Edit, DragHandle } from "@mui/icons-material";
import { useCompanyInfo } from "@/features/company/hooks/use-company-info";
import { CompanyBlock } from "@/shared/types";

export default function CompanyEditorPage() {
  const { blocks, loading, error, addBlock, updateBlock, deleteBlock } =
    useCompanyInfo();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingBlock, setEditingBlock] = useState<CompanyBlock | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddBlock = async () => {
    if (!text.trim()) {
      setMessage("Введите текст");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const result = await addBlock({
      text: text.trim(),
      imageUrl: imageUrl.trim(), // теперь передаем пустую строку вместо undefined
    });

    if (result) {
      setMessage("Блок добавлен!");
      setText("");
      setImageUrl("");
    } else {
      setMessage("Ошибка при добавлении блока");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEditBlock = (block: CompanyBlock) => {
    setEditingBlock(block);
    setText(block.text);
    setImageUrl(block.imageUrl || ""); // гарантируем, что не будет undefined
    setDialogOpen(true);
  };

  const handleUpdateBlock = async () => {
    if (!editingBlock || !text.trim()) return;

    const success = await updateBlock(editingBlock.id, {
      text: text.trim(),
      imageUrl: imageUrl.trim(), // передаем пустую строку вместо undefined
    });

    if (success) {
      setMessage("Блок обновлен!");
      setDialogOpen(false);
      setEditingBlock(null);
      setText("");
      setImageUrl("");
    } else {
      setMessage("Ошибка при обновлении блока");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteBlock = async (id: string) => {
    const success = await deleteBlock(id);
    if (success) {
      setMessage("Блок удален!");
    } else {
      setMessage("Ошибка при удалении блока");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Редактирование информации о компании
      </Typography>

      {(message || error) && (
        <Alert
          severity={message.includes("Ошибка") || error ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {message || error}
        </Alert>
      )}

      {/* Форма добавления нового блока */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Добавить новый блок
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Текст блока *"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={4}
            fullWidth
            disabled={loading}
            placeholder="Введите текст абзаца..."
          />
          <TextField
            label="Ссылка на изображение (необязательно)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
            disabled={loading}
            placeholder="https://example.com/image.jpg"
            helperText="Оставьте пустым, если изображение не нужно"
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddBlock}
            disabled={loading || !text.trim()}
            sx={{ alignSelf: "flex-start" }}
          >
            {loading ? "Добавление..." : "Добавить блок"}
          </Button>
        </Box>
      </Paper>

      {/* Список существующих блоков */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Блоки информации ({blocks.length})
        </Typography>

        {loading && blocks.length === 0 ? (
          <Typography textAlign="center" py={3}>
            Загрузка...
          </Typography>
        ) : blocks.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            Блоки не добавлены
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {blocks.map((block) => (
              <Card key={block.id}>
                <CardContent>
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    <DragHandle sx={{ color: "text.secondary", mt: 1 }} />
                    <Box flex={1}>
                      <Typography variant="body1" paragraph>
                        {block.text}
                      </Typography>
                      {block.imageUrl && (
                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          {/* <Image color="primary" /> */}
                          <Typography
                            variant="body2"
                            color="primary"
                            component="a"
                            href={block.imageUrl}
                            target="_blank"
                            sx={{ textDecoration: "none" }}
                          >
                            Изображение
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditBlock(block)}
                    disabled={loading}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteBlock(block.id)}
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
      </Paper>

      {/* Диалог редактирования */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Редактировать блок</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Текст блока *"
              value={text}
              onChange={(e) => setText(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Ссылка на изображение (необязательно)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
              placeholder="https://example.com/image.jpg"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button
            onClick={handleUpdateBlock}
            variant="contained"
            disabled={!text.trim()}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
