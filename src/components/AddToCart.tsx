import AmountButtons from "./AmountButtons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import styled from "styled-components";
import { SingleProduct } from "../utils/types";

type Props= {
  product: SingleProduct
}

const AddToCart = ({ product }: Props) => {
  const [mainColor, setMainColor] = useState(product.colors[0]);
  const [amount, setAmount] = useState(1);
  const { addToCart } = useCartContext();

  const increase = () => {
    setAmount((oldAmount) =>
      oldAmount < product.stock ? oldAmount + 1 : product.stock
    );
  };

  const decrease = () => {
    setAmount((oldAmount) => (oldAmount <= 1 ? 1 : oldAmount - 1));
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div>
          {product.colors.map((color, index) => (
            <button
              key={index}
              style={{ background: color }}
              className={`${
                mainColor === color ? "color-btn active" : "color-btn"
              }`}
              onClick={() => setMainColor(color)}
            >
              {mainColor === color ? <FaCheck /> : null}
            </button>
          ))}
        </div>
        <div className="btn-container">
          <AmountButtons
            amount={amount}
            increase={increase}
            decrease={decrease}
          />
          <Link
            to="/cart"
            className="btn"
            onClick={() => addToCart(product.id, mainColor, amount, product)}
          >
            add to cart
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;

export default AddToCart;
