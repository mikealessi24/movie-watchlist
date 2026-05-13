import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Watchlist from "@/components/watchlist/Watchlist";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return <Watchlist session={session} />;
}
