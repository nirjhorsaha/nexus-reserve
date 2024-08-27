import { Product } from '@/types';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: SubmitHandler<Product>;
  buttonLabel: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  buttonLabel,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Product>({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Name must be at least 3 characters' },
          })}
          placeholder="Name"
          aria-label="Product name"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors?.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>
      <div>
        <input
          type="number"
          {...register('price', {
            required: 'Price is required',
            valueAsNumber: true,
            min: { value: 0.01, message: 'Price must be greater than 0' },
          })}
          placeholder="Price"
          aria-label="Product price"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors?.price && <span className="text-red-500">{errors.price.message}</span>}
      </div>
      <div>
        <input
          type="text"
          {...register('brand', {
            required: 'Brand is required',
            minLength: { value: 3, message: 'Brand must be at least 3 characters' },
          })}
          placeholder="Brand"
          aria-label="Product brand"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors?.brand && <span className="text-red-500">{errors.brand.message}</span>}
      </div>
      <div>
        <textarea
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Description must be at least 10 characters' },
          })}
          placeholder="Description"
          aria-label="Product description"
          className="w-full px-4 py-2 border rounded-md"
          rows={3}
        />
        {errors?.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>
      <div>
        <input
          type="number"
          {...register('quantity', {
            required: 'Quantity is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Quantity must be at least 1' },
          })}
          placeholder="Quantity"
          aria-label="Product quantity"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors?.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
      </div>
      <div>
        <input
          type="number"
          {...register('rating', {
            required: 'Rating is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Rating must be between 0 and 5' },
            max: { value: 5, message: 'Rating must be between 0 and 5' },
          })}
          placeholder="Rating"
          aria-label="Product rating"
          className="w-full px-4 py-2 border rounded-md"
          step="0.1"
        />
        {errors?.rating && <span className="text-red-500">{errors.rating.message}</span>}
      </div>
      <div>
        <input
          type="text"
          {...register('imageUrl', { required: 'Image URL is required' })}
          placeholder="Image URL"
          aria-label="Product image URL"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors?.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default ProductForm;
