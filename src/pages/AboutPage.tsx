import aboutImg from "../assets/hero-bcg.jpeg";
import { PageHero } from "../components";
import { GiLouvrePyramid } from "react-icons/gi";
import styled from "styled-components";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice deck" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet. Et consequatur delectus non animi ipsam
            At dolorem neque ut quisquam neque. Ea iste dolorum qui similique
            voluptas in quisquam necessitatibus et quisquam blanditiis sit
            voluptatum nesciunt quo autem eaque! Et aliquid expedita 33 quis
            dolor aut explicabo libero. Et itaque quasi qui obcaecati
            accusantium ut dolore nulla a earum suscipit sed exercitationem
            Quis.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default AboutPage;
