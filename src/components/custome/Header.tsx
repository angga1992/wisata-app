import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";

const Navbar = () => {

  return (
    <div className='w-full flex top-0 sticky z-20 px-10 mx-auto p-3 justify-between items-center shadow-sm bg-white h-[65px]'>
      
        <Image
          alt="Background Sign In"
          src='/image/logo.png'
          className="flex-none cursor-pointer"
          width={250}
          height={50}
        />
      
    </div>

  );
};

export default Navbar;