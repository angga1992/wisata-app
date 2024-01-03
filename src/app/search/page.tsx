'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Image from "next/image"
import axios from 'axios';
import SideBarMenu from '@/components/custome/sidebar-menu';
import Rating from '@/components/custome/Rating';
import Modal from '@/components/custome/Modal';
import { SiGooglemaps } from "react-icons/si";
import { MdPhone, MdSearch } from "react-icons/md";
import { InputSuffix } from '@/components/ui/input';

interface CatalogData {
  rank_data: any;
  brand: string;
  chain: string;
  phone: string;
  address: string;
  category: string;
  headline: string;
  latitude: number;
  longitude: number;
  hero_image: string;
  star_rating: number;
  address_full: string;
  address_line: string;
  review_count: number | null;
  review_rating: number | null;
}

interface RankData {
  review_first: number;
  distance_first: number;
  recommendation: number;
}

interface Property {
  id: number;
  location_type: string;
  name: string;
  name_suffix: string;
  country_code: string;
  slug: string;
  catalog_data: CatalogData;
  rank_data: RankData;
  distance_in_km: number;
}

interface SearchResultItem {
  id: number;
  location_type: string;
  name: string;
  name_suffix: string;
  country_code: string;
  related_property_list: Property[];
}

interface SearchResults {
  [key: string]: SearchResultItem;
}

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResults>({});
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const queryType: string | null = searchParams.get('id');
  const querStartDate: string | null = searchParams.get('start');
  const querEndDate: string | null = searchParams.get('end');

  const [idAvailable, setIdAvailable] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id: any) => {
    console.log('id', id)
    searchAvaible(id)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  interface CarouselItem {
    caption: string;
    size_sm: string;
  }  

  const searchAvaible = async (id: any) => {
    try {
      const response = await axios.get(`https://exterior-technical-test-api.vercel.app/property/availability/${id}?checkin=${querStartDate}&checkout=${querEndDate}&number_of_room=1&guest_per_room=2`);
      const data = response.data;
      console.log
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryType]);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (queryType) {
        const response = await axios.get<SearchResults>(
          `https://exterior-technical-test-api.vercel.app/location?id=${queryType}`
        );
        const data = response.data[queryType];
        setSearchResults((prevResults) => ({
          ...prevResults,
          [queryType]: data,
        }));

        console.log('searchResults', searchResults);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full h-auto'>
      <div className='w-full px-10 my-10'>
        <InputSuffix
          type="text"
          placeholder="What kind of property are you looking for?"
          className="text-gray text-xl w-full h-[70px]"
        >
          {loading ? (
            <div role="status">
              <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <MdSearch className='h-8 w-8' />
          )}
        </InputSuffix>

      </div>
      {Object.keys(searchResults).map((key) => (
        <div key={key} className='flex justify-center items-center'>
          <div className='grid grid-rows-4 grid-flow-col gap-8 px-10'>
            {searchResults[key]?.related_property_list.map((property) => (
              <div onClick={() => openModal(property.id)} key={property.id} className="flex w-full mb-4 bg-white cursor-pointer rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className='flex h-auto w-[271px]'>
                  <Image
                    alt="noimage"
                    src={property.catalog_data.hero_image}
                    width={272}
                    height={182}
                    className="rounded-l-lg shadow-lg overflow-hidden object-cover"
                  />
                </div>
                <div className="p-2 flex flex-col w-full">
                  <div>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{property.name}</h5>
                    <div className='flex items-center underline cursor-pointer gap-2'>
                      <Rating rating={property.catalog_data.star_rating} />
                      <SiGooglemaps className='text-primary' />
                      <span className='font-normal text-sm text-primary dark:text-gray-400 underline'>{property.name_suffix}</span>
                    </div>
                    <p className='font-normal text-gray-700 dark:text-gray-400'>This property offers:</p>
                    <div className='inline-flex border border-gray-400 px-1 mb-2'>
                      <span className="font-light text-sm text-gray-700 dark:text-gray-400">{property.catalog_data.category}</span>
                    </div>
                    <div className='flex items-center'>
                      <MdPhone className='text-green-700' />
                      <span className="mb-1 font-normal text-gray-700 text-sm dark:text-gray-400">+{property.catalog_data.phone}</span>
                    </div>
                    <p className="mb-1 font-bold text-sm font-light text-[#E12D2D]">{property.catalog_data.headline}</p>
                    {/* <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{property.catalog_data.address}</p>
                      <p className="font-normal text-gray-700 dark:text-gray-400">{property.rank_data?.review_first} / 100</p> */}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      ))}
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className='flex flex-col w-[1000px]'>
          test
        </div>
      </Modal>
    </div>
  );
};

export default Search;
