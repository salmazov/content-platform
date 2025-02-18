import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  color: #fff;
  min-height: 100vh;
`;

export const BackButton = styled.button`
  background: none;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
`;

export const StyledImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  object-fit: contain;
`;

export const PhotographerLink = styled.a`
  color: #ffcc00;
  text-decoration: none;
  font-size: 18px;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Info = styled.p`
  font-size: 18px;
  margin: 5px 0;
`;

export const BoldText = styled.strong`
  font-weight: bold;
`;
