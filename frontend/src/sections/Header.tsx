import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data } = useData();

  const content = data.content;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const BASE_URL = API_URL.replace('/api', '');

  // Detecta scroll da página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoValue = content["header.logo"] || "Linx";
  const isImageLogo = logoValue.startsWith('/uploads/') || logoValue.startsWith('http');

  const navItems = [
    {
      label: content["header.nav.solutions"] || "Soluções",
      dropdown: [
        { label: "Todas as Soluções", to: "/solucoes" },
        { label: "Maxx ERP", to: "/solucao/erp" },
        { label: "Maxx PDV", to: "/solucao/pdv" },
        { label: "TEF", to: "/solucao/pay" },
        { label: "MAxx Delivery", to: "/solucao/delivery" },
        { label: "Maxx Notas", to: "/solucao/bi" },
      ],
    },
    { label: "Segmentos", to: "/segmentos" },
    {
      label: content["header.nav.institutional"] || "Institucional",
      dropdown: [
        { label: "Sobre Nós", to: "/sobre" },
        { label: "Carreiras", to: "/carreiras" },
        { label: "Imprensa", to: "/imprensa" },
        { label: "Blog", to: "/blog" },
      ],
    },
    {
      label: content["header.nav.support"] || "Suporte",
      dropdown: [
        { label: "Central de Ajuda", to: "/suporte" },
        { label: "Área do Cliente", to: "/cliente" },
      ],
    },
    { label: content["header.nav.contact"] || "Fale Conosco", to: "/cliente" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-slate-200' 
          : 'bg-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

        {/* Logo */}
{/* Logo */}
<Link to="/" className="flex items-center gap-5">
  {isImageLogo ? (
    <img 
      src={logoValue.startsWith('http') ? logoValue : `${BASE_URL}${logoValue}`} 
      alt="Logo" 
      className="h-20 w-auto object-contain"
    />
  ) : (
    <>
      <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center">
        <span className="text-white font-bold text-3xl">L</span>
      </div>
      <span className={`text-4xl font-bold transition-colors ${
        isScrolled ? 'text-slate-900' : 'text-white'
      }`}>
        {logoValue}
      </span>
    </>
  )}
</Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-orange-50 ${
                      isScrolled 
                        ? 'text-slate-700 hover:text-orange-600' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}>
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.to}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to!}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-orange-50 ${
                      isScrolled 
                        ? 'text-slate-700 hover:text-orange-600' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/cliente"
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-orange-600 text-white hover:bg-orange-500'
              }`}
            >
              Receba uma Ligação
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <p className="px-4 py-2 font-semibold text-slate-800">
                      {item.label}
                    </p>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.to}
                        className="block px-6 py-2 text-sm text-slate-600 hover:text-orange-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={item.to!}
                    className="block px-4 py-3 text-slate-700 hover:text-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}