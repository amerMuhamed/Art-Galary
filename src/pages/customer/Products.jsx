import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../api/shopServer";
import ProductCard from "../../components/ProductCard";
import cover2 from "./images/cover2.png";
import cover from "./images/cover.png";
import reviews from "./images/reviews.png";
import Group1 from "./images/Group1.png";
import AppLoader from "../../components/AppLoader";
import { Helmet } from 'react-helmet';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <AppLoader />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#eee" }}>
      <div className="searchBar h-[45px]" style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search..."
          className="searchBar min-w-64"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "40%",
            padding: "15px 25px",
            fontSize: "18px",
            borderRadius: "50px",
            border: "5px solid #2f9c95",
            boxShadow: "0 0 20px rgba(146, 139, 139, 0.1)",
            outline: "none",
          }}
        />
      </div>

      {filteredProducts.length === 0 && (
        <p className="noResults text-center">No products found matching your search.</p>
      )}

      <header className="flex justify-around bg-background pt-2 mt-2 mb-5 rounded-3xl h-[310px]">
        <div className="h-[300px] hidden lg:block md:block">
          <img src={cover} alt="cover" className="w-auto h-[300px]" />
        </div>
        <div className="h-[300px] sm:w-fit">
          <h1 className="font-extrabold text-3xl leading-none tracking-tight">
            <span className="block text-black bg-fuchsia-500 p-1">LET’S</span>
            <span className="block text-black bg-white p-1 mt-2">EXPLORE</span>
            <span className="block text-white bg-orangeJP p-1 mt-2">UNIQUE</span>
            <span className="block text-black bg-white p-1 mt-2">Items.</span>
          </h1>
          <img src={reviews} alt="reviews" className="mt-10" />
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-4 sm:none">
          <img src={cover2} alt="cover2" className="w-auto h-[300px]" />
          <img src={Group1} alt="Group1" className="w-auto h-52" />
        </div>
      </header>

      <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Helmet>
        <title>All photos - Pixelate</title>
       
        <meta name="description" content="Browse our collection of photos." />
        <meta name="keywords" content="products, buy Photos, online shopping" />
      </Helmet>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </section>
    </div>
  );
};

export default Products;
