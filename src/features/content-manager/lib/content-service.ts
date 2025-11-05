import { firebaseApi } from "@/shared/api/firebase-api";
import { SectionContent } from "@/shared/types";

export async function getSectionContent(
  sectionId: string
): Promise<SectionContent> {
  try {
    const response = await firebaseApi.getDocument<SectionContent>(
      "sections",
      sectionId
    );
    return response.data || {};
  } catch (error) {
    console.error(`Error loading section ${sectionId}:`, error);
    return {};
  }
}
