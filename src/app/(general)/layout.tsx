import Header from "@/components/Header";
import Nav from "@/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isHomePage={false} />
      <main>{children}</main>
      <Nav />
    </>
  );
}
