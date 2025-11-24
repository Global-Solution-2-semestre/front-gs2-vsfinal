import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Conquistas from "./pages/Conquistas";
import Sessoes from "./pages/Sessoes";
import Sentimentos from "./pages/Sentimentos";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/conquistas" element={<Conquistas />} />
      <Route path="/sessoes" element={<Sessoes />} />
      <Route path="/sentimentos" element={<Sentimentos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
