# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

Additional personal challenge:

- Store a subscriber's information including the selected plans and add ons on mongoDB.
- Send an email on the user's email Id confirming subscription and details of the selected plans and addons (using nodemailer and mailtrap).
- Delete all the information of a subscriber when they unsubscribe.

### Links

- Solution URL: [Multi-step-form-nextjs](https://github.com/Advyta/Subscription-Form)
- Live Site URL: [Live site URL](https://subscription-form-sand.vercel.app/personal-info)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (version 6 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Advyta/Subscription-Form.git
    cd Subscription-Form
    ```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
### Running the Application

1. Create a .env.local file in the root directory and add your environment variables:
    ```env
    TOKEN_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_connection_string
    MAILER_USER=your_user_from_mailtrap
    MAILER_PASSWORD=your_password_from_mailtrap
    ```
1. Start the development server:
    ```bash
    npm run dev
    ```
The application will be available at http://localhost:3000.

## My process

### Built with

- Nextjs 14
- Tailwind css
- Typescript
- React Hook Form
- Mongoose
- Nodemailer and Mailtrap

### What I learned

- Deepened my understanding of Next.js and its features
- Enhanced my TypeScript skills
- Improved my ability to manage state using Context API
- Gained experience in form validation with React Hook Form

### Continued development

I plan to extend this project by:
- Adding an more robost form validation
- Using react hot toast to keep the user updated
- Adding unit tests and integration tests for testing components and API routes to ensure the functionality is as expected.
- Improve the email sent to the subscriber and include the unsubscribe option in the email itself.

### Useful resources

- [Start building with Next.js](https://nextjs.org/learn?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=home) - This helped me learn basics of Nextjs and understand key concepts and folder structure
- [Complete Nextjs fullstack Authentication course](https://youtu.be/eaQc7vbV4po?si=TwOwy7ZXwf_mGXcJ) - Good tutorial to understand basics of Nextjs and intro to MongoDB
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) - For Tailwind CSS and Modal Dialogs template
- ChatGPT: [AskTheCode - Git Companion](https://chatgpt.com/g/g-3s6SJ5V7S-askthecode-git-companion)
- [Microsoft Copilot](https://www.bing.com/chat?q=Bing%20AI&qs=ds&form=NTPCHB)

## Author

- Frontend Mentor - [@Advyta](https://www.frontendmentor.io/profile/Advyta)

## Acknowledgments
 
- [Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ) for the challenge.