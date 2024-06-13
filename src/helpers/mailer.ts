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
      html: `<h1>Congratulations you have subscribed!</h1>
      <h3>Here are your subscription details:</h3>
      <table>
  // <thead>
  //   <tr>
  //     <th>Song</th>
  //     <th>Artist</th>
  //     <th>Year</th>
  //   </tr>
  // </thead>
  <tbody>
    <tr>
      <td>Plan</td>
      <td class='text-transform: capitalize;'>${subscriptionDetails.selectedPlan}</td>
      <td>$${subscriptionDetails.planCost}</td>
    </tr>
    <tr>
      <td>Addons selected</td>
      <td class='text-transform: capitalize;'>${subscriptionDetails.addonsDetails.map((addon) => addon.name)}</td>
      <td>$${subscriptionDetails.addonsDetails.map((addon) => addon.cost)}</td>
    </tr>
    <tr>
      <td>Total Cost</td>
      <td></td>
      <td>${subscriptionDetails.totalCost}</td>
    </tr>
  </tbody>
</table>
      `

    }

    const confirmationEmail = transport.sendMail(emailContent)
    return confirmationEmail;

  } catch (error: any) {
    throw new Error(error.message)
  }
}