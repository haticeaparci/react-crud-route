import { useLoaderData, Link, useNavigation } from "react-router-dom";

const ProductList = () => {
  const products = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="product-list"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>We have {products.length} products available.</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
