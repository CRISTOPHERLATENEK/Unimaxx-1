import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold linx-gradient-text">404</div>
          <div className="text-6xl mt-4">🚀</div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Parece que você se perdeu no espaço. A página que você está procurando não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              <Home className="mr-2" size={20} />
              Voltar para Home
            </Button>
          </Link>
          <Link to="/solucoes">
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8">
              <Search className="mr-2" size={20} />
              Explorar Soluções
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">Ou talvez você estivesse procurando por:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/sobre">
              <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Sobre Nós
              </span>
            </Link>
            <Link to="/solucoes">
              <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Soluções
              </span>
            </Link>
            <Link to="/segmentos">
              <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Segmentos
              </span>
            </Link>
            <Link to="/cliente">
              <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Contato
              </span>
            </Link>
            <Link to="/suporte">
              <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors">
                Suporte
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
