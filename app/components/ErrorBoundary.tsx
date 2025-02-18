import { useEffect, useState } from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import {
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  ErrorDetails,
  RetryButton,
} from "./ErrorBoundary.styles";

export function ErrorBoundary() {
  const [isClient, setIsClient] = useState(false);
  const error = useRouteError();

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  if (!isClient) return null; // Prevent hydration mismatch by avoiding SSR rendering

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
