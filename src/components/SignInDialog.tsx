"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { IconCircleCheck } from "@tabler/icons-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SignInDialog({
  open,
  onOpenChange,
}: SignInDialogProps) {
  const [state, setState] = useState<"idle" | "otp" | "success">("idle");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  async function onEmailSubmit(data: EmailFormData) {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: data.email,
      type: "sign-in",
    });

    if (error) {
      return;
    }

    setEmail(data.email);
    setState("otp");
  }

  async function onOtpComplete(value: string) {
    setIsVerifying(true);
    setOtpError("");

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp: value,
    });

    if (error) {
      setOtpError("Invalid pin. Please try again.");
      setOtp("");
      setIsVerifying(false);
      return;
    }

    setState("success");
    setTimeout(() => {
      onOpenChange(false);
      setState("idle");
      setEmail("");
      setOtp("");
    }, 2500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen w-screen max-w-screen rounded-none sm:rounded-md sm:h-auto sm:max-w-md">
        {state === "idle" && (
          <>
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription>
                Enter your email and we&apos;ll send you a pin
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send pin"}
              </Button>
            </form>
          </>
        )}
        {state === "otp" && (
          <>
            <DialogHeader>
              <DialogTitle>Enter your code</DialogTitle>
              <DialogDescription>
                We sent a 6-digit code to {email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  onComplete={onOtpComplete}
                  disabled={isVerifying}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
                {otpError && (
                  <p className="text-sm text-destructive">{otpError}</p>
                )}
              </div>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setState("idle");
                  setOtp("");
                  setOtpError("");
                }}
              >
                Use a different email
              </Button>
            </div>
          </>
        )}
        {state === "success" && (
          <>
            <DialogHeader>
              <DialogTitle>You&apos;re signed in!</DialogTitle>
              <DialogDescription>Welcome back.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-8">
              <IconCircleCheck size={80} className="text-green-500" />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
