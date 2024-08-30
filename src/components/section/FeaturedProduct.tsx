// import { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useGetProductsQuery } from '@/redux/api/baseApi';
// import { Product } from '@/types';
// import ProductCard from '../card/ProductCard';
// import { Skeleton, Col, Row } from 'antd';
// import ButtonLink from '../ui/buttonLink';
// import { AiOutlineProduct } from "react-icons/ai";
// import Section from '@/pages/Shared/Section';

// const FeaturedProduct = () => {
//   useEffect(() => {
//     AOS.init();
//   }, []);

//   // Fetch products data from the API
//   const { data, error, isLoading } = useGetProductsQuery({});

//   // Render a loading state with skeleton placeholders
//   if (isLoading) {
//     return (
//       <div className="bg-white py-12 max-w-7xl mx-auto">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-left mb-6">
//             <h2 className="text-4xl font-semibold text-blue-600 mb-1 tracking-wide">Featured Product</h2>
//             <h3 className="text-lg font-medium text-gray-600">Explore our top picks and bestsellers!</h3>
//           </div>
//           <Row gutter={16}>
//             {[...Array(6)].map((_, index) => (
//               <Col span={8} key={index}>
//                 <Skeleton active />
//               </Col>
//             ))}
//           </Row>
//         </div>
//       </div>
//     );
//   }

//   // Show error message if fetching data failed
//   if (error) {
//     return (
//       <div className="text-center">
//         <p className="text-lg font-medium text-red-600">Failed to fetch data. Please try again later.</p>
//       </div>
//     );
//   }

//   // Extract products data 
//   const products = data?.data?.result as Product[];

//   if (!products || products?.length === 0) {
//     return (
//       <div className="text-center">
//         <p className=" text-lg font-medium text-gray-600">No products available at the moment</p>
//         <ButtonLink to='/contact' text='Contact us for more information' />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white py-12 max-w-7xl mx-auto">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <Section
//           icon={AiOutlineProduct}
//           title="Featured Products"
//           subtitle="Explore our top picks and bestsellers!"
//         />
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.slice(0, 6).map((product: Product) => (
//             <ProductCard key={product?._id} product={product} />
//           ))}
//         </div>
//         <div className="flex justify-center mt-6">
//           <ButtonLink to="/products" text='See more products' />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProduct;
