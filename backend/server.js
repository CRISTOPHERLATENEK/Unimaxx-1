const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

// Importar módulo de Suporte
const setupHelpModule = require('./help-module');

const app = express();
app.set('trust proxy', 1);

const PORT = Number(process.env.PORT) || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// =============================
// ENV / PATHS
// =============================

function resolveFromBackend(p) {
  if (!p) return null;
  return path.isAbsolute(p) ? p : path.join(__dirname, p);
}

// Em produção, NÃO usar segredo default.
const JWT_SECRET_ENV = process.env.JWT_SECRET;
if (!JWT_SECRET_ENV && NODE_ENV === 'production') {
  console.error('[FATAL] JWT_SECRET é obrigatório em produção. Configure nas variáveis de ambiente.');
  process.exit(1);
}
const JWT_SECRET = JWT_SECRET_ENV || 'dev-secret-change-me';

const DB_PATH = resolveFromBackend(process.env.DB_PATH || './database.sqlite');
const UPLOAD_DIR = resolveFromBackend(process.env.UPLOAD_DIR || './uploads');

// =============================
// MIDDLEWARES
// =============================

// CORS (Hostinger costuma usar domínio/subdomínio; configure CORS_ORIGINS)
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // requests server-to-server ou ferramentas sem origin
      if (!origin) return cb(null, true);

      // Se não configurou CORS_ORIGINS, libera (útil em dev)
      if (corsOrigins.length === 0) return cb(null, true);

      if (corsOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '2mb' }));

// Criar pasta uploads se não existir
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.use('/uploads', express.static(UPLOAD_DIR));

