import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import {styled} from "styled-components";

// Styled Error Components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  padding: 30px;
`;

const ErrorTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #ff4a4a;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
  max-width: 80%;
`;

const ErrorDetails = styled.pre`
  background: #2e2e2e;
  color: #ffaaaa;
  padding: 15px;
  border-radius: 5px;
  max-width: 80%;
  overflow-x: auto;
  font-size: 14px;
  white-space: pre-wrap;
`;

const RetryButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 18px;
  background-color: #ff4a4a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ff6666;
    transform: scale(1.05);
  }
`;

// Function-Based Route Error Boundary (for React Router)
export function ErrorBoundary() {
  const error = useRouteError();

  const handleRetry = () => {
    window.location.reload();
  };

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorContainer>
        <ErrorTitle>{error.status} {error.statusText}</ErrorTitle>
        <ErrorMessage>{error.data || "Something went wrong while loading the photo."}</ErrorMessage>
        <RetryButton onClick={handleRetry}>Retry</RetryButton>
      </ErrorContainer>
    );
  } else if (error instanceof Error) {
    return (
      <ErrorContainer>
        <ErrorTitle>Unexpected Error</ErrorTitle>
        <ErrorMessage>{error.message}</ErrorMessage>
        <ErrorDetails>{error.stack}</ErrorDetails>
        <RetryButton onClick={handleRetry}>Retry</RetryButton>
      </ErrorContainer>
    );
  } else {
    return (
      <ErrorContainer>
        <ErrorTitle>Unknown Error</ErrorTitle>
        <ErrorMessage>Something unexpected happened.</ErrorMessage>
        <RetryButton onClick={handleRetry}>Retry</RetryButton>
      </ErrorContainer>
    );
  }
}
