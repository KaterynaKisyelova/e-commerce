import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();

  if (filteredProducts.length < 1) {
    return <h5>Sorry, no products matched your search...</h5>;
  }

  return (
    <>
      {!gridView ? (
        <ListView products={filteredProducts}/>
      ) : (
        <GridView products={filteredProducts}>product list</GridView>
      )}
    </>
  );
};

export default ProductList;