// Configuração do multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = ['.png', '.jpg', '.jpeg', '.webp'].includes(ext) ? ext : '';
    const name = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`) + safeExt;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Tipo de arquivo não permitido. Envie PNG/JPG/WEBP.'));
    }
    cb(null, true);
  },
});

// =============================
// DB
// =============================

const db = new sqlite3.Database(DB_PATH);

// Criar tabelas
// Obs.: mantive o padrão do seu projeto (CREATE TABLE IF NOT EXISTS)
// e acrescentei as tabelas/rotas que o frontend já chama.

db.serialize(() => {
  // Tabela de usuários
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabelas da Central de Ajuda
db.run(`CREATE TABLE IF NOT EXISTS help_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  active INTEGER DEFAULT 1
)`);

db.run(`CREATE TABLE IF NOT EXISTS help_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  category_id INTEGER,
  status INTEGER DEFAULT 1,
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
  db.run(`ALTER TABLE banners ADD COLUMN page TEXT DEFAULT 'home'`, () => {});

  // Tabela: páginas de soluções (Solution Pages)
  db.run(`CREATE TABLE IF NOT EXISTS solution_pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    features TEXT,
    benefits TEXT,
    integrations TEXT,
    hero_image TEXT,
    icon TEXT DEFAULT 'Building2',
    color_theme TEXT DEFAULT 'orange',
    meta_title TEXT,
    meta_description TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Inserir dados iniciais do site
  initializeSiteData();

  // Seed de admin:
  // - Em DEV: cria admin padrão
  // - Em PROD: só cria se SEED_ADMIN=true (recomendado configurar via painel da Hostinger)
  seedAdminUser();
});

function initializeSiteData() {
  const defaultSettings = {
    primary_color: '#00a8e8',
    secondary_color: '#0090c9',
    accent_color: '#0077aa',
    bg_color: '#ffffff',
    text_color: '#111827',
  };

  Object.entries(defaultSettings).forEach(([key, value]) => {
    db.run(`INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)`, [key, value]);
  });

  const initialContent = [
    // Header
    ['header.logo',              'header',  ''],
    ['header.company',           'header',  'Unimaxx'],
    ['header.nav.solutions',     'header',  'Soluções'],
    ['header.nav.institutional', 'header',  'Institucional'],
    ['header.nav.support',       'header',  'Suporte'],
    ['header.nav.contact',       'header',  'Fale Conosco'],
    // Hero
    ['hero.title',               'hero',    'Tecnologia que Impulsiona o Varejo'],
    ['hero.subtitle',            'hero',    'Soluções integradas para sua empresa crescer com mais eficiência e resultado.'],
    ['hero.cta_primary',         'hero',    'Conheça as Soluções'],
    ['hero.cta_secondary',       'hero',    'Fale com Especialista'],
    ['hero.image',               'hero',    ''],
    // Quick Links
    ['quicklinks.title',         'quicklinks', 'Acesso Rápido'],
    ['quicklinks.subtitle',      'quicklinks', 'Encontre o que precisa com agilidade'],
    // Solutions
    ['solutions.title',          'solutions', 'Nossas Soluções'],
    ['solutions.subtitle',       'solutions', 'Tecnologia completa para o seu negócio'],
    // Stats
    ['stats.title',              'stats', 'Nossos Números'],
    ['stats.subtitle',           'stats', 'Unimaxx em detalhes'],
    ['stats.description',        'stats', 'Confira os indicadores que mostram nossa força no mercado.'],
    // Segments
    ['segments.title',           'segments', 'Segmentos Atendidos'],
    ['segments.subtitle',        'segments', 'Soluções para cada setor do varejo'],
    // Differentials
    ['differentials.title',      'differentials', 'Por que a Unimaxx?'],
    ['differentials.subtitle',   'differentials', 'Diferenciais que fazem a diferença'],
    ['differentials.item1_title','differentials', 'Suporte 24/7'],
    ['differentials.item1_desc', 'differentials', 'Atendimento especializado a qualquer hora.'],
    ['differentials.item2_title','differentials', 'Integração Total'],
    ['differentials.item2_desc', 'differentials', 'Sistemas que conversam entre si.'],
    ['differentials.item3_title','differentials', 'Experiência no Varejo'],
    ['differentials.item3_desc', 'differentials', 'Anos de expertise no setor varejista.'],
    // Contact
    ['contact.title',            'contact', 'Entre em Contato'],
    ['contact.subtitle',         'contact', 'Nossa equipe está pronta para te atender'],
    ['contact.phone',            'contact', '(00) 0000-0000'],
    ['contact.email',            'contact', 'contato@unimaxx.com.br'],
    ['contact.address',          'contact', 'Seu endereço aqui'],
    // Footer
    ['footer.logo',              'footer',  ''],
    ['footer.company',           'footer',  'Unimaxx'],
    ['footer.description',       'footer',  'Líder em tecnologia para o varejo. Transformando complexidade em resultado.'],
    ['footer.copyright',         'footer',  '© 2025 Unimaxx Soluções em Tecnologia. Todos os direitos reservados.'],
  ];

  initialContent.forEach(([key, section, value]) => {
    db.run(`INSERT OR IGNORE INTO site_content (section, key, value) VALUES (?, ?, ?)`, [section, key, value]);
  });

  const initialStats = [
    ['900', 'Empresas Atendidas', 'numbers-1'],
    ['4K+', 'Colaboradores', 'numbers-2'],
    ['17', 'Profissionais no Brasil', 'numbers-3'],
  ];

  initialStats.forEach(([val, lab, id], idx) => {
    db.run(
      `INSERT OR IGNORE INTO stats (value, label, stat_id, section, order_num) VALUES (?, ?, ?, 'numbers', ?)`,
      [val, lab, id, idx]
    );
  });
}

function seedAdminUser() {
  const shouldSeed = NODE_ENV !== 'production' || String(process.env.SEED_ADMIN).toLowerCase() === 'true';
  if (!shouldSeed) return;

  const email = process.env.ADMIN_EMAIL || 'admin@linx.com';
  const passwordPlain = process.env.ADMIN_PASSWORD || 'admin123';
  const name = process.env.ADMIN_NAME || 'Administrador';

  const passwordHash = bcrypt.hashSync(passwordPlain, 10);

  db.run(`INSERT OR IGNORE INTO users (email, password, name) VALUES (?, ?, ?)`, [email, passwordHash, name]);
}

// =============================
// AUTH
// =============================

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

app.get('/health', (req, res) => {
  res.json({ ok: true, env: NODE_ENV });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, name: req.user.name });
});

// =============================
// ROTAS PÚBLICAS
// =============================

app.get('/api/content', (req, res) => {
  db.all('SELECT * FROM site_content', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar conteúdo' });
    const content = {};
    (rows || []).forEach((row) => {
      content[row.key] = row.value;
    });
    res.json(content);
  });
});

app.get('/api/banners', (req, res) => {
  db.all(
    `SELECT * FROM banners WHERE active = 1 AND (page = 'home' OR page IS NULL) ORDER BY order_num`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar banners' });
      res.json(rows || []);
    }
  );
});

app.get('/api/banners/:page', (req, res) => {
  const page = req.params.page;
  db.all(
    `SELECT * FROM banners WHERE active = 1 AND page = ? ORDER BY order_num`,
    [page],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar banners da página' });
      res.json(rows || []);
    }
  );
});

app.get('/api/solutions', (req, res) => {
  db.all('SELECT * FROM solutions WHERE active = 1 ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar soluções' });

    const parsed = (rows || []).map((row) => {
      let features = [];
      try {
        features = JSON.parse(row.features || '[]');
      } catch {
        features = [];
      }
      return { ...row, features };
    });

    res.json(parsed);
  });
});

app.get('/api/segments', (req, res) => {
  db.all('SELECT * FROM segments WHERE active = 1 ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar segmentos' });
    res.json(rows || []);
  });
});

app.get('/api/stats', (req, res) => {
  db.all('SELECT * FROM stats ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    res.json(rows || []);
  });
});

app.get('/api/settings', (req, res) => {
  db.all('SELECT * FROM site_settings', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar configurações' });
    const settings = {};
    (rows || []).forEach((row) => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  });
});

// Solution Pages (Público)
app.get('/api/solution-pages/:slug', (req, res) => {
  const slug = req.params.slug;

  db.get(`SELECT * FROM solution_pages WHERE slug = ? AND is_active = 1`, [slug], (err, row) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar página' });
    if (!row) return res.status(404).json({ error: 'Página não encontrada' });

    const parseArr = (v) => {
      if (!v) return [];
      try {
        return typeof v === 'string' ? JSON.parse(v) : v;
      } catch {
        return [];
      }
    };

    res.json({
      ...row,
      features: parseArr(row.features),
      benefits: parseArr(row.benefits),
      integrations: parseArr(row.integrations),
      is_active: !!row.is_active,
    });
  });
});

// =============================
// ROTAS ADMIN (PROTEGIDAS)
// =============================

app.put('/api/admin/content', authenticateToken, (req, res) => {
  const updates = req.body || {};
  const stmt = db.prepare('INSERT OR REPLACE INTO site_content (section, key, value) VALUES (?, ?, ?)');

  Object.entries(updates).forEach(([key, value]) => {
    const section = String(key).split('.')[0];
    stmt.run(section, key, value);
  });

  stmt.finalize();
  res.json({ message: 'Conteúdo atualizado com sucesso' });
});

app.put('/api/admin/settings', authenticateToken, (req, res) => {
  const updates = req.body || {};
  const stmt = db.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)');

  Object.entries(updates).forEach(([key, value]) => {
    stmt.run(key, value);
  });

  stmt.finalize();
  res.json({ message: 'Configurações atualizadas com sucesso' });
});

// -----------------------------
// SOLUTIONS (ADMIN)
// -----------------------------

app.get('/api/admin/solutions', authenticateToken, (req, res) => {
  db.all('SELECT * FROM solutions ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar soluções' });

    const parsed = (rows || []).map((row) => {
      let features = [];
      try {
        features = JSON.parse(row.features || '[]');
      } catch {
        features = [];
      }
      return { ...row, features };
    });

    res.json(parsed);
  });
});

// Upsert (cria/atualiza) solução pelo solution_id
app.put('/api/admin/solutions/:id', authenticateToken, (req, res) => {
  const solutionId = req.params.id;
  const body = req.body || {};

  const title = body.title || '';
  const description = body.description || '';
  const cta_text = body.cta_text || 'Saiba mais';
  const icon = body.icon || 'Building2';
  const order_num = Number.isFinite(body.order_num) ? body.order_num : Number(body.order_num || 0);
  const active = body.active === 0 || body.active === false ? 0 : 1;

  const features = Array.isArray(body.features) ? body.features : [];
  const featuresJson = JSON.stringify(features);

  if (!title || !description) {
    return res.status(400).json({ error: 'title e description são obrigatórios' });
  }

  db.get('SELECT 1 FROM solutions WHERE solution_id = ?', [solutionId], (err, exists) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });

    if (!exists) {
      db.run(
        `INSERT INTO solutions (solution_id, title, description, features, cta_text, icon, order_num, active)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [solutionId, title, description, featuresJson, cta_text, icon, order_num, active],
        function (err2) {
          if (err2) return res.status(500).json({ error: 'Erro ao criar solução' });
          res.json({ message: 'Solução criada com sucesso' });
        }
      );
      return;
    }

    db.run(
      `UPDATE solutions
       SET title = ?, description = ?, features = ?, cta_text = ?, icon = ?, order_num = ?, active = ?
       WHERE solution_id = ?`,
      [title, description, featuresJson, cta_text, icon, order_num, active, solutionId],
      function (err2) {
        if (err2) return res.status(500).json({ error: 'Erro ao atualizar solução' });
        res.json({ message: 'Solução atualizada com sucesso' });
      }
    );
  });
});

