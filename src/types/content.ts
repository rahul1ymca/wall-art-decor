export type Language = 'fr' | 'en';

export interface TableOfContentItem {
  id: string;
  title: string;
  stepNumber?: number;
  icon?: string;
}

export interface GalleryLayoutOption {
  id: string;
  name: string;
  description: string;
  idealFor: string;
  framesCount: number;
  previewSvg: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DecorStyle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  keyElements: string[];
  colorPalette: string[];
  imageUrl: string;
  imageAlt: string;
}
