import React from 'react';
import ProductDetailsSeo from './ProductDetailsSeo';

const ProductDetailPage = ({ product }) => {
  return (
    <div>
      <ProductDetailsSeo product={product} />
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <span>${product.price}</span>
    </div>
  );
};

export default ProductDetailPage;
