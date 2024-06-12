// App.tsx
import React from 'react';
import { AuthProvider } from './authProvider';
import Navigation from './navigation';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;