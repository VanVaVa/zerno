"use client";

import { useState, useEffect } from "react";
import { useSections } from "../../model/use-sections";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { SectionConfig, SectionContent } from "@/shared/types";

interface SectionEditorProps {
  sectionId: string;
  sectionConfig: SectionConfig;
}

export function SectionEditor({
  sectionId,
  sectionConfig,
}: SectionEditorProps) {
  const { sections, loading, error, loadSection, saveSection } = useSections();
  const [formData, setFormData] = useState<SectionContent>({});
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (sectionId) {
      loadSection(sectionId);
    }
  }, [loadSection, sectionId]);

  useEffect(() => {
    if (sections[sectionId]) {
      setFormData(sections[sectionId]);
    }
  }, [sections, sectionId]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (): Promise<void> => {
    const success = await saveSection(sectionId, formData);
    if (success) {
      setSuccess(true);
    }
  };

  const renderField = (field: string) => {
    const config = sectionConfig.fields[field];
    if (!config) return null;

    switch (config.type) {
      case "textarea":
        return (
          <TextField
            key={field}
            label={config.label}
            value={formData[field]?.toString() || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            fullWidth
            multiline
            rows={config.rows || 3}
            margin="normal"
            required={config.required}
          />
        );
      default:
        return (
          <TextField
            key={field}
            label={config.label}
            value={formData[field]?.toString() || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            fullWidth
            margin="normal"
            required={config.required}
          />
        );
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">{sectionConfig.title}</Typography>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Сохранение..." : "Сохранить"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {sectionConfig.description}
        </Typography>

        {Object.keys(sectionConfig.fields).map((field) => renderField(field))}
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Изменения сохранены успешно!</Alert>
      </Snackbar>
    </Box>
  );
}
