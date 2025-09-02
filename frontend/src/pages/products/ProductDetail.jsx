import { Link, useLoaderData, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  const products = useLoaderData();
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) return <p>Product not found</p>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2> 🎲🏡 Product Detail 🌞</h2>
      <h2>{product.title}</h2>
      <p>
        <strong>Description: </strong>
        {product.description}
      </p>
      <p>
        <strong>Price: </strong>
        {product.price}
      </p>
      <p>
        <strong>Rating: </strong>
        {product.rating}
      </p>
      <p>
        <strong>Available: </strong>
        {product.availabilityStatus ? "In Stock" : "Out of Stock"}
      </p>
      <p>
        <Link to={`/products`}>BACK</Link>
      </p>
    </div>
  );
};

export default ProductDetail;
