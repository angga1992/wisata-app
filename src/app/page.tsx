/* eslint-disable @next/next/no-css-tags */
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nlp from 'compromise';
import Image from 'next/image'
import Head from 'next/head';
import { InputSuffix } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card"
import { MdSearch } from "react-icons/md"
import Link from 'next/link';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from "@/components/ui/button"
import { registerLocale } from 'react-datepicker';

import DateRangePicker from '../components/custome/DateRangePicker';
import IncrementDecrement from '../components/custome/IncrementDecrement';
import {
  Popover, PopoverTrigger, PopoverContent
} from "@/components/ui/popover"

import id from 'date-fns/locale/id';


registerLocale('id', id);

interface DateRangePickerProps {
  onDatesChange: ({ startDate, endDate }: { startDate: Date | null; endDate: Date | null }) => void;
}

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [idAvailable, setIdAvailable] = useState<string>('');
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [roomCount, setRoomCount] = useState<number>(1);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);


  const backgroundImages = ['/image/1.jpg', '/image/2.jpg', '/image/3.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let searchTimer: ReturnType<typeof setTimeout> | null = null;

  const handleSearch = async () => {
    setSearchResults([]);
    try {
      setLoading(true);
      const doc = nlp(searchQuery);
      const placeMatch = doc.match('#Place');

      if (placeMatch && placeMatch.out('array').length > 0) {
        const foundPlaceName = placeMatch.out('array')[0];
        setPlaceName(foundPlaceName);

        const response = await axios.get(`https://exterior-technical-test-api.vercel.app/property/fts?query=${foundPlaceName}`);
        const data = response.data;
        setSearchResults(data);
      } else {
        const response = await axios.get(`https://exterior-technical-test-api.vercel.app/location/fts?query=${searchQuery}`);
        const data = response.data;
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.length >= 3) {
      handleSearch();
    }
  };

  const debouncedHandleSearch = debounce(handleSearchClick, 2000);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    debouncedHandleSearch();
  };




  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const backgroundImage = backgroundImages[currentImageIndex];

  const [startDate, setStartDate] = useState<string>('2024-01-26');
  const [endDate, setEndDate] = useState<string>('2024-01-27');

  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (newDate: any) => {
    const formattedFromDate = newDate.from ? formatDate(newDate.from.toISOString()) : '';
    const formattedToDate = newDate.to ? formatDate(newDate.to.toISOString()) : '';
    setStartDate(formattedFromDate)
    setEndDate(formattedToDate)
    console.log(startDate, endDate)
  };

  const [selectedOption, setSelectedOption] = React.useState("option1");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  const [totalCount, setTotalCount] = useState<number>(0);

  const handleCountChange = (newCount: number) => {
    setTotalCount(newCount);
  };

  const getIdProperty = (id: string, name: string) => {
    setIdAvailable(id)
    setSearchQuery(name)
    setSearchResults([])
  };

  const searchAvaible = async () => {
    try {
      const response = await axios.get(`https://exterior-technical-test-api.vercel.app/property/availability/${idAvailable}?checkin=${startDate}&checkout=${endDate}&number_of_room=1&guest_per_room=2`);
      const data = response.data;
    } catch (error) {
      console.error('Error searching:', error);
    }
  };


  return (
    <div className="bg-fixed bg-cover h-screen transition-background duration-500" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      objectFit: 'cover',
    }}>
      <Head>
        <title>Search Page</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <div className="flex flex-col items-center justify-center h-full">
        <Card className="p-3 rounded-lg my-2 w-1/2 p-5">
          <h1 className="text-3xl text-black font-semibold mb-4">The best place to book hotel deals</h1>
          <CardContent>
            <InputSuffix
              type="text"
              placeholder="Enter a destination or property"
              className="text-gray text-xl w-full h-[70px]"
              value={searchQuery}
              onChange={handleInputChange}
            >
              {loading ? (
                <div role="status">
                  <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <MdSearch className='h-8 w-8' onClick={handleSearchClick} />
              )}
            </InputSuffix>
          </CardContent>
        </Card>

        {searchResults.length > 0 && (
          <Card className="p-2 w-1/2 rounded-xl absolute top-[52%]">
            <CardContent>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => getIdProperty(result.id, result.name)}>
                    {result.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card className="p-3 rounded-lg my-2 w-1/2 p-5">
          <CardContent>
            <div className='flex w-full justify-between gap-5'>
              <div className='w-full'>
                <DateRangePicker onChangeDate={handleDateChange} />
              </div>
              <div className='w-full'>
                <Popover>
                  <PopoverTrigger className='flex w-full'>
                    {/* <Button variant={`outline`} className='w-full bg-white'> */}
                    <div className='h-10 px-4 py-2 flex w-full border border-primary text-primary bg-white rounded-md hover:bg-slate-100 hover:text-primary-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50'>
                      {`Room ${roomCount}, Adult ${adultCount}, Children ${childrenCount}`}
                    </div>
                    {/* </Button> */}
                  </PopoverTrigger>

                  <PopoverContent>
                    <div className='flex w-full justify-between items-center mb-2'>
                      <div className='text-primary text-md font-bold'>Room</div>
                      <IncrementDecrement initialValue={roomCount} onCountChange={count => setRoomCount(count)} />
                    </div>
                    <div className='flex w-full justify-between items-center my-2'>
                      <div className='text-primary text-md font-bold'>Adult</div>
                      <IncrementDecrement initialValue={adultCount} onCountChange={count => setAdultCount(count)} />
                    </div>
                    <div className='flex w-full justify-between items-center my-2'>
                      <div className='text-primary text-md font-bold'>Children</div>
                      <IncrementDecrement initialValue={childrenCount} onCountChange={count => setChildrenCount(count)} />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

            </div>
            <div className='flex w-full justify-center mt-10'>
              <Button disabled={loading || searchQuery === ''} className='w-full h-20 text-xl'>
                <Link href={`/search?id=${idAvailable}&start=${startDate}&end=${endDate}`} className="w-full link">
                  Search
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function debounce<T extends Function>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>) {
    const context = this as ThisParameterType<T>;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}



export default Home;