app.delete('/api/admin/solutions/:id', authenticateToken, (req, res) => {
  const solutionId = req.params.id;
  db.run('UPDATE solutions SET active = 0 WHERE solution_id = ?', [solutionId], function (err) {
    if (err) return res.status(500).json({ error: 'Erro ao excluir solução' });
    if (this.changes === 0) return res.status(404).json({ error: 'Solução não encontrada' });
    res.json({ message: 'Solução excluída com sucesso' });
  });
});

// -----------------------------
// SEGMENTS (ADMIN)
// -----------------------------

app.get('/api/admin/segments', authenticateToken, (req, res) => {
  db.all('SELECT * FROM segments ORDER BY order_num', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar segmentos' });
    res.json(rows || []);
  });
});

app.post('/api/admin/segments', authenticateToken, (req, res) => {
  const { segment_id, name, icon, order_num, active } = req.body || {};

  if (!name) return res.status(400).json({ error: 'Nome é obrigatório' });

  db.run(
    `INSERT INTO segments (segment_id, name, icon, order_num, active)
     VALUES (?, ?, ?, ?, ?)`,
    [segment_id, name, icon || 'Shirt', order_num || 0, active ?? 1],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao criar segmento' });
      res.json({ message: 'Segmento criado com sucesso' });
    }
  );
});

