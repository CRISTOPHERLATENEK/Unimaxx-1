// Tipos para o site Linx

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Solution {
  id: string;
  solution_id: string;
  title: string;
  description: string;
  features: string[];
  cta_text: string;
  icon: string;
  order_num: number;
  active: number;
}

export interface Segment {
  id: string;
  segment_id: string;
  name: string;
  icon: string;
  order_num: number;
  active: number;
}

export interface NumberStat {
  id: string;
  stat_id: string;
  value: string;
  label: string;
  section: string;
  order_num: number;
}

export interface Banner {
  id?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  cta_text?: string;
  cta_link?: string;
  order_num?: number;
  active?: number;
  use_default_bg?: number;
  bg_color?: string;
  page?: string;
}

export interface Differential {
  title: string;
  description: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SiteContent {
  [key: string]: string;
}

export interface SiteData {
  content: SiteContent;
  solutions: Solution[];
  segments: Segment[];
  stats: NumberStat[];
  banners: Banner[];
  settings: Record<string, string>;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
