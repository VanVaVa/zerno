"use client";

import { useParams } from "next/navigation";
import { SectionEditor } from "@/features/content-manager/ui/section-editor";
import { sectionsConfig } from "@/features/content-manager/lib/sections-config";
import { Container } from "@mui/material";

export default function EditorPage() {
  const params = useParams();
  const sectionId = params?.section as string;
  const sectionConfig = sectionsConfig[sectionId];

  if (!sectionConfig) {
    return (
      <Container>
        <div>Раздел не найден</div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <SectionEditor sectionId={sectionId} sectionConfig={sectionConfig} />
    </Container>
  );
}
