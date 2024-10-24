import React from 'react';
import { Helmet } from 'react-helmet';

const ProductDetailsSeo = ({ product }) => {
  return (
    <Helmet>
      <title>{product.title} - Pixelate</title>
      <meta name="description" content={product.description} />
      <meta name="keywords" content={`${product.title}, ${product.category}, buy ${product.title}`} />
      <meta property="og:title" content={product.title} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.image} />
      <meta property="og:url" content={`https://yourstore.com/products/${product.id}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.title} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={product.image} />
    </Helmet>
  );
};

export default ProductDetailsSeo;
