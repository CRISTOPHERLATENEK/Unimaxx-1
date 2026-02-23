const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'linx-secret-key-2025';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Criar pasta uploads se não existir
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configuração do multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Inicializar banco de dados
const db = new sqlite3.Database('./database.sqlite');

// Criar tabelas
db.serialize(() => {
  // Tabela de usuários
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de conteúdo do site
  db.run(`CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT,
    type TEXT DEFAULT 'text',
    UNIQUE(section, key)
  )`);

  // Tabela de configurações globais (cores, etc)
  db.run(`CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL
  )`);

  // Tabela de soluções
  db.run(`CREATE TABLE IF NOT EXISTS solutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    solution_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT NOT NULL,
    cta_text TEXT NOT NULL,
    icon TEXT,
    order_num INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  )`);

  // Tabela de segmentos
  db.run(`CREATE TABLE IF NOT EXISTS segments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    segment_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    icon TEXT,
    order_num INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  )`);

  // Tabela de estatísticas (Stats)
  db.run(`CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stat_id TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    section TEXT NOT NULL DEFAULT 'numbers',
    order_num INTEGER DEFAULT 0
  )`);

  // Tabela de banners do carrossel (com suporte a página)
  db.run(`CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    image TEXT,
    cta_text TEXT,
    cta_link TEXT,
    order_num INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    use_default_bg INTEGER DEFAULT 0,
    bg_color TEXT DEFAULT '#00a8e8',
    page TEXT DEFAULT 'home'
  )`);

  // Migração: adicionar coluna 'page' se não existir (para bancos já existentes)
  db.run(`ALTER TABLE banners ADD COLUMN page TEXT DEFAULT 'home'`, (err) => {
    // Ignora erro se coluna já existir
  });

  // Inserir usuário admin padrão
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (email, password, name) VALUES (?, ?, ?)`, 
    ['admin@linx.com', adminPassword, 'Administrador']);

  // Inserir dados iniciais do site
  initializeSiteData();
});

function initializeSiteData() {
  // Configurações iniciais de cores
  const defaultSettings = {
    'primary_color': '#00a8e8',
    'secondary_color': '#0090c9',
    'accent_color': '#0077aa',
    'bg_color': '#ffffff',
    'text_color': '#111827'
  };

  Object.entries(defaultSettings).forEach(([key, value]) => {
    db.run(`INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)`, [key, value]);
  });

  // Inicialização dos títulos da seção de estatísticas
  const initialContent = [
    ['stats.title', 'stats', 'Nossos Números'],
    ['stats.subtitle', 'stats', 'A Linx em detalhes'],
    ['stats.description', 'stats', 'Confira os indicadores que mostram nossa força no mercado.']
  ];

  initialContent.forEach(([key, section, value]) => {
    db.run(`INSERT OR IGNORE INTO site_content (section, key, value) VALUES (?, ?, ?)`, 
      [section, key, value]);
  });

  // Estatísticas iniciais para evitar que a seção fique invisível
  const initialStats = [
    ['900', 'Empresas Atendidas', 'numbers-1'],
    ['4K+', 'Colaboradores', 'numbers-2'],
    ['17', 'Profissionais no Brasil', 'numbers-3']
  ];

  initialStats.forEach(([val, lab, id], idx) => {
    db.run(`INSERT OR IGNORE INTO stats (value, label, stat_id, section, order_num) VALUES (?, ?, ?, 'numbers', ?)`, 
      [val, lab, id, idx]);
  });
}

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Rotas de autenticação
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  });
});

// Verificar usuário autenticado
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name
  });
});
// Rotas Públicas
app.get('/api/content', (req, res) => {
  db.all('SELECT * FROM site_content', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar conteúdo' });
    const content = {};
    rows.forEach(row => { content[row.key] = row.value; });
    res.json(content);
  });
});

// Buscar banners da home (compatibilidade retroativa)
app.get('/api/banners', (req, res) => {
  db.all(`SELECT * FROM banners WHERE active = 1 AND (page = 'home' OR page IS NULL) ORDER BY order_num`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar banners' });
    res.json(rows);
  });
});

// Buscar banners por página específica
app.get('/api/banners/:page', (req, res) => {
  const page = req.params.page;
  db.all(`SELECT * FROM banners WHERE active = 1 AND page = ? ORDER BY order_num`, [page], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar banners da página' });
    res.json(rows);
  });
});

app.get('/api/solutions', (req, res) => {
  db.all('SELECT * FROM solutions WHERE active = 1 ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar soluções' });
    res.json(rows.map(row => ({ ...row, features: JSON.parse(row.features) })));
  });
});

app.get('/api/segments', (req, res) => {
  db.all('SELECT * FROM segments WHERE active = 1 ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar segmentos' });
    res.json(rows);
  });
});

app.get('/api/stats', (req, res) => {
  db.all('SELECT * FROM stats ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    res.json(rows);
  });
});

app.get('/api/settings', (req, res) => {
  db.all('SELECT * FROM site_settings', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar configurações' });
    const settings = {};
    rows.forEach(row => { settings[row.key] = row.value; });
    res.json(settings);
  });
});

// Rotas Administrativas (Protegidas)
app.put('/api/admin/content', authenticateToken, (req, res) => {
  const updates = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO site_content (section, key, value) VALUES (?, ?, ?)');
  Object.entries(updates).forEach(([key, value]) => {
    const section = key.split('.')[0];
    stmt.run(section, key, value);
  });
  stmt.finalize();
  res.json({ message: 'Conteúdo atualizado com sucesso' });
});

// CRUD Estatísticas (Stats)
app.post('/api/admin/stats', authenticateToken, (req, res) => {
  const { value, label, stat_id, section, order_num } = req.body;
  db.run(`INSERT INTO stats (value, label, stat_id, section, order_num) VALUES (?, ?, ?, ?, ?)`,
    [value, label, stat_id, section || 'numbers', order_num || 0],
    function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao criar estatística' });
      res.json({ message: 'Estatística criada com sucesso', id: this.lastID });
    }
  );
});

app.put('/api/admin/stats/:id', authenticateToken, (req, res) => {
  const { value, label, order_num } = req.body;
  db.run(`UPDATE stats SET value = ?, label = ?, order_num = ? WHERE stat_id = ?`,
    [value, label, order_num, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar estatística' });
      res.json({ message: 'Estatística atualizada com sucesso' });
    }
  );
});

app.delete('/api/admin/stats/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM stats WHERE stat_id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao excluir estatística' });
    res.json({ message: 'Estatística excluída com sucesso' });
  });
});

// Gerenciamento de Banners
app.post('/api/admin/banners', authenticateToken, (req, res) => {
  const { title, subtitle, description, image, cta_text, cta_link, order_num, use_default_bg, bg_color, page } = req.body;
  db.run(`INSERT INTO banners (title, subtitle, description, image, cta_text, cta_link, order_num, use_default_bg, bg_color, page) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, subtitle, description, image, cta_text, cta_link, order_num, use_default_bg || 0, bg_color || '#00a8e8', page || 'home'],
    function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao salvar banner' });
      res.json({ message: 'Banner salvo com sucesso', id: this.lastID });
    }
  );
});

