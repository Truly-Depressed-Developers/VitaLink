import Dashboard from "@/components/Dashboard/Dashboard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header isHomePage />
      <main>
        <Dashboard />
      </main>
    </>
  );
}
