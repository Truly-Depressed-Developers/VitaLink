import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const personId = (await params).personId;
  return (
    <Link href="/" className="absolute left-4 top-4 flex items-center">
      <ArrowLeft size={14} className="mb-0.5 mr-1" />
      Powrót {personId}
    </Link>
  );
}
