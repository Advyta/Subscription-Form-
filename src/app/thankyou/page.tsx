'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import thankyou from '../../../public/images/icon-thank-you.svg'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { useBilling } from '../components/BillingContext';
import axios from 'axios';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ThankYou() {
  const [open, setOpen] = useState(false);
  const { personalInfo } = useBilling();
  const router = useRouter();

  const handleUnsubscribe = async () => {
    try {
      const subscriberEmail = personalInfo.email;
      const response = await axios.delete('/api/thankyou', { data: { email: subscriberEmail } });
      console.log(response.data);
      const response1 = await axios.delete('/api/delete-token');
      console.log(response1.data);

      if (response.data.message === "Subscription and token deleted successfully") {
        // Log cookies before deletion
        console.log('Cookies before deletion: ' + document.cookie);

        // Delete token from client-side
        // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=http://localhost:3000;";
        console.log('document.cookie after deletion: ' + document.cookie);

        console.log('Redirecting to /personal-info');
        setOpen(false);
        router.push('/personal-info');

      } else {
        console.log(response.data.error);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center  lg:pb-4 w-full h-full">
      <Image src={thankyou} alt='Thank you' className="w-[60px] lg:w-auto"></Image>
      <h1 className="text-2xl lg:text-[32px] font-bold text-marine-blue mt-6">
        Thank you!
      </h1>
      <p className="text-cool-gray text-center mt-4 px-2 lg:px-0">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. You will recieve all of your subscription details on your email Id. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>

      <button onClick={() => setOpen(true)} className='underline text-red-600 pt-5'>Unsubscribe</button>

      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div> */}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          UnSubscribe account
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to unsubscribe? All of your data will be permanently
                            removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleUnsubscribe}
                    >
                      Unsubscribe
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      data-autofocus
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  )
}
