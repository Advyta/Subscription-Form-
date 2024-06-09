'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const links = [
  { name: 'Your Info', href: '/personal-info', pageNo: 1 },
  { name: 'Select Plan', href: '/plans', pageNo: 2 },
  { name: 'Add-Ons', href: '/add-ons', pageNo: 3 },
  { name: 'Summary', href: '/finishing-up', pageNo: 4 },
];

export default function StepLinks() {
  const pathname = usePathname();

  return (
    <div className='flex flex-row lg:flex-col gap-4 lg:gap-6'>
      {links.map((link) => (
        <Link
          key={link.pageNo}
          href={link.href}>
          <div className="flex items-center gap-4 group">
            <button className={clsx(
              'w-[33px] h-[33px] rounded-full border transition-colors duration-300  text-center align-middle group-hover:bg-[#bfe2fd80] group-hover:text-marine-blue',
              { 'bg-light-blue text-marine-blue border-transparent': pathname === link.href, 'text-white bg-transparent border-white': pathname !== link.href }
            )}>
              {link.pageNo}
            </button>
            <div className="hidden lg:flex flex-col uppercase">
              <h3 className={clsx('font-normal text-[13px] text-cool-gray group-hover:text-[#dce0fb]')}>
                Step {link.pageNo}
              </h3>
              <h2
                className={clsx(
                  'font-bold text-white text-[14px] tracking-[0.1em] group-hover:text-[#eaedff]'
                )}>
                {link.name}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
