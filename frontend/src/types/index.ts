
export interface SolutionPage {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  integrations: string[];
  hero_image?: string;
  icon: string;
  color_theme: 'orange' | 'blue' | 'green' | 'purple' | 'black' | 'white';
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}