import Dashboard from "@/components/Dashboard/Dashboard";
import Header from "@/components/Header";
import { getPeople } from "@/lib/actions";

export default async function Home() {
  const people = await getPeople();
  
  return (
    <>
      <Header isHomePage />
      <main className="p-4">
        <Dashboard people={people} />
      </main>
    </>
  );
}