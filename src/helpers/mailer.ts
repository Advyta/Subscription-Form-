import nodemailer from 'nodemailer'
import Subscription from '@/models/subscriptionModel'

export const sendEmail = async ({ email }: any) => {
  try {

    const subscriptionDetails = await Subscription.findOne({ email });

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
      }
    });

    const emailContent = {
      from: 'abc@gmail.com',
      to: email,
      subject: 'Confirmation of subscription',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #007bff;">Congratulations, you have subscribed!</h1>
        <h3>Here are your subscription details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Details</th>
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Plan</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; text-transform: capitalize;">${subscriptionDetails.selectedPlan}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${subscriptionDetails.planCost}</td>
            </tr>
            ${subscriptionDetails.addonsDetails.map((addon: {name: String, description: String, cost: Number}) => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">Add-on</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-transform: capitalize;">${addon.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${addon.cost}</td>
              </tr>
            `).join('')}
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Total Cost</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${subscriptionDetails.totalCost}</td>
            </tr>
          </tbody>
        </table>
        <p>You will be billed ${subscriptionDetails.billingType}</p>

        <p>If you ever need support, please feel free to email us at support@loremgaming.com.</p>
      </div>
    `
    }

    const confirmationEmail = transport.sendMail(emailContent)
    return confirmationEmail;

  } catch (error: any) {
    throw new Error(error.message)
  }
}