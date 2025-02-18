import { styled } from "styled-components";

export const ErrorContainer = styled.div`
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

export const ErrorTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #ff4a4a;
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
  max-width: 80%;
`;

export const ErrorDetails = styled.pre`
  background: #2e2e2e;
  color: #ffaaaa;
  padding: 15px;
  border-radius: 5px;
  max-width: 80%;
  overflow-x: auto;
  font-size: 14px;
  white-space: pre-wrap;
`;

export const RetryButton = styled.button`
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
