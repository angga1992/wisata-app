import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { BiCaretDown } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";


const Navbar = () => {

  return (
    <div className='w-full flex top-0 sticky z-20 px-10 mx-auto p-3 justify-between items-center shadow-sm bg-white h-[65px]'>
      <Link href={`/`}>
        <Image
          alt="Background Sign In"
          src='/image/logo.png'
          className="flex-none cursor-pointer"
          width={250}
          height={50}
        />
      </Link>
      <div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className='mx-10'>
            <FaCartArrowDown className='text-black h-6 w-6' />
          </div>
          <div className='flex h-[50px] w-[50px] items-center justify-center border-2 border-gray-400 bg-primary rounded-full'>
            <span className='text-white text-2xl font-bold'>G</span>
          </div>
          <span className='text-black font-semibold'>Guest</span>
          <BiCaretDown className='text-black' />
        </div>

      </div>
    </div>
  );
};

export default Navbar;