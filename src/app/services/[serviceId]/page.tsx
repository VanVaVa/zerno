import { Suspense } from "react";
import styles from "./servicePage.module.scss";
import SingleServicePage from "@/pages/singleService/SingleServicePage";

const Page = async ({ params }: PageProps<"/services/[serviceId]">) => {
  const { serviceId } = await params;
  return (
    <Suspense fallback={<div className={styles.suspense}>Загрузка...</div>}>
      <SingleServicePage serviceId={serviceId} />
    </Suspense>
  );
};

export default Page;
