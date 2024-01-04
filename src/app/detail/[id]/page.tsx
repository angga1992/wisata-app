/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { MdOutlinePanorama } from "react-icons/md";
import { ImEnlarge2 } from "react-icons/im";
import { IoBedOutline } from "react-icons/io5";
import { PiSealCheckFill } from "react-icons/pi";
import { Button } from "@/components/ui/button"
import Modal from '@/components/custome/Modal';
import Link from 'next/link';
import { BiSolidDiscount } from "react-icons/bi";

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
  xcode_log: {
    promotions: Record<string, Deal>;
    amenities: Record<string, Amenity>;
    links: Links;
  };
  meal_plan_description: string;
  cancel_policy_description: string;
  room_available: string;
  room_bed_groups: string;
  room_size_sqm: string;
  pricing_data: PricingData;
  room_name: string;
  room_images: { caption: string; size_sm: string; }[];
  offer_id: number;
  price_total: number;
  room_views: string
}

interface RoomImage {
  caption: string;
  size_sm: string;
}

interface Amenity {
  id: string;
  name: string;
}

interface Deal {
  id: string;
  description: string;
}

interface Links {
  payment_options: {
    method: string;
    href: string;
  };
}



const Detail: React.FC = () => {
  const [lastSegment, setLastSegment] = useState<string>('');
  const searchParams = useSearchParams();
  const [offers, setOffers] = useState<any>([]);
  const querStartDate: string | null = searchParams.get('start');
  const querEndDate: string | null = searchParams.get('end');
  const queryRoom: string | null = searchParams.get('number_of_room');
  const queryGuest: string | null = searchParams.get('number_of_room');
  const [roomImages, setRoomImages] = useState<RoomImage[]>([]);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id: any) => {
    console.log('id', id)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };


  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const slug = pathSegments[pathSegments.length - 1];
    setLastSegment(slug);
  }, []);

  useEffect(() => {
    if (lastSegment) {
      fetchData();
    }
  }, [lastSegment, querStartDate, querEndDate, queryRoom, queryGuest]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://exterior-technical-test-api.vercel.app/property/availability/${lastSegment}?checkin=${querStartDate}&checkout=${querEndDate}&number_of_room=${queryRoom}&guest_per_room=${queryGuest}`);
      const data = response.data.offers;
      setOffers(data)
      if (data[0].room_images) {
        setRoomImages(data[0].room_images);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsModalOpen(true)
    }
  };

  const formatRupiah = (numberToFormat: number): string => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(numberToFormat);
  };

  const buy = async (link: any) => {
    console.log('Booked', link)
    alert('Booked')
      try {
        const response = await axios.get(`https://exterior-technical-test-api.vercel.app${link}`);
        console.log('response', response)
        router.push('/');
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/');
      }
  
  }

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Card className="p-3 bg-white rounded-lg my-2 w-full p-5">
        <CardContent>
          {Array.isArray(offers) && offers.map((offer: Offer) => (
            <div key={offer.offer_id} className='w-full my-4'>
              <div className='flex flex-row border border-gray-500 shadow-lg rounded-lg'>
                <div className='w-2/3 h-full '>
                  <div className='container-case'>
                    <div className="gallery">
                      {offer.room_images.map((image, index) => (
                        <figure key={index} className={`gallery__item gallery__item--${index}`}>
                          <Image
                            src={image.size_sm} alt={`Room Image ${index}`}
                            width={272}
                            height={182}
                            className="gallery__img"
                          />
                        </figure>

                      ))}
                    </div>

                  </div>
                </div>

                <div className='w-1/3 border-l-2 m-[2rem] px-10'>
                  {offer.xcode_log.promotions && Object.entries(offer.xcode_log.promotions).map(([key, value]: [string, Deal]) => (
                    <div key={key} className='flex items-center justify-end my-5'>
                      <span className='bg-[#e12d2d] px-1 rounded-sm text-white'>{value.description}!</span>
                    </div>
                  ))}
                  <h3 className='text-black font-bold text-5xl mb-5'>{offer.room_name}</h3>
                  <div className='flex flex-col w-full'>
                    <p className='text-[#e12d2d] text-xl mb-5 font-bold'>Our last {offer.room_available} rooms! </p>
                    <div className='flex items-center my-2'>
                      <MdOutlinePanorama className='h-5 w-5 text-gray-400 mr-4' />
                      <span>Room View : {offer.room_views}</span>
                    </div>
                    <div className='flex items-center my-2'>
                      <ImEnlarge2 className=' text-gray-400 mr-5' />
                      <span>Room Size : {offer.room_size_sqm} m²</span>
                    </div>
                    <div className='flex items-center my-2'>
                      <IoBedOutline className='h-5 w-5 text-gray-400 mr-4' />
                      <span>Room Bed : {offer.room_bed_groups} </span>
                    </div>
                    <div className='my-10'>
                      <p className='font-bold text-lg'>Your price includes: </p>
                      {
                        offer.meal_plan_description !== '' && (
                          <div className='flex items-center my-5'>
                            <PiSealCheckFill className='h-5 w-5 text-green-400 mr-4' />
                            <span>Meal Plan : {offer.meal_plan_description}</span>
                          </div>

                        )
                      }
                      {Object.entries(offer.xcode_log.amenities).map(([key, value]: [string, Amenity]) => (
                        <div key={key} className='flex items-center my-5'>
                          <PiSealCheckFill className='h-5 w-5 text-green-400 mr-4' />
                          <span>{value.name}</span>
                        </div>
                      ))}

                      <div className='flex items-center my-5'>
                        <PiSealCheckFill className='h-5 w-5 text-green-400 mr-4' />
                        <span>Bonus Cashback : {offer.pricing_data.bonus_cashback_pct} %</span>
                      </div>
                      <div className='flex items-center my-5'>
                        <PiSealCheckFill className='h-5 w-5 text-green-400 mr-4' />
                        <span>Net Price : {formatRupiah(offer.pricing_data.net_price_total)}</span>
                      </div>
                      <div className='flex items-center my-5'>
                        <PiSealCheckFill className='h-5 w-5 text-green-400 mr-4' />
                        <span>Net Rate Nightly : {formatRupiah(offer.pricing_data.net_rate_nightly)}</span>
                      </div>
                      <div className='flex items-center my-5'>
                        <PiSealCheckFill className='h-5 w-5 text-green-400 mr-4' />
                        <span>Total Price with Bonus : {formatRupiah(offer.pricing_data.net_price_total_with_bonus)}</span>
                      </div>
                      <p className='text-gray-700 font-light'>Price per night</p>
                    </div>
                  </div>

                  <Button onClick={() => buy(offer.xcode_log.links.payment_options.href)} className='w-full h-20 text-xl'>
                    Book
                  </Button>

                  <p className='my-5 text-xs text-yellow-600'> {offer.cancel_policy_description} </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
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
          <Button onClick={handleGoBack} variant={'destructive'} className='mt-10'>
            Back for search
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Detail;