app.put('/api/admin/segments/:id', authenticateToken, (req, res) => {
  const { name, icon, order_num, active } = req.body || {};

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

app.delete('/api/admin/segments/:id', authenticateToken, (req, res) => {
  db.run(`DELETE FROM segments WHERE segment_id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Erro ao excluir segmento' });
    res.json({ message: 'Segmento excluído com sucesso' });
  });
});

// -----------------------------
// STATS (ADMIN)
// -----------------------------

app.post('/api/admin/stats', authenticateToken, (req, res) => {
  const { value, label, stat_id, section, order_num } = req.body || {};

  db.run(
    `INSERT INTO stats (value, label, stat_id, section, order_num) VALUES (?, ?, ?, ?, ?)`,
    [value, label, stat_id, section || 'numbers', order_num || 0],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao criar estatística' });
      res.json({ message: 'Estatística criada com sucesso', id: this.lastID });
    }
  );
});

app.put('/api/admin/stats/:id', authenticateToken, (req, res) => {
  const { value, label, order_num } = req.body || {};

  db.run(
    `UPDATE stats SET value = ?, label = ?, order_num = ? WHERE stat_id = ?`,
    [value, label, order_num, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar estatística' });
      res.json({ message: 'Estatística atualizada com sucesso' });
    }
  );
});

app.delete('/api/admin/stats/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM stats WHERE stat_id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Erro ao excluir estatística' });
    res.json({ message: 'Estatística excluída com sucesso' });
  });
});

// -----------------------------
// BANNERS (ADMIN)
// -----------------------------

app.post('/api/admin/banners', authenticateToken, (req, res) => {
  const { title, subtitle, description, image, cta_text, cta_link, order_num, use_default_bg, bg_color, page } = req.body || {};

  db.run(
    `INSERT INTO banners (title, subtitle, description, image, cta_text, cta_link, order_num, use_default_bg, bg_color, page)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      subtitle,
      description,
      image,
      cta_text,
      cta_link,
      order_num,
      use_default_bg || 0,
      bg_color || '#00a8e8',
      page || 'home',
    ],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao salvar banner' });
      res.json({ message: 'Banner salvo com sucesso', id: this.lastID });
    }
  );
});

app.put('/api/admin/banners/:id', authenticateToken, (req, res) => {
  const { title, subtitle, description, image, cta_text, cta_link, order_num, active, use_default_bg, bg_color, page } = req.body || {};

  db.run(
    `UPDATE banners
     SET title = ?, subtitle = ?, description = ?, image = ?, cta_text = ?, cta_link = ?, order_num = ?, active = ?, use_default_bg = ?, bg_color = ?, page = ?
     WHERE id = ?`,
    [title, subtitle, description, image, cta_text, cta_link, order_num, active, use_default_bg, bg_color, page || 'home', req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar banner' });
      res.json({ message: 'Banner atualizado com sucesso' });
    }
  );
});

