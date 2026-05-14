"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Search from "@/components/hero/Search";
import { cn } from "@/lib/utils";
import SignInDialog from "@/components/SignInDialog";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { IconLogout, IconList } from "@tabler/icons-react";

interface NavbarProps {
  showSearch?: boolean;
  value?: string;
  onChange?: (query: string) => void;
  searchBarRef?: React.RefObject<HTMLInputElement | null>;
  hideSearch?: boolean;
}

// TODO: showSearch / hideSearch logic needs some work
// Two different display handlers is confusing

export default function Navbar({
  showSearch,
  value,
  onChange,
  searchBarRef,
  hideSearch = false,
}: NavbarProps) {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 items-center gap-4 px-8">
          <span className="text-xl text-primary font-semibold tracking-tight"></span>
          <div
            className={cn(
              "flex justify-center w-full min-w-0 transition-all duration-200",
              showSearch
                ? "visible"
                : hideSearch
                  ? "invisible"
                  : "max-md:visible invisible",
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
          <ThemeToggle />
          <div className="flex-none flex items-center gap-3">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback>
                      {session.user?.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link
                      href="/watchlist"
                      className="flex items-center gap-2 w-full cursor-pointer"
                    >
                      <IconList size={16} />
                      My list
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => authClient.signOut()}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <IconLogout size={16} />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
