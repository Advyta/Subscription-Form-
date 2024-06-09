import React from 'react'

interface PageHeadingProps {
  heading: string,
  discription: string
}

export default function PageHeadings({ heading, discription }: PageHeadingProps) {
  return (
    <>
      <h1 className='text-2xl lg:text-[34px] font-bold text-marine-blue'>{heading}</h1>
      <p className="text-cool-gray mt-3 text-sm tracking-wide">{discription}</p>
    </>
  )
}
