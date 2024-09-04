import { useCallback, useEffect, useState } from 'react';
import { useGetAllRoomsQuery } from "@/redux/features/room/roomApi";
import { TRoom } from "@/types";
import { Pagination } from 'antd';
import RoomCard from '@/components/card/RoomCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GridLoader } from 'react-spinners';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from "framer-motion";
import { CloseOutlined } from '@ant-design/icons';
import { useDebounce } from '@/hooks/useDebounce';
import ErrorComponent from '@/components/ui/ErrorComponent';

const MeetingRoom = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<'asc' | 'desc' | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [capacityRange, setCapacityRange] = useState<[number, number] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  console.log(capacityFilter, priceFilter)
  console.log(capacityRange, priceRange)
  const debouncedSearchTerm = useDebounce(searchTerm, 400); // debounce search 

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const buildQueryParams = useCallback(() => {
    const params: { [key: string]: string | number | null } = {};

    if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm;
    if (capacityFilter) params.capacity = capacityFilter;
    if (priceFilter) params.pricePerSlot = priceFilter;
    if (sortOption) params.sort = sortOption === 'asc' ? 'pricePerSlot' : '-pricePerSlot';
    params.limit = Number.MAX_SAFE_INTEGER; // Fetch all results

    return params;
  }, [debouncedSearchTerm, capacityFilter, priceFilter, sortOption]);

  const { data, error, isLoading } = useGetAllRoomsQuery(buildQueryParams());

  const roomdata = data?.data;
  const rooms = roomdata?.result as TRoom[]; // All rooms fetched
  // const metaData = roomdata?.meta;

  useEffect(() => {
    setCurrentPage(1);  // Reset to the first page when filters change
  }, [debouncedSearchTerm, capacityFilter, priceFilter, sortOption]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    if (value === 10) {
      setCapacityRange([1, 20]);
    } else if (value === 20) {
      setCapacityRange([20, 30]);
    } else if (value === 30) {
      setCapacityRange([30, 60])
    } else {
      setCapacityRange(null);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    if (value === 50) {
      setPriceRange([10, 50]);
    } else if (value === 100) {
      setPriceRange([50, 100]);
    } else if (value === 200) {
      setPriceRange([100, 200])
    } else {
      setPriceRange(null);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as 'asc' | 'desc' | null);
  };

 // Filter rooms based on filters
 const filteredRooms = rooms?.filter(room => {
  let isMatch = true;

  if (priceRange) {
    isMatch = room.pricePerSlot >= priceRange[0] && room.pricePerSlot <= priceRange[1];
  }
  if (capacityRange) {
    isMatch = room.capacity >= capacityRange[0] && room.capacity <= capacityRange[1];
  }

  return isMatch;
}) ?? [];

// Sort rooms
const sortedRooms = filteredRooms.sort((a, b) => {
  if (sortOption === 'asc') return a.pricePerSlot - b.pricePerSlot;
  if (sortOption === 'desc') return b.pricePerSlot - a.pricePerSlot;
  return 0;
});

  // Paginate filtered rooms
  const paginatedRooms = sortedRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const clearFilters = () => {
    setSearchTerm('');
    setCapacityFilter(null);
    setPriceFilter(null);
    setPriceRange(null);
    setCapacityRange(null);
    setSortOption(null);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Meeting Room - Nexus Reserve</title>
        </Helmet>
      </HelmetProvider>
      <div className="container mx-auto p-4">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          Meeting Rooms
        </motion.h1>
        <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border py-3 px-3 rounded mb-2 sm:mb-0 w-full md:w-1/3 lg:w-1/4"
          />
          <select onChange={handleCapacityChange} value={capacityRange ? capacityRange[1].toString(): ''} className="border p-2 rounded mb-2 sm:mb-0 w-full md:w-1/3 lg:w-1/4">
            <option value="">Capacity</option>
            <option value="10">10+</option>
            <option value="20">20+</option>
            <option value="30">30+</option>
          </select>
          <select onChange={handlePriceChange} value={priceRange ? priceRange[1].toString() : ''} className="border p-2 rounded mb-2 sm:mb-0 w-full md:w-1/3 lg:w-1/4">
            <option value="">Price</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="200">Up to $200</option>
          </select>
          <select onChange={handleSortChange} value={sortOption ?? ''} className="border p-2 rounded mb-2 sm:mb-0 w-full md:w-1/3 lg:w-1/4">
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <button
            onClick={clearFilters}
            className="block sm:hidden border p-2 rounded bg-gray-300 hover:bg-gray-400">
            Clear Filters
          </button>
          <button
            onClick={clearFilters}
            className="hidden sm:flex border p-1 rounded bg-gray-300 hover:bg-gray-400">
            <CloseOutlined className='text-3xl' />
          </button>
        </div>

        {error ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center text-gray-600 flex flex-col items-center">
              <ErrorComponent message='No rooms match in your search criteria.!' />
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <GridLoader color="#2563eb" />
          </div>
        ) : paginatedRooms && paginatedRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedRooms?.map(room => (
              <RoomCard key={room?._id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">No rooms available at the moment.</div>
        )}

        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={filteredRooms.length} // Use length of filteredRooms for pagination
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="ant-pagination"
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
