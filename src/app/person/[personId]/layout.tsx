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
      <main className="h-[83vh] overflow-y-auto p-4">{children}</main>
      <Nav />
    </>
  );
}
