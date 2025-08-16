// styles/HomeStyles.ts
import styled from 'styled-components';

export const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #1a365d;
`;

export const Controls = styled.div`
   display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const NoData = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  color: #6b7280;
`;
export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export const StatusDot = styled.span<{ online: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ online }) => (online ? 'green' : 'red')};
`;