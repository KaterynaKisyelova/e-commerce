import GridView from "./GridView";
import ListView from "./ListView";
import { useFilterContext } from "../context/filter_context";

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();

  if (filteredProducts.length < 1) {
    return <h5>Sorry, no products matched your search...</h5>;
  }

  return (
    <>
      {!gridView ? (
        <ListView products={filteredProducts} />
      ) : (
        <GridView products={filteredProducts}></GridView>
      )}
    </>
  );
};

export default ProductList;
