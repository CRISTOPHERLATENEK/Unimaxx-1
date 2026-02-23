#!/bin/bash

echo "=========================================="
echo "  Build - Linx Site"
echo "=========================================="
echo ""

# Build do frontend
echo "📦 Building frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erro ao fazer build do frontend"
    exit 1
fi

echo ""
echo "✅ Build concluído!"
echo ""
echo "Os arquivos estão na pasta 'frontend/dist'"
echo ""
echo "Para deploy na Hostinger:"
echo "1. Faça upload do conteúdo da pasta 'frontend/dist' para public_html"
echo "2. Configure o arquivo .htaccess"
echo "3. Inicie o backend no servidor"
echo ""
