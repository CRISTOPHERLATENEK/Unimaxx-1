import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { Toaster } from '@/components/ui/sonner';

// Site Sections (Home)
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { QuickLinks } from '@/sections/QuickLinks';
import { Solutions } from '@/sections/Solutions';
import { Numbers } from '@/sections/Numbers';
import { Segments } from '@/sections/Segments';
import { Differentials } from '@/sections/Differentials';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

// Páginas públicas
import Solucoes from './pages/Solucoes';
import SolucaoDetalhe from './pages/SolucaoDetalhe';
import Segmentos from './pages/Segmentos';
import Sobre from './pages/Sobre';
import Carreiras from './pages/Carreiras';
import Blog from './pages/Blog';
import Imprensa from './pages/Imprensa';
import Suporte from './pages/Suporte';
import Cliente from './pages/Cliente';
import Privacidade from './pages/Privacidade';
import Termos from './pages/Termos';

// Admin
import { Login } from '@/admin/Login';
import { AdminLayout } from '@/admin/AdminLayout';
import { Dashboard } from '@/admin/Dashboard';
import { ContentManager } from '@/admin/ContentManager';
import { SolutionsManager } from '@/admin/SolutionsManager';
import { SegmentsManager } from '@/admin/SegmentsManager';
import { StatsManager } from '@/admin/StatsManager';
import { BannersManager } from '@/admin/BannersManager';
import { Settings } from '@/admin/Settings';
import { QuickLinksManager } from '@/admin/QuickLinksManager';


// Página principal
function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <QuickLinks />
        <Solutions />
        <Numbers />
        <Segments />
        <Differentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// Rota protegida
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a8e8]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>

            {/* SITE PÚBLICO */}
            <Route path="/" element={<HomePage />} />

            {/* Soluções */}
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/solucao/:id" element={<SolucaoDetalhe />} />

            {/* Segmentos */}
            <Route path="/segmentos" element={<Segmentos />} />

            {/* Institucional */}
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/carreiras" element={<Carreiras />} />
            <Route path="/imprensa" element={<Imprensa />} />
            <Route path="/blog" element={<Blog />} />

            {/* Suporte e Contato */}
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/cliente" element={<Cliente />} />

            {/* Legais */}
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/termos" element={<Termos />} />

            {/* ADMIN */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="conteudo" element={<ContentManager />} />
              <Route path="solucoes" element={<SolutionsManager />} />
              <Route path="segmentos" element={<SegmentsManager />} />
              <Route path="estatisticas" element={<StatsManager />} />
              <Route path="banners" element={<BannersManager />} />
              <Route path="configuracoes" element={<Settings />} />
                            <Route path="links-rapidos" element={<QuickLinksManager />} />

            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>

        <Toaster />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
