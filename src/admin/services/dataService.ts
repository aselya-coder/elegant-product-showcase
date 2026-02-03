// Data service for managing data
// In production, this would make API calls to a backend
// For now, we'll use localStorage to simulate persistence

import { Product, products as initialProducts } from "@/data/products";
import { Testimonial, testimonials as initialTestimonials } from "@/data/testimonials";

const STORAGE_KEYS = {
  PRODUCTS: "admin_products",
  TESTIMONIALS: "admin_testimonials",
  HOME_CONTENT: "admin_home_content",
  NAVIGATION: "admin_navigation",
  FOOTER: "admin_footer",
  WHATSAPP: "admin_whatsapp",
  CITIES: "admin_cities",
};

// Initialize data from original sources if not in localStorage
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
  }
};

initializeData();

// Products
export const productService = {
  getAll: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : initialProducts;
  },

  getById: (id: string): Product | undefined => {
    const products = productService.getAll();
    return products.find((p) => p.id === id);
  },

  create: (product: Omit<Product, "id">): Product => {
    const products = productService.getAll();
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return newProduct;
  },

  update: (id: string, updates: Partial<Product>): Product | null => {
    const products = productService.getAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return products[index];
  },

  delete: (id: string): boolean => {
    const products = productService.getAll();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
    return true;
  },
};

// Testimonials
export const testimonialService = {
  getAll: (): Testimonial[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return data ? JSON.parse(data) : initialTestimonials;
  },

  getById: (id: string): Testimonial | undefined => {
    const testimonials = testimonialService.getAll();
    return testimonials.find((t) => t.id === id);
  },

  create: (testimonial: Omit<Testimonial, "id">): Testimonial => {
    const testimonials = testimonialService.getAll();
    const newTestimonial = {
      ...testimonial,
      id: Date.now().toString(),
    };
    testimonials.push(newTestimonial);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    return newTestimonial;
  },

  update: (id: string, updates: Partial<Testimonial>): Testimonial | null => {
    const testimonials = testimonialService.getAll();
    const index = testimonials.findIndex((t) => t.id === id);
    if (index === -1) return null;

    testimonials[index] = { ...testimonials[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    return testimonials[index];
  },

  delete: (id: string): boolean => {
    const testimonials = testimonialService.getAll();
    const filtered = testimonials.filter((t) => t.id !== id);
    if (filtered.length === testimonials.length) return false;

    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(filtered));
    return true;
  },
};

// Home Content
export const homeContentService = {
  get: (): unknown => {
    const data = localStorage.getItem(STORAGE_KEYS.HOME_CONTENT);
    return data ? JSON.parse(data) : null;
  },

  save: (content: unknown): void => {
    localStorage.setItem(STORAGE_KEYS.HOME_CONTENT, JSON.stringify(content));
  },
};

// Navigation
export const navigationService = {
  get: (): unknown => {
    const data = localStorage.getItem(STORAGE_KEYS.NAVIGATION);
    return data ? JSON.parse(data) : null;
  },

  save: (navigation: unknown): void => {
    localStorage.setItem(STORAGE_KEYS.NAVIGATION, JSON.stringify(navigation));
  },
};

// Footer
export const footerService = {
  get: (): unknown => {
    const data = localStorage.getItem(STORAGE_KEYS.FOOTER);
    return data ? JSON.parse(data) : null;
  },

  save: (footer: unknown): void => {
    localStorage.setItem(STORAGE_KEYS.FOOTER, JSON.stringify(footer));
  },
};

// WhatsApp
export const whatsappService = {
  get: (): unknown => {
    const data = localStorage.getItem(STORAGE_KEYS.WHATSAPP);
    return data ? JSON.parse(data) : null;
  },

  save: (config: unknown): void => {
    localStorage.setItem(STORAGE_KEYS.WHATSAPP, JSON.stringify(config));
  },
};

// Cities
export const cityService = {
  get: (): unknown => {
    const data = localStorage.getItem(STORAGE_KEYS.CITIES);
    return data ? JSON.parse(data) : null;
  },

  save: (cities: unknown): void => {
    localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(cities));
  },
};
