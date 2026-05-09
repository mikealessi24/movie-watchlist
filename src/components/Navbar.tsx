"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Search from "@/components/hero/Search";
import { cn } from "@/lib/utils";
import SignInDialog from "@/components/SignInDialog";

interface NavbarProps {
  showSearch?: boolean;
  value?: string;
  onChange?: (query: string) => void;
  searchBarRef?: React.RefObject<HTMLInputElement | null>;
}

export default function Navbar({
  showSearch,
  value,
  onChange,
  searchBarRef,
}: NavbarProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 items-center gap-4 px-8">
          <span className="text-xl text-primary font-semibold tracking-tight">
            M
          </span>

          <div
            className={cn(
              "flex justify-center w-full min-w-0 transition-all duration-200",
              showSearch ? "visible" : "max-md:visible invisible",
            )}
          >
            <div className="w-full max-w-3xl">
              <Search
                inNavbar
                onChange={onChange}
                value={value}
                inputRef={searchBarRef}
              />
            </div>
          </div>

          <div className="flex-none flex items-center gap-3">
            {session ? (
              <>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={session.user?.image ?? ""} />
                  <AvatarFallback>
                    {session.user?.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
                Sign in
              </Button>
            )}
          </div>
        </div>
      </nav>

      <SignInDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
