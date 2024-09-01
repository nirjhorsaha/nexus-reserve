import { useCallback, useEffect, useState } from 'react';
import { useGetAllRoomsQuery } from "@/redux/features/room/roomApi";
import { TRoom } from "@/types";
import { Pagination } from 'antd';
import RoomCard from '@/components/card/RoomCard';
import { useDebounce } from '@/hooks/useDebounce';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GridLoader } from 'react-spinners';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const MeetingRoom = () => {
  const [params, setParams] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Debounce the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const buildQueryParams = useCallback(() => {
    const params: { [key: string]: string | number } = {};

    if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm;
    // if (sortOption) params.sort = sortOption === 'asc' ? '-pricePerSlot' : 'pricePerSlot';

    return params;
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setParams(buildQueryParams());
  }, [buildQueryParams]);


  const { data, error, isLoading } = useGetAllRoomsQuery(params);

  // const noRoomsFound = !isLoading && !error && data?.data?.result.length === 0;
  // const products = data?.data?.result || [];
  const rooms = data?.data?.result as TRoom[];


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCapacityFilter(Number(e.target.value));

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPriceFilter(Number(e.target.value));

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value as 'asc' | 'desc');

  const clearFilters = () => {
    setSearchTerm('');
    setCapacityFilter(null);
    setPriceFilter(null);
    setSortOption('asc');
  };

  const filteredRooms = (rooms || [])
    .filter(room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (capacityFilter ? room.capacity >= capacityFilter : true) &&
      (priceFilter ? room.pricePerSlot <= priceFilter : true)
    )
    .sort((a, b) => sortOption === 'asc' ? a.pricePerSlot - b.pricePerSlot : b.pricePerSlot - a.pricePerSlot);


  const paginatedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  // const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Meeting Room - Nexus Reserve</title>
        </Helmet>
      </HelmetProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Meeting Rooms</h1>
        <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border p-2 rounded mb-2 sm:mb-0 sm:w-1/4"
          />
          <select onChange={handleCapacityChange} className="border p-2 rounded mb-2 sm:mb-0 sm:w-1/4">
            <option value="">Capacity</option>
            <option value="10">10+</option>
            <option value="20">20+</option>
            <option value="30">30+</option>
          </select>
          <select onChange={handlePriceChange} className="border p-2 rounded mb-2 sm:mb-0 sm:w-1/4">
            <option value="">Price</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="200">Up to $200</option>
          </select>
          <select onChange={handleSortChange} className="border p-2 rounded mb-2 sm:mb-0 sm:w-1/4">
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <button
            onClick={clearFilters}
            className="border p-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>

        {error ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center text-gray-600 flex flex-col items-center">
              <FaExclamationTriangle size={40} className="text-red-500 mb-2" />
              <p className="text-xl font-semibold">No products found</p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <GridLoader color="#2563eb" />
          </div>
        ) : paginatedRooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedRooms.map(room => (
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
            total={filteredRooms.length}
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
