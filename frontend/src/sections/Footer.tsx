import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";

export function Footer() {
  const { data } = useData();
  const content = data.content;

  const footerLinks = {
    solutions: {
      title: "Soluções",
      links: [
        { label: "Todas as Soluções", to: "/solucoes" },
        { label: "Linx ERP", to: "/solucao/erp" },
        { label: "Linx PDV", to: "/solucao/pdv" },
        { label: "Linx Commerce", to: "/solucao/commerce" },
        { label: "Linx Pay", to: "/solucao/pay" },
        { label: "Linx Delivery", to: "/solucao/delivery" },
        { label: "Linx BI", to: "/solucao/bi" },
      ],
    },
    institutional: {
      title: "Institucional",
      links: [
        { label: "Sobre Nós", to: "/sobre" },
        { label: "Carreiras", to: "/carreiras" },
        { label: "Imprensa", to: "/imprensa" },
        { label: "Blog", to: "/blog" },
      ],
    },
    support: {
      title: "Suporte",
      links: [
        { label: "Central de Ajuda", to: "/suporte" },
        { label: "Área do Cliente", to: "/cliente" },
        { label: "Fale Conosco", to: "/cliente" },
      ],
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#00a8e8] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold">
                {content["footer.company"] || "Linx"}
              </span>
            </Link>

            <p className="text-gray-400 mb-6 max-w-sm">
              {content["footer.description"] ||
                "Líder em tecnologia para o varejo. Transformando complexidade em resultado desde 1985."}
            </p>

            {/* Social */}
            <div className="flex gap-4">
              {["LinkedIn", "Facebook", "Instagram", "YouTube"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#00a8e8] transition-colors"
                  >
                    <span className="text-xs font-medium">
                      {social[0]}
                    </span>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {content["footer.copyright"] ||
              "© 2025 Uimaxx Soluções em Tecnologia. Todos os direitos reservados."}
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacidade"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              to="/termos"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
