import ProductList from "./ProductList";

export default function ProductsPage() {
  return (
    <div
      className="products-page"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1> 📝 Todo / Planned Improvements ⏳ </h1>
      <ProductList />
    </div>
  );
}
