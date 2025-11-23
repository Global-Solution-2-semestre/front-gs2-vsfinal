import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/UserContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Conquistas from "./pages/Conquistas";
import Sessoes from "./pages/Sessoes";
import Sentimentos from "./pages/Sentimentos";
import NotFound from "./pages/NotFound";

NotFound 

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { usuario, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-focus flex items-center justify-center">
        <div className="animate-breathe text-6xl">🧠</div>
      </div>
    );
  }

  return usuario ? <>{children}</> : <Navigate to="/auth" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/conquistas"
            element={
              <ProtectedRoute>
                <Conquistas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sessoes"
            element={
              <ProtectedRoute>
                <Sessoes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sentimentos"
            element={
              <ProtectedRoute>
                <Sentimentos />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
