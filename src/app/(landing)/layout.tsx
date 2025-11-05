import "react-photo-view/dist/react-photo-view.css";
import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 106 }}>{children}</main>
      <Footer />
    </>
  );
}
