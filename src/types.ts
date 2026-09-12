export interface ProjectItem {
  id: string;
  title: string;
  cardTitle?: string;
  subtitle?: string;
  coverImage: string;
  tags?: string[];
  tools?: string[];
  year?: string;
  client?: string;
  role?: string;
  description?: string;
  story?: string[];
  gallery?: string[];
  customHtml?: string;
  videoUrl?: string;
}

export interface CatalogCategory {
  id: string;
  index: string;
  name: string;
  englishName: string;
  desc: string;
  enDesc: string;
  projects: ProjectItem[];
}
