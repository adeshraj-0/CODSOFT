import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList({
  cartItems,
  setCartItems,
  search
}) {

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <section className="products">

      <h2>Featured Products</h2>

      <div className="product-grid">

        {filteredProducts.length === 0 ? (

          <h2 className="no-product">
            No Products Found
          </h2>

        ) : (

          filteredProducts.map((item) => (

            <ProductCard
              key={item.id}
              product={item}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />

          ))

        )}

      </div>

    </section>

  );
}

export default ProductList;