import { Product as ProductType, SingleProduct } from "../utils/types";
import Product from "./Product";
import styled from "styled-components";

type Props = {
  products: ProductType[];
};

const GridView = ({ products }: Props) => {
  console.log(products)

  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }
  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
