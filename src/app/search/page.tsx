'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Image from "next/image"
import axios from 'axios';
import SideBarMenu from '@/components/custome/sidebar-menu';
import Rating from '@/components/custome/Rating';
import Modal from '@/components/custome/Modal';
import Link from 'next/link';
import { SiGooglemaps } from "react-icons/si";
import { MdPhone, MdSearch } from "react-icons/md";
import { InputSuffix } from '@/components/ui/input';
import { Button } from "@/components/ui/button"

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

interface PricingData {
  strikethrough_rate_nightly: number;
  strikethrough_price_total: number;
  rate_nightly: number;
  price_total: number;
  cashback_rate: number;
  cashback_pct: number;
  net_rate_nightly: number;
  net_price_total: number;
  bonus_cashback_rate: number;
  bonus_cashback_pct: number;
  net_rate_nightly_with_bonus: number;
  net_price_total_with_bonus: number;
  wisata_point: number;
  saving_pct: number;
}

interface Offer {
  pricing_data: PricingData;
  room_name: string;
  room_images: { caption: string; size_sm: string; }[];
  offer_id: number;
  price_total: number;
}


const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResults>({});
  const [offers, setOffers] = useState<any>([]);
  const [carouselData, setCarouselData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const queryType: string | null = searchParams.get('id');
  const querStartDate: string | null = searchParams.get('start');
  const querEndDate: string | null = searchParams.get('end');
  const queryRoom: string | null = searchParams.get('number_of_room');
  const queryGuest: string | null = searchParams.get('guest_per_room');

  const [idAvailable, setIdAvailable] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id: any) => {
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
      const response = await axios.get(`https://exterior-technical-test-api.vercel.app/property/availability/${id}?checkin=${querStartDate}&checkout=${querEndDate}&number_of_room=${queryRoom}&number_of_room=${queryGuest}`);
      const data = response.data.offers;
      setOffers(data);
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
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setIsModalOpen(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <div className='px-10 mb-3'>
        <Button>
          <Link href="/" className="link">
            Back for search
          </Link>
        </Button>
      </div>
      {Object.keys(searchResults).map((key) => (
        <div key={key} className='flex justify-center items-center'>
          <div className='grid grid-cols-4 gap-4 px-10'>
            {searchResults[key]?.related_property_list.map((property) => (
              <div key={property.id} className="flex w-full mb-4 bg-white cursor-pointer rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <Link href={`/detail/${property.id}?start=${querStartDate}&end=${querEndDate}&number_of_room=${queryRoom}&number_of_room=${queryGuest}`} className='flex w-full'>
                  <div className='flex h-full w-[271px]'>
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
                    </div>
                  </div>
                </Link>
              </div>
            ))}

          </div>
        </div>
      ))}
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className='flex flex-col w-[500px] h-[700px] overflow-auto justify-center items-center'>
          <h3 className='text-gray-600 my-4'>sorry, room is not available</h3>
          <Image
            alt="noimage"
            src='/image/404.png'
            width={272}
            height={182}
            className="rounded-l-lg shadow-lg overflow-hidden object-cover"
          />
          <Button variant={'destructive'} className='mt-10'>
            <Link href="/" className="link">
              Back for search
            </Link>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Search;
