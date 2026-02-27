// src/admin/AdminLayout.tsx - VERSÃO MELHORADA COM MAIS MENUS E GRUPOS

import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Briefcase, Tags, BarChart3,
  Settings, LogOut, Menu, ChevronDown, User, Zap, Image,
  HelpCircle, Layers, X, Globe, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// ─────────────────────────────────────────
// GRUPOS DE MENU
// ─────────────────────────────────────────
const menuGroups = [
  {
    label: null,
    items: [
      { path: '/admin',             icon: LayoutDashboard, label: 'Dashboard',          exact: true },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      { path: '/admin/conteudo',        icon: FileText,  label: 'Textos do Site' },
      { path: '/admin/banners',         icon: Image,     label: 'Carrossel / Banners' },
      { path: '/admin/links-rapidos',   icon: Zap,       label: 'Links Rápidos' },
    ],
  },
  {
    label: 'Soluções',
    items: [
      { path: '/admin/solucoes',         icon: Briefcase, label: 'Soluções (Cards)' },
      { path: '/admin/paginas-solucoes', icon: Layers,    label: 'Páginas de Soluções' },
    ],
  },
  {
    label: 'Empresa',
    items: [
      { path: '/admin/segmentos',    icon: Tags,     label: 'Segmentos' },
      { path: '/admin/estatisticas', icon: BarChart3, label: 'Estatísticas' },
    ],
  },
  {
    label: 'Suporte',
    items: [
      { path: '/admin/central-ajuda', icon: HelpCircle, label: 'Central de Ajuda' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { path: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
    ],
  },
];

// Flat list para compatibilidade (ex: breadcrumb)
const allMenuItems = menuGroups.flatMap(g => g.items);

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Descobrir título da página atual
  const currentPage = allMenuItems.find(item =>
    item.exact
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-gray-800 flex-shrink-0">
          <div className="w-8 h-8 bg-[#00a8e8] rounded-lg flex items-center justify-center shadow-md">
            <span className="font-extrabold text-base text-white">U</span>
          </div>
          <div>
            <span className="font-bold text-base tracking-wide">UNIMAXX</span>
            <span className="block text-xs text-gray-400 -mt-0.5">Painel Admin</span>
          </div>
          {/* Fechar (mobile) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-thin">
          {menuGroups.map((group, gi) => (
            <div key={gi} className={gi > 0 ? 'pt-2' : ''}>
              {group.label && (
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 py-1.5 mb-1">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={'exact' in item ? item.exact : false}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }: { isActive: boolean }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                          isActive
                            ? 'bg-[#00a8e8] text-white shadow-md shadow-[#00a8e8]/30'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer sidebar: ver site + logout */}
        <div className="p-3 border-t border-gray-800 space-y-1 flex-shrink-0">
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-sm"
          >
            <Globe className="w-4 h-4" />
            <span>Visualizar Site</span>
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-gray-400 hover:text-white hover:bg-red-900/40 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 sticky top-0 z-30 shadow-sm">
          {/* Menu mobile + Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            {currentPage && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 hidden sm:block">Admin</span>
                <ChevronRight className="w-3 h-3 text-gray-300 hidden sm:block" />
                <span className="text-sm font-semibold text-gray-800">{currentPage.label}</span>
              </div>
            )}
          </div>

          {/* Ações do header */}
          <div className="flex items-center gap-2">
            {/* Ver site (desktop) */}
            <button
              onClick={() => window.open('/', '_blank')}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#00a8e8] bg-[#00a8e8]/5 hover:bg-[#00a8e8]/10 rounded-lg transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Ver Site
            </button>

            {/* Avatar / Menu usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00a8e8] to-[#0077aa] rounded-full flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {user?.name || 'Administrador'}
                    </p>
                    <p className="text-xs text-gray-400 leading-tight">{user?.email || ''}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user?.name || 'Administrador'}</p>
                  <p className="text-xs text-gray-400">{user?.email || ''}</p>
                </div>
                <DropdownMenuItem onClick={() => navigate('/admin/configuracoes')}>
                  <Settings className="w-4 h-4 mr-2 text-gray-500" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open('/', '_blank')}>
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  Ver Site
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
