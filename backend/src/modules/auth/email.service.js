import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"TUC Support" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your TUC OTP Verification Code',
    text: `Your OTP for The Underestimate Club is: ${otp}. It is valid for 10 minutes.`,
    html: `
      <div style="font-family: 'Space Mono', monospace; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #00FF85; border-radius: 10px;">
        <h2 style="color: #00FF85; text-align: center;">THE UNDERESTIMATE CLUB</h2>
        <p>Welcome to the club. Your access code is below:</p>
        <div style="font-size: 32px; font-weight: bold; text-align: center; margin: 20px 0; color: #00FF85; letter-spacing: 5px;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p style="font-size: 12px; color: #888;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};