app.delete('/api/admin/banners/:id', authenticateToken, (req, res) => {
  db.run('UPDATE banners SET active = 0 WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Erro ao excluir banner' });
    res.json({ message: 'Banner excluído com sucesso' });
  });
});

// -----------------------------
// UPLOAD (ADMIN)
// -----------------------------

app.post('/api/admin/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhuma imagem enviada' });

  // Retorna URL pública, usada pelo frontend
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// -----------------------------
// SOLUTION PAGES (ADMIN)
// -----------------------------

const toJsonText = (arr) => JSON.stringify(Array.isArray(arr) ? arr : []);

app.get('/api/admin/solution-pages', authenticateToken, (req, res) => {
  db.all('SELECT * FROM solution_pages ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar páginas' });
    res.json(rows || []);
  });
});

app.post('/api/admin/solution-pages', authenticateToken, (req, res) => {
  const b = req.body || {};

  if (!b.slug || !b.title) {
    return res.status(400).json({ error: 'slug e title são obrigatórios' });
  }

  db.run(
    `INSERT INTO solution_pages (slug, title, subtitle, description, features, benefits, integrations, hero_image, icon, color_theme, meta_title, meta_description, is_active, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [
      b.slug,
      b.title,
      b.subtitle || '',
      b.description || '',
      toJsonText(b.features),
      toJsonText(b.benefits),
      toJsonText(b.integrations),
      b.hero_image || '',
      b.icon || 'Building2',
      b.color_theme || 'orange',
      b.meta_title || '',
      b.meta_description || '',
      b.is_active ? 1 : 0,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao criar página' });
      res.json({ message: 'Página criada com sucesso', id: this.lastID });
    }
  );
});

app.put('/api/admin/solution-pages/:id', authenticateToken, (req, res) => {
  const b = req.body || {};

  db.run(
    `UPDATE solution_pages
     SET slug = ?, title = ?, subtitle = ?, description = ?, features = ?, benefits = ?, integrations = ?, hero_image = ?, icon = ?, color_theme = ?, meta_title = ?, meta_description = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      b.slug,
      b.title,
      b.subtitle || '',
      b.description || '',
      toJsonText(b.features),
      toJsonText(b.benefits),
      toJsonText(b.integrations),
      b.hero_image || '',
      b.icon || 'Building2',
      b.color_theme || 'orange',
      b.meta_title || '',
      b.meta_description || '',
      b.is_active ? 1 : 0,
      req.params.id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar página' });
      res.json({ message: 'Página atualizada com sucesso' });
    }
  );
});

app.delete('/api/admin/solution-pages/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM solution_pages WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Erro ao excluir página' });
    res.json({ message: 'Página excluída com sucesso' });
  });
});

// -----------------------------
// ALL DATA (ADMIN)
// -----------------------------

app.get('/api/admin/all-data', authenticateToken, (req, res) => {
  const data = {};

  db.all('SELECT * FROM site_settings', [], (err, settingsRows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar settings' });

    data.settings = {};
    (settingsRows || []).forEach((row) => {
      data.settings[row.key] = row.value;
    });

    db.all('SELECT * FROM site_content', [], (err2, contentRows) => {
      if (err2) return res.status(500).json({ error: 'Erro ao buscar content' });

      data.content = {};
      (contentRows || []).forEach((row) => {
        data.content[row.key] = row.value;
      });

      db.all('SELECT * FROM solutions ORDER BY order_num', [], (err3, solutionsRows) => {
        if (err3) return res.status(500).json({ error: 'Erro ao buscar solutions' });

        data.solutions = (solutionsRows || []).map((row) => {
          let features = [];
          try {
            features = JSON.parse(row.features || '[]');
          } catch {
            features = [];
          }
          return { ...row, features };
        });

        db.all('SELECT * FROM segments ORDER BY order_num', [], (err4, segmentsRows) => {
          if (err4) return res.status(500).json({ error: 'Erro ao buscar segments' });
          data.segments = segmentsRows || [];

          db.all('SELECT * FROM stats ORDER BY order_num', [], (err5, statsRows) => {
            if (err5) return res.status(500).json({ error: 'Erro ao buscar stats' });
            data.stats = statsRows || [];

            db.all('SELECT * FROM banners ORDER BY page, order_num', [], (err6, bannerRows) => {
              if (err6) return res.status(500).json({ error: 'Erro ao buscar banners' });
              data.banners = bannerRows || [];

              res.json(data);
            });
          });
        });
      });
    });
  });
});

// Inicializar módulo de Suporte (Help Center)
setupHelpModule(app, db, authenticateToken, upload);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
