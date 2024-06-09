import React from 'react'
import Image from 'next/image';
import thankyou from '../../../public/images/icon-thank-you.svg'

export default function ThankYou() {
  return (
    <section className="flex flex-col justify-center items-center  lg:pb-4 w-full h-full">
      <Image src={thankyou} alt='Thank you' className="w-[60px] lg:w-auto"></Image>
      <h1 className="text-2xl lg:text-[32px] font-bold text-marine-blue mt-6">
        Thank you!
      </h1>
      <p className="text-cool-gray text-center mt-4 px-2 lg:px-0">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </section>
  )
}
