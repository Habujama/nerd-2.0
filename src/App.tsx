import type { ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Hacker from './pages/hacker/hacker/hacker';
import Medic from './pages/medic/medic';
import Military from './pages/military/military';
import WelcomePage from './pages/welcome/welcome-page';
import { AuthProvider } from './context/context';
import { useAuth } from './context/use-context';
import Session from './pages/hacker/session/session';
import Result from './pages/hacker/result/result';
import Necrohacking from './pages/hacker/necrohacking/necrohacking';

function RequireAuth({
  children,
  allowedRole,
}: {
  children: ReactNode;
  allowedRole: 'hacker' | 'medic' | 'military';
}) {
  const location = useLocation();
  const { role, initialized } = useAuth();

  if (!initialized) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p>Načítám data…</p>
      </div>
    );
  }

  if (role !== allowedRole) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route
          path='/hacker'
          element={
            <RequireAuth allowedRole='hacker'>
              <Hacker />
            </RequireAuth>
          }
        />
        <Route
          path='/hacker/session/:sessionId'
          element={
            <RequireAuth allowedRole='hacker'>
              <Session />
            </RequireAuth>
          }
        />
        <Route
          path='/hacker/result/:name'
          element={
            <RequireAuth allowedRole='hacker'>
              <Result />
            </RequireAuth>
          }
        />
        <Route
          path='/necrohacking'
          element={
            <RequireAuth allowedRole='hacker'>
              <Necrohacking />
            </RequireAuth>
          }
        />
        <Route
          path='/medic'
          element={
            <RequireAuth allowedRole='medic'>
              <Medic />
            </RequireAuth>
          }
        />
        <Route
          path='/military'
          element={
            <RequireAuth allowedRole='military'>
              <Military />
            </RequireAuth>
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
