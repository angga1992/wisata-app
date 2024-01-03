'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Image from "next/image"
import axios from 'axios';
import SideBarMenu from '@/components/custome/sidebar-menu';
import Rating from '@/components/custome/Rating';
import { SiGooglemaps } from "react-icons/si";
import { MdPhone, MdSearch } from "react-icons/md";
import { InputSuffix } from '@/components/ui/input';

const detail: React.FC = () => {

  return (
    <div className='flex flex-col w-full h-auto'>
      test
    </div>
  );
};

export default detail;
