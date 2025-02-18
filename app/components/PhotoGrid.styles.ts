import { styled } from "styled-components";

export const MasonryGrid = styled.div`
  column-count: auto;
  column-gap: 12px;
  padding: 20px;

  @media (min-width: 600px) {
    column-count: 2;
  }
  @media (min-width: 900px) {
    column-count: 3;
  }
  @media (min-width: 1200px) {
    column-count: 4;
  }
`;

export const MasonryItem = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 12px;
`;

export const StyledImage = styled.img`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
  break-inside: avoid; /* Ensures images don’t break across columns */

  &:hover {
    transform: scale(1.03);
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 20px auto;
  display: block;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: #ccc;
`;

export const NoResultsMessage = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: #ff4a4a;
`;
