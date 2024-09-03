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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // debounce search 

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
    params.page = currentPage;
    params.limit = itemsPerPage;

    return params;
  }, [debouncedSearchTerm, capacityFilter, priceFilter, sortOption, currentPage]);

  const { data, error, isLoading } = useGetAllRoomsQuery(buildQueryParams());

  const roomdata = data?.data;
  const rooms = roomdata?.result as TRoom[];
  const metaData = roomdata?.meta;

  useEffect(() => {
    setCurrentPage(1);  // Reset to the first page when filters change
  }, [debouncedSearchTerm, capacityFilter, priceFilter, sortOption]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCapacity = e.target.value ? Number(e.target.value) : null;
    setCapacityFilter(selectedCapacity);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceFilter(e.target.value ? Number(e.target.value) : null);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as 'asc' | 'desc' | null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCapacityFilter(null);
    setPriceFilter(null);
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
          <select onChange={handleCapacityChange} value={capacityFilter ?? ''} className="border p-2 rounded mb-2 sm:mb-0 w-full md:w-1/3 lg:w-1/4">
            <option value="">Capacity</option>
            <option value="10">20+</option>
            <option value="20">35+</option>
            <option value="30">50+</option>
          </select>
          <select onChange={handlePriceChange} value={priceFilter ?? ''} className="border p-2 rounded mb-2 sm:mb-0 w-full md:w-1/3 lg:w-1/4">
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
        ) : rooms && rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms?.map(room => (
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
            total={metaData?.total || 0}
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
