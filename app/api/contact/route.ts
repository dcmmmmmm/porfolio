import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Cấu hình transporter cho Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ptson.son@gmail.com', // Email của bạn
        pass: 'pequ ulpq nyab imim' // Mật khẩu ứng dụng từ Google Account
      }
    });

    // Cấu hình email
    const mailOptions = {
      from: email,
      to: 'ptson.son@gmail.com', // Email nhận
      subject: `Tin nhắn liên hệ từ ${name}`,
      text: `Tên: ${name}\nEmail: ${email}\nTin nhắn: ${message}`,
      html: `
        <h3>Tin nhắn mới từ form liên hệ</h3>
        <p><strong>Tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tin nhắn:</strong> ${message}</p>
      `
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Gửi email thành công' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi gửi email' },
      { status: 500 }
    );
  }
}