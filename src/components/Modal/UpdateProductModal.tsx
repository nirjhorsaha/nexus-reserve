// import { Product } from '@/types';
// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { FiX } from 'react-icons/fi';

// interface UpdateProductModalProps {
//   product: Product;
//   onClose: () => void;
//   onSave: (product: Product) => void;
// }

// const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
//   product,
//   onClose,
//   onSave,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Product>({ defaultValues: product });

//   const onSubmit: SubmitHandler<Product> = (data) => {
//     onSave(data);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Update Product</h2>
//           <button onClick={onClose}>
//             <FiX className="text-gray-500 hover:text-gray-700" />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               {...register('name', {
//                 required: 'Name is required',
//                 minLength: { value: 3, message: 'Name must be at least 3 characters' }
//               })}
//               placeholder="Name"
//               className="w-full px-4 py-2 border rounded-md"
//             />
//             {errors?.name && <span className="text-red-500">{errors?.name.message}</span>}
//           </div>
//           <div>
//             <input
//               type="number"
//               {...register('price', {
//                 required: 'Price is required',
//                 valueAsNumber: true, min: { value: 0.01, message: 'Price must be greater than 0' }
//               })}
//               placeholder="Price"
//               className="w-full px-4 py-2 border rounded-md"
//             />
//             {errors?.price && <span className="text-red-500">{errors?.price.message}</span>}
//           </div>
//           <div>
//             <input
//               type="text"
//               {...register('brand', {
//                 required: 'Brand is required',
//                 minLength: { value: 3, message: 'Brand must be at least 3 characters' }
//               })}
//               placeholder="Brand"
//               className="w-full px-4 py-2 border rounded-md"
//             />
//             {errors?.brand && <span className="text-red-500">{errors?.brand.message}</span>}
//           </div>
//           <div>
//             <textarea
//               {...register('description', {
//                 required: 'Description is required',
//                 minLength: { value: 10, message: 'Description must be at least 10 characters' }
//               })}
//               placeholder="Description"
//               className="w-full px-4 py-2 border rounded-md"
//               rows={3}
//             />
//             {errors?.description && <span className="text-red-500">{errors?.description.message}</span>}
//           </div>
//           <div>
//             <input
//               type="number"
//               {...register('quantity', {
//                 required: 'Quantity is required',
//                 valueAsNumber: true, min: { value: 1, message: 'Quantity must be at least 1' }
//               })}
//               placeholder="Quantity"
//               className="w-full px-4 py-2 border rounded-md"
//             />
//             {errors?.quantity && <span className="text-red-500">{errors?.quantity.message}</span>}
//           </div>
//           <div>
//             <input
//               type="number"
//               {...register('rating', {
//                 required: 'Rating is required',
//                 valueAsNumber: true,
//                 min: { value: 0, message: 'Rating must be between 0 and 5' },
//                 max: { value: 5, message: 'Rating must be between 0 and 5' }
//               })}
//               placeholder="Rating"
//               className="w-full px-4 py-2 border rounded-md"
//               step="0.1"
//             />
//             {errors?.rating && <span className="text-red-500">{errors?.rating.message}</span>}
//           </div>
//           <div>
//             <input
//               type="text"
//               {...register('imageUrl', { required: 'Image URL is required' })}
//               placeholder="Image URL"
//               className="w-full px-4 py-2 border rounded-md"
//             />
//             {errors?.imageUrl && <span className="text-red-500">{errors?.imageUrl.message}</span>}
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProductModal;
import { Product } from '@/types';
import React from 'react';
import { FiX } from 'react-icons/fi';
import ProductForm from '../Form/ProductForm';

interface UpdateProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const handleSaveProduct = (data: Product) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Update Product</h2>
          <button onClick={onClose} aria-label="Close modal">
            <FiX className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <ProductForm initialValues={product} onSubmit={handleSaveProduct} buttonLabel="Save" />
      </div>
    </div>
  );
};

export default UpdateProductModal;
