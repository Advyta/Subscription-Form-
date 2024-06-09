import React from 'react'
import sidebarDes from '../../../public/images/bg-sidebar-desktop.svg';
import sidebarMob from '../../../public/images/bg-sidebar-mobile.svg';
import Image from 'next/image';
import StepLinks from './step-links';

export default function Sidebar() {
  return (
    <div className='relative'>
      <div className="lg:absolute lg:inset-0 lg:px-8 py-8 lg:py-10 flex flex-row justify-center lg:justify-stretch lg:flex-col gap-4 lg:gap-6">
        <StepLinks/>
      </div>
      <Image src={sidebarDes} alt='sidebar'
        priority
        className="hidden lg:block -z-10 max-w-[274px]" />
      <Image src={sidebarMob} alt='sidebar'
        priority
        className="lg:hidden w-full h-full fixed top-0 inset-x-0 -z-10 max-h-[172px] object-cover object-center" />
    </div>
  )
}
