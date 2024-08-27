import React, { useCallback, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GridLoader } from 'react-spinners';
import { useGetProductsQuery } from '@/redux/api/baseApi';
import { Product } from '@/types';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useDebounce } from '@/hooks/useDebounce';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Helmet } from 'react-helmet';
import ProductCard from '@/components/card/ProductCard';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<'asc' | 'desc' | null>(null);
  const [params, setParams] = useState({});

  // Debounce the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const buildQueryParams = useCallback(() => {
    const params: { [key: string]: string | number } = {};

    if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm;
    if (priceRange[0] !== null) params.minPrice = priceRange[0];
    if (priceRange[1] !== null) params.maxPrice = priceRange[1];
    if (sortOption) params.sort = sortOption === 'asc' ? '-price' : 'price';

    return params;
  }, [debouncedSearchTerm, priceRange, sortOption]);

  useEffect(() => {
    setParams(buildQueryParams());
  }, [buildQueryParams]);

  const { data, error, isLoading } = useGetProductsQuery(params);

  // // Log query params and API data for debugging
  // useEffect(() => {
  //   console.log('Query Params:', params);
  //   console.log('API Data:', data);
  // }, [params, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value as [number, number]);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as 'asc' | 'desc' | null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSortOption(null);
  };

  const noProductsFound = !isLoading && !error && data?.data?.result.length === 0;
  const products = data?.data?.result || [];

  return (
    <div>
      <Helmet>
        <title>Product - Mech Arcade</title>
      </Helmet>
      <div className="bg-white mt-6 mx-auto flex flex-col lg:flex-row">
        {/* Filters Section */}
        <div className="w-full lg:w-1/4 px-4 sm:px-6">
          <div className="text-left mb-6">
            <h2 className="text-4xl font-semibold text-blue-600 mb-1 tracking-wide">Filters</h2>
          </div>

          <div className="mb-6 sticky top-0">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search by name or brand"
                onChange={handleSearch}
                value={searchTerm}
                className="border rounded-md px-4 py-2 w-full"
                aria-label="Search by name or brand"
              />
              {searchTerm && (
                <FaTimes
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 font-bold">
                Selected Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                range
                min={0}
                max={1000}
                defaultValue={[0, 1000]}
                value={priceRange}
                onChange={handlePriceRangeChange}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 font-bold">Sort By Price:</label>
              <select
                value={sortOption ?? ''}
                onChange={handleSortChange}
                className="border rounded-md px-4 py-2"
                aria-label="Sort products by price"
              >
                <option value="">Sort By Price</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
            <button
              onClick={clearFilters}
              className="bg-white text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-6">
            <h2 className="text-4xl font-semibold text-blue-600 mb-1 tracking-wide">All Products</h2>
            <h3 className="text-lg font-medium text-gray-600">Find the perfect mechanical keyboard for you!</h3>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <GridLoader color="#2563eb" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-gray-600 flex flex-col items-center">
                <FaExclamationTriangle size={40} className="text-red-500 mb-2" />
                <p className="text-xl font-semibold">No products found</p>
              </div>
            </div>
          ) : noProductsFound ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-gray-600 flex flex-col items-center">
                <FaExclamationTriangle size={40} className="text-red-500 mb-2" />
                <p className="text-xl font-semibold">No products found</p>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;



// import React, { useEffect, useState } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { GridLoader } from 'react-spinners';
// import { useGetProductsQuery } from '@/redux/api/baseApi';
// import { Product } from '@/types';
// import ProductCard from '@/components/Featured-Product/ProductCard';
// import { FaExclamationTriangle } from 'react-icons/fa';
// import { useDebounce } from '@/hooks/useDebounce';
// import 'rc-slider/assets/index.css';
// import Slider from 'rc-slider';
// import { Helmet } from 'react-helmet';

// const Products = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [sortOption, setSortOption] = useState<'asc' | 'desc' | null>(null);
//   const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
//   const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

//   // Debounce the search term
//   const debouncedSearchTerm = useDebounce(searchTerm, 300);

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const { data, error, isLoading } = useGetProductsQuery({});

//   useEffect(() => {
//     if (data?.data?.result) {
//       const products = data.data.result;
//       setOriginalProducts(products);
//       setDisplayedProducts(products);
//     }
//   }, [data]);

//   useEffect(() => {
//     let filteredProducts = originalProducts.filter((product: Product) =>
//       product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
//       product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
//     );

//     filteredProducts = filteredProducts.filter((product: Product) =>
//       product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     if (sortOption) {
//       filteredProducts = filteredProducts.sort((a, b) =>
//         sortOption === 'asc' ? a.price - b.price : b.price - a.price
//       );
//     }

//     setDisplayedProducts(filteredProducts);
//   }, [debouncedSearchTerm, priceRange, sortOption, originalProducts]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePriceRangeChange = (value: number | number[]) => {
//     if (Array.isArray(value)) {
//       setPriceRange(value as [number, number]);
//     }
//   };

//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortOption(e.target.value as 'asc' | 'desc' | null);
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setPriceRange([0, 1000]);
//     setSortOption(null);
//   };

//   return (
//     <div>
//       <Helmet>
//         <title>Product - Mech Arcade</title>
//       </Helmet>
//       <div className="bg-white py-12 max-w-7xl mx-auto flex flex-col lg:flex-row">
//         {/* Filters Section */}
//         <div className="w-full lg:w-1/4 px-4 sm:px-6 lg:px-8">
//           <div className="text-left mb-6">
//             <h2 className="text-4xl font-semibold text-blue-600 mb-1">Filters</h2>
//           </div>

//           <div className="mb-6 sticky top-0">
//             <input
//               type="text"
//               placeholder="Search by name or brand"
//               onChange={handleSearch}
//               className="border rounded-md px-4 py-2 w-full mb-4"
//               aria-label="Search by name or brand"
//             />
//             <div className="mb-4">
//               <label className="block text-gray-600 mb-1">
//                 Selected Range: ${priceRange[0]} - ${priceRange[1]}
//               </label>
//               <Slider
//                 range
//                 min={0}
//                 max={1000}
//                 defaultValue={[0, 1000]}
//                 value={priceRange}
//                 onChange={handlePriceRangeChange}
//                 className="w-full"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600 mb-1">Sort By Price:</label>
//               <select
//                 value={sortOption ?? ''}
//                 onChange={handleSortChange}
//                 className="border rounded-md px-4 py-2"
//                 aria-label="Sort products by price"
//               >
//                 <option value="">Sort By Price</option>
//                 <option value="asc">Price: Low to High</option>
//                 <option value="desc">Price: High to Low</option>
//               </select>
//             </div>
//             <button
//               onClick={clearFilters}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
//               aria-label="Clear all filters"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>

//         {/* Products Section */}
//         <div className="w-full lg:w-3/4 px-4 sm:px-6 lg:px-8">
//           <div className="text-left mb-6">
//             <h2 className="text-4xl font-semibold text-blue-600 mb-1">All Products</h2>
//             <h3 className="text-lg font-medium text-gray-600">Find the perfect mechanical keyboard for you!</h3>
//           </div>

//           {isLoading ? (
//             <div className="flex justify-center items-center h-full">
//               <GridLoader color="#2563eb" />
//             </div>
//           ) : error ? (
//             <div className="flex justify-center items-center h-full">
//               <div className="text-center text-red-600">Error fetching products</div>
//             </div>
//           ) : displayedProducts.length === 0 ? (
//             <div className="flex justify-center items-center h-full">
//               <div className="text-center text-gray-600 flex flex-col items-center">
//                 <FaExclamationTriangle size={40} className="text-red-500 mb-2" />
//                 <p className="text-xl font-semibold">No products found</p>
//                 <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {displayedProducts.map((product: Product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;


