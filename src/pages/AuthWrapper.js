import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  return (
    <>
      {isLoading && (
        <Wrapper>
          <h1>Loading...</h1>
        </Wrapper>
      )}
      {error && (
        <Wrapper>
          <h2>{error.message}</h2>
        </Wrapper>
      )}
      {!isLoading && !error && children}
    </>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
