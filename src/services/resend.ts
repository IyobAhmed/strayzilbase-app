/**
 * StrayzilBase - Resend Email Verification Scaffolding (v0.1)
 * This is prepared for future email authentication/verification integration with Resend.
 * It outlines the structure of the API call to send verification codes to users during registration.
 */

export interface EmailPayload {
  to: string;
  username: string;
  verificationCode: string;
}

export class ResendService {
  /**
   * Stub for sending a verification email.
   * When deployed, your Express server on Render will receive the user's email
   * and use the official Resend SDK to dispatch the mail.
   */
  static async sendVerificationEmail(payload: EmailPayload): Promise<{ success: boolean; message: string }> {
    console.log(`[ResendService] Simulating email delivery using Resend API to ${payload.to}`);
    console.log(`[ResendService] Verification Code: ${payload.verificationCode} sent to ${payload.username}`);
    
    // In production (Express backend):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'StrayzilBase <noreply@strayzilbase.com>',
    //   to: payload.to,
    //   subject: 'Verify your StrayzilBase Account',
    //   html: `<strong>Welcome to StrayzilBase, ${payload.username}!</strong> your verification code is <strong>${payload.verificationCode}</strong>`
    // });

    return {
      success: true,
      message: `A test verification email was emulated for ${payload.to}. Code: ${payload.verificationCode}`
    };
  }

  static getResendIntegrationSteps() {
    return [
      "Create a free Resend account at resend.com",
      "Verify your custom domain or use the default resend testing domain",
      "Generate an API Key and add it to your server environments as RESEND_API_KEY",
      "Install 'resend' npm package in your server-side project",
      "Implement a POST /api/auth/send-verification API endpoint that calls this method"
    ];
  }
}
