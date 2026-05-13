import Navbar from "@/components/Navbar";

export default function WatchlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
