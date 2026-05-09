"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SignInDialog({ open, onOpenChange }: SignInModalProps) {
  const [state, setState] = useState<"idle" | "sent">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    await signIn("email", {
      email: data.email,
      redirect: false,
    });
    setState("sent");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen w-screen max-w-screen rounded-none sm:rounded-xl sm:h-auto sm:max-w-md">
        {state === "idle" && (
          <>
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription>
                Enter your email to receive a magic link
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send magic link"}
              </Button>
            </form>
          </>
        )}
        {state === "sent" && (
          <>
            <DialogHeader>
              <DialogTitle>Check your email</DialogTitle>
              <DialogDescription>
                We sent a magic link to your email. Click it to sign in.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setState("idle")}
            >
              Use a different email
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
