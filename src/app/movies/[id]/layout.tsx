import Navbar from "@/components/Navbar";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar hideSearch />
      {children}
    </>
  );
}
