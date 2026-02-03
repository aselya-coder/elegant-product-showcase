// Admin Types

export interface AdminUser {
  id?: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface HomePageContent {
  hero: {
    subtitle: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      customers: string;
      orders: string;
      rating: string;
    };
  };
  whyChooseUs: {
    sectionSubtitle: string;
    sectionTitle: string;
    sectionDescription: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
}

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  order: number;
  visible: boolean;
}

export interface FooterContent {
  brandDescription: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
  };
}

export interface CityMapping {
  city: string;
  island: string;
  whatsappNumber: string;
  isActive: boolean;
}