app.put('/api/admin/banners/:id', authenticateToken, (req, res) => {
  const { title, subtitle, description, image, cta_text, cta_link, order_num, active, use_default_bg, bg_color, page } = req.body;
  db.run(`UPDATE banners SET title = ?, subtitle = ?, description = ?, image = ?, cta_text = ?, cta_link = ?, order_num = ?, active = ?, use_default_bg = ?, bg_color = ?, page = ? WHERE id = ?`,
    [title, subtitle, description, image, cta_text, cta_link, order_num, active, use_default_bg, bg_color, page || 'home', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar banner' });
      res.json({ message: 'Banner atualizado com sucesso' });
    }
  );
});

app.delete('/api/admin/banners/:id', authenticateToken, (req, res) => {
  db.run('UPDATE banners SET active = 0 WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao excluir banner' });
    res.json({ message: 'Banner excluído com sucesso' });
  });
});

// Upload de Imagens
app.post('/api/admin/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhuma imagem enviada' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Obter todos os dados (Admin) - inclui todos os banners de todas as páginas
app.get('/api/admin/all-data', authenticateToken, (req, res) => {
  const data = {};
  db.all('SELECT * FROM site_settings', [], (err, settingsRows) => {
    data.settings = {};
    settingsRows.forEach(row => { data.settings[row.key] = row.value; });

    db.all('SELECT * FROM site_content', [], (err, contentRows) => {
      data.content = {};
      contentRows.forEach(row => { data.content[row.key] = row.value; });
      
      db.all('SELECT * FROM solutions ORDER BY order_num', [], (err, solutionsRows) => {
        data.solutions = solutionsRows.map(row => ({ ...row, features: JSON.parse(row.features) }));
        
        db.all('SELECT * FROM segments ORDER BY order_num', [], (err, segmentsRows) => {
          data.segments = segmentsRows;
          
          db.all('SELECT * FROM stats ORDER BY order_num', [], (err, statsRows) => {
            data.stats = statsRows;
            
            db.all('SELECT * FROM banners ORDER BY page, order_num', [], (err, bannerRows) => {
              data.banners = bannerRows;
              res.json(data);
            });
          });
        });
      });
    });
  });
});

// Rota para atualizar configurações globais
app.put('/api/admin/settings', authenticateToken, (req, res) => {
  const updates = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)');
  Object.entries(updates).forEach(([key, value]) => {
    stmt.run(key, value);
  });
  stmt.finalize();
  res.json({ message: 'Configurações atualizadas com sucesso' });
});
// =============================
// CRUD SEGMENTS (ADMIN)
// =============================

// Listar todos (admin)
app.get('/api/admin/segments', authenticateToken, (req, res) => {
  db.all('SELECT * FROM segments ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar segmentos' });
    res.json(rows);
  });
});

// Criar segmento
app.post('/api/admin/segments', authenticateToken, (req, res) => {
  const { segment_id, name, icon, order_num, active } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  db.run(
    `INSERT INTO segments (segment_id, name, icon, order_num, active)
     VALUES (?, ?, ?, ?, ?)`,
    [
      segment_id,
      name,
      icon || 'Shirt',
      order_num || 0,
      active ?? 1
    ],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao criar segmento' });
      res.json({ message: 'Segmento criado com sucesso' });
    }
  );
});

// Atualizar segmento
app.put('/api/admin/segments/:id', authenticateToken, (req, res) => {
  const { name, icon, order_num, active } = req.body;

  db.run(
    `UPDATE segments 
     SET name = ?, icon = ?, order_num = ?, active = ?
     WHERE segment_id = ?`,
    [name, icon, order_num, active, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar segmento' });
      res.json({ message: 'Segmento atualizado com sucesso' });
    }
  );
});

// Excluir segmento
app.delete('/api/admin/segments/:id', authenticateToken, (req, res) => {
  db.run(
    `DELETE FROM segments WHERE segment_id = ?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao excluir segmento' });
      res.json({ message: 'Segmento excluído com sucesso' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
