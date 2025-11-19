import PortfolioCategoryPage from "@/pages/portfolioCategory/PortfolioCategoryPage";
import { Suspense } from "react";
import styles from "../../services/[serviceId]/servicePage.module.scss";

const Page = async ({ params }: PageProps<"/portfolio/[categoryId]">) => {
  const { categoryId } = await params;
  return (
    <Suspense fallback={<div className={styles.suspense}>Загрузка...</div>}>
      <PortfolioCategoryPage categoryId={categoryId} />
    </Suspense>
  );
};

export default Page;
