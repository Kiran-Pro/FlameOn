import nodemailer from "nodemailer";

export function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function sendOrderConfirmation(user, order) {
  const transporter = getTransporter();

  const itemsHtml = order.cart
    .map(
      (item) => `
      <tr style="background:#fafafa;">
        <td style="padding:8px 12px;">${item.name}</td>
        <td style="padding:8px 12px; text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px; text-align:right;">₹${item.price}</td>
        <td style="padding:8px 12px; text-align:right;">₹${
          item.price * item.quantity
        }</td>
      </tr>
    `
    )
    .join("");

  const html = `
  <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; background:#fff; border:1px solid #eaeaea; border-radius:8px; overflow:hidden;">
    
    <!-- Header -->
    <div style="background:linear-gradient(90deg,#f59e0b,#ef4444); padding:20px; text-align:center; color:#fff;">
      <h1 style="margin:0; font-size:24px;">FlameOn</h1>
      <p style="margin:0; font-size:14px;">Order Confirmation</p>
    </div>

    <!-- Body -->
    <div style="padding:20px; color:#333;">
      <h2 style="margin-top:0;">Hi ${user.name},</h2>
      <p>Thank you for ordering from <b>FlameOn</b>! We're preparing your meal and will notify you once it’s on the way</p>

      <p><b>Order ID:</b> ${order._id}</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-top:20px; border:1px solid #ddd; font-size:14px;">
        <thead>
          <tr style="background:#f3f4f6; text-align:left;">
            <th style="padding:10px;">Item</th>
            <th style="padding:10px; text-align:center;">Qty</th>
            <th style="padding:10px; text-align:right;">Price</th>
            <th style="padding:10px; text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr style="background:#f9fafb; font-weight:bold;">
            <td colspan="3" style="padding:10px; text-align:right;">Grand Total</td>
            <td style="padding:10px; text-align:right;">₹${
              order.totalPrice
            }</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top:20px;">If you have any questions, feel free to contact our support team.</p>
    </div>

    <!-- Footer -->
    <div style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#666;">
      <p style="margin:0;">&copy; ${new Date().getFullYear()} FlameOn. All rights reserved.</p>
      <p style="margin:0;">This is an automated email, please do not reply.</p>
    </div>

  </div>
  `;

  await transporter.sendMail({
    from: `"FlameOn Orders" <no-reply@flameon.com>`,
    to: user.email,
    subject: `Order Confirmed - ${order._id}`,
    html,
  });
}
