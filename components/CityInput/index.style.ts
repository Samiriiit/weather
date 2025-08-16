import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 500px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 999px; /* pill shape */
  outline: none;
  transition: all 0.2s;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0,112,243,0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 18px;
  font-size: 1rem;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover:not(:disabled) {
    background-color: #005bb5;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
