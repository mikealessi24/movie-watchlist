import { Resend } from "resend";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "./prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: email,
          subject: "Here's your pin!",
          html: `
              <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
                
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 32px;">
                  <h1 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0;">Watchlist</h1>
                </div>

                <!-- Card -->
                <div style="background: #f9f9f9; border-radius: 12px; padding: 32px; text-align: center;">
                  <h2 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">Your sign in pin</h2>
                  <p style="font-size: 14px; color: #666; margin: 0 0 24px;">Enter this pin to sign in. It expires in 10 minutes.</p>
                  
                  <!-- OTP -->
                  <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; margin: 0 0 24px;">
                    <span style="font-size: 48px; font-weight: 700; letter-spacing: 12px; color: #c4930a;">${otp}</span>
                  </div>

                  <p style="font-size: 13px; color: #999; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
                </div>

              </div>`,
        });
      },
      otpLength: 6,
      expiresIn: 600, // 10 minutes
      sendVerificationOnSignUp: true,
    }),
  ],
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
});
