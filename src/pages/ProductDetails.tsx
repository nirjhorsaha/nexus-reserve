import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { LuShoppingCart } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '@/redux/api/baseApi';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { addToCart, updateQuantity } from '@/redux/feature/CartSlice';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import toast from 'react-hot-toast';
import Loading from '@/components/ui/loading';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import ErrorComponent from '@/components/ui/ErrorComponent';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import QuantityAdjuster from '../utils/QuantityAdjuster';
import reviews from '../data/productReviews.json'


const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery(id as string);
  const product = data?.data;

  const rating = product?.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const dispatch = useDispatch();
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const cartItem = cart.find((item) => item._id === product?._id);
  const isInCart = !!cartItem;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setQty(isInCart ? cartItem?.cartQuantity || 1 : 1);
    } if (product?.quantity === 0) {
      setQty(0)
    }
  }, [product, isInCart, cartItem]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message="Error fetching products. Please try again later." />;
  }


  const handleAddToCart = () => {
    if (product) {
      if (!isInCart) {
        dispatch(addToCart({
          ...product,
          cartQuantity: qty, // Quantity in cart
        }));
        toast.success('Product added to cart!');
      } else if (cartItem && cartItem?.cartQuantity < product?.quantity) {
        // dispatch(updateQuantity({ id: product._id, quantity: cartItem.cartQuantity + 1 }));
        toast.success('Product already added in cart!');
      } else {
        toast.error('No more stock available!');
      }
    }
  };

  const handleIncrease = () => {
    if (qty < product?.quantity) {
      const newQty = qty + 1;
      setQty(newQty);
      dispatch(updateQuantity({ id: product?._id, quantity: newQty }));
      // toast.success('Product quantity increased!');
    } else {
      toast.error('No more stock available!');
    }
  };

  const handleDecrease = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      dispatch(updateQuantity({ id: product._id, quantity: newQty }));
    }
  };

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product?.name || 'Product Details', path: `/products/${id}` },
  ];

  return (
    <div>
      <Helmet>
        <title>{product?.name} - Mech Arcade</title>
      </Helmet>
      <div className="p-6 max-w-7xl mx-auto bg-white border rounded-lg">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="flex flex-col lg:flex-row">
          <div className="flex-shrink-0 lg:w-1/2 mb-4 lg:mb-0 relative">
            <img
              src={product?.imageUrl}
              alt={product?.name || 'Product Image'}
              className="w-full h-full object-cover border rounded-lg"
            />
          </div>
          <div className="lg:ml-6 flex-1">
            <h1 className="text-3xl font-bold mb-2">{product?.name || 'Product Name'}</h1>
            <h2 className="text-xl text-gray-600 mb-2">{`Brand: ${product?.brand || 'Brand Name'}`}</h2>
            <p className="bg-zinc-200 inline-block p-1 rounded-lg text-lg my-2 ">{`Available Quantity: ${product?.quantity || 0}`}</p>
            <p className="text-lg mb-4 ">{`Price: $${product?.price || '0.00'}`}</p>
            <div className="flex mb-4">
              {Array.from({ length: 5 }, (_, index) => {
                if (index < fullStars) {
                  return <FaStar key={index} color="gold" className="text-lg transition-transform duration-300 hover:scale-110" />;
                } else if (index === fullStars && hasHalfStar) {
                  return <FaStarHalfAlt key={index} color="gold" className="text-lg transition-transform duration-300 hover:scale-110" />;
                } else {
                  return <FaRegStar key={index} color="gray" className="text-lg transition-transform duration-300 hover:scale-110" />;
                }
              })}
            </div>
            <p className="text-base text-gray-700 mb-4">{product?.description || 'Product Description'}</p>
            <QuantityAdjuster
              quantity={qty}
              stock={product?.quantity || 0}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
            <button
              onClick={handleAddToCart}
              className={`border px-6 py-3 rounded-lg shadow-md flex items-center transition-colors duration-300 ease-in-out 
              ${product?.quantity === 0
                  ? 'bg-red-600 text-white border-red-600 cursor-not-allowed'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
              disabled={product?.quantity === 0}
            >
              <LuShoppingCart className="mr-2 text-xl" />
              {product?.quantity === 0
                ? 'Out of Stock'
                : isInCart
                  ? 'Added'
                  : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Additional Section for Customer Reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={review.id}
                className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50"
                data-aos="fade-right" data-aos-delay={`${index * 100}`}
              >
                <div className="flex items-center mb-2">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, index) => {
                        if (index < Math.floor(review.rating)) {
                          return <FaStar key={index} color="gold" />;
                        } else if (index === Math.floor(review.rating) && review.rating % 1 !== 0) {
                          return <FaStarHalfAlt key={index} color="gold" />;
                        } else {
                          return <FaRegStar key={index} color="gray" />;
                        }
                      })}
                    </div>
                  </div>
                </div>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
