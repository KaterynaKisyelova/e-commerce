import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchSingleProduct,
    singleProductLoading: loading,
    singleProductError: error,
    singleProduct: product,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]);

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {product.images[0] && (
        <Wrapper>
          <PageHero title={product.name} product />
          <div className="section section-center page">
            <Link to="/products" className="btn">
              back to products
            </Link>
            <div className="product-center">
              <ProductImages images={product.images} />
              <section className="content">
                <h2>{product.name}</h2>
                <Stars stars={product.stars} reviews={product.reviews} />
                <h5 className="price">{formatPrice(product.price)}</h5>
                <p className="desc">{product.description}</p>
                <p className="info">
                  <span>Available :</span>
                  {product.stock > 0 ? "in stock" : "out of stock"}
                </p>
                <p className="info">
                  <span>SKU :</span>
                  {product.id}
                </p>
                <p className="info">
                  <span>Brand :</span>
                  {product.company}
                </p>
                <hr />
                {product.stock > 0 && <AddToCart product={product} />}
              </section>
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
