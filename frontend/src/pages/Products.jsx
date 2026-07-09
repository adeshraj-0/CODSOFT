import ProductList from "../components/ProductList";

function Products({ 
  cartItems,
  setCartItems,
  search
 }) {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        Our Products
      </h1>

      <ProductList
        cartItems={cartItems}
        setCartItems={setCartItems}
        search={search}
      />
    </>
  );
}

export default Products;