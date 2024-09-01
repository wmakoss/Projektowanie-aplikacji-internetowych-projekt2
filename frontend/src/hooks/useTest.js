import { useContext } from 'react';
import { TestProvider } from '../context/TestContext';

const useTest = () => {
  const context = useContext(TestProvider);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};

export default useTest;
