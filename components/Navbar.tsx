"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/SignInDialog";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-lg font-semibold tracking-tight">x</span>
          <div className="mx-8 flex-1 max-w-xl">
            <Input />
          </div>
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
            <Button variant="outline" onClick={() => setOpen(true)}>
              Sign in
            </Button>
          )}
        </div>
      </nav>

      <SignInModal open={open} onOpenChange={setOpen} />
    </>
  );
}
