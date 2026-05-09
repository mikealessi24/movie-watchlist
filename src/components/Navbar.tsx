"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/SignInDialog";
import { useDebounce } from "@/hooks/useDebounce";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 300);

  useEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <span className="text-lg font-semibold tracking-tight">
            Watchlist
          </span>

          {/* Search bar */}
          <div className="mx-8 flex-1 max-w-xl">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search movies..."
              className="w-full rounded-full border bg-muted px-5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>

          {/* Auth */}
          {session ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={session.user?.image ?? ""} />
                <AvatarFallback>
                  {session.user?.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setModalOpen(true)}
            >
              Sign in
            </Button>
          )}
        </div>
      </nav>

      <SignInModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
