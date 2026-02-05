// API Service Layer using Supabase
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { products as localProducts } from "@/data/products";

/* ==================== PRODUCTS ==================== */

export type Product = Database["public"]["Tables"]["products"]["Row"] & {
  original_price?: number;
  short_description?: string;
  product_url?: string;
  images?: string[];
  sort_order?: number;
  // Additional tags matching DB columns
  is_best_seller?: boolean;
  is_exclusive?: boolean;
  is_premium?: boolean;
};

// Helper to map local product to API structure for fallback
const mapToApiProduct = (p: any): Product => ({
  ...p,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  original_price: p.originalPrice,
  image_url: p.images?.[0] || "",
  product_url: p.productUrl,
  is_featured: p.featured,
  is_best_seller: p.bestSeller,
  is_exclusive: p.exclusive,
  is_premium: p.premium,
  is_active: true,
  short_description: p.shortDescription,
  // Ensure we map snake_case fields that might be used
  category: p.category,
  description: p.description,
  id: p.id,
  name: p.name,
  price: p.price,
  slug: p.slug
} as unknown as Product);

export const productsApi = {
  getAll: async () => {
    // Skip Supabase if not configured to avoid 406 errors
    if (!isSupabaseConfigured) {
      return localProducts.map(mapToApiProduct);
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.warn("Supabase fetch failed, falling back to local data:", error);
      return localProducts.map(mapToApiProduct);
    }
  },

  getById: async (id: string) => {
    // Skip Supabase if not configured to avoid 406 errors
    if (!isSupabaseConfigured) {
      const p = localProducts.find(p => p.id === id);
      if (!p) throw new Error(`Product not found: ${id}`);
      return mapToApiProduct(p);
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.warn("Supabase fetch failed, falling back to local data:", error);
      const p = localProducts.find(p => p.id === id);
      if (!p) throw error;
      return mapToApiProduct(p);
    }
  },

  getBySlug: async (slug: string) => {
    // Skip Supabase if not configured to avoid 406 errors
    if (!isSupabaseConfigured) {
      // Try exact match first
      let p = localProducts.find(p => p.slug === slug);
      
      // If not found, try cleaning the slug (in case it's a full URL)
      if (!p) {
        const cleanSlug = slug.split('/').pop() || slug;
        p = localProducts.find(p => p.slug === cleanSlug);
      }
      
      if (!p) throw new Error(`Product not found: ${slug}`);
      return mapToApiProduct(p);
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.warn("Supabase fetch failed, falling back to local data:", error);
      // Try exact match first
      let p = localProducts.find(p => p.slug === slug);
      
      // If not found, try cleaning the slug (in case it's a full URL)
      if (!p) {
        const cleanSlug = slug.split('/').pop() || slug;
        p = localProducts.find(p => p.slug === cleanSlug);
      }
      
      if (!p) throw error;
      return mapToApiProduct(p);
    }
  },

  getByCategory: async (category: string, limit: number = 4) => {
    // Skip Supabase if not configured to avoid 406 errors
    if (!isSupabaseConfigured) {
      return localProducts
        .filter(p => p.category === category)
        .slice(0, limit)
        .map(mapToApiProduct);
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .limit(limit);

      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.warn("Supabase fetch failed, falling back to local data:", error);
      return localProducts
        .filter(p => p.category === category)
        .slice(0, limit)
        .map(mapToApiProduct);
    }
  },

  create: async (product: Partial<Product>) => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured - cannot create products without database');
    }

    const { error } = await supabase.from("products").insert({
      name: product.name!,
      slug: product.slug!,
      price: product.price ?? 0,
      original_price: product.original_price,
      category: product.category!,
      description: product.description,
      image_url: product.image_url,
      product_url: product.product_url,
      is_active: product.is_active ?? true,
      is_featured: product.is_featured ?? false,
      is_best_seller: product.is_best_seller ?? false,
      is_exclusive: product.is_exclusive ?? false,
      is_premium: product.is_premium ?? false,
    });

    if (error) throw error;
    return true;
  },

  upsert: async (product: Partial<Product>) => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured - cannot upsert products without database');
    }

    const { error } = await supabase.from("products").upsert({
      name: product.name!,
      slug: product.slug!,
      price: product.price ?? 0,
      original_price: product.original_price,
      category: product.category!,
      description: product.description,
      image_url: product.image_url,
      product_url: product.product_url,
      is_active: product.is_active ?? true,
      is_featured: product.is_featured ?? false,
      is_best_seller: product.is_best_seller ?? false,
      is_exclusive: product.is_exclusive ?? false,
      is_premium: product.is_premium ?? false,
    }, { onConflict: 'slug' });

    if (error) throw error;
    return true;
  },

  update: async (id: string, updates: Partial<Product>) => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured - cannot update products without database');
    }

    const { error } = await supabase
      .from("products")
      .update({
        name: updates.name,
        slug: updates.slug,
        price: updates.price,
        original_price: updates.original_price,
        category: updates.category,
        description: updates.description,
        image_url: updates.image_url,
        product_url: updates.product_url,
        is_active: updates.is_active,
        is_featured: updates.is_featured,
        is_best_seller: updates.is_best_seller,
        is_exclusive: updates.is_exclusive,
        is_premium: updates.is_premium,
      })
      .eq("id", id);

    if (error) throw error;
    return true;
  },

  delete: async (id: string) => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured - cannot delete products without database');
    }

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};

/* ==================== TESTIMONIALS ==================== */

export type Testimonial =
  Database["public"]["Tables"]["testimonials"]["Row"];

export const testimonialsApi = {
  getAll: async () => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      return [];
    }

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data as Testimonial[];
  },

  getById: async (id: string) => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Testimonial;
  },

  create: async (testimonial: Partial<Testimonial>) => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.from("testimonials").insert({
      name: testimonial.name!,
      content: testimonial.content!,
      rating: testimonial.rating ?? 5,
      role: testimonial.role,
      product: testimonial.product,
      is_approved: true,
    });

    if (error) throw error;
    return true;
  },

  update: async (id: string, updates: Partial<Testimonial>) => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from("testimonials")
      .update({
        name: updates.name,
        content: updates.content,
        rating: updates.rating,
        role: updates.role,
        product: updates.product,
        is_approved: updates.is_approved,
      })
      .eq("id", id);

    if (error) throw error;
    return true;
  },

  delete: async (id: string) => {
    // Skip Supabase if not configured
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  },
};

/* ==================== CITIES ==================== */

export interface City {
  id: string;
  city: string;
  island: string;
  whatsappNumber: string;
  isActive: boolean;
}

export const citiesApi = {
  getAll: async (): Promise<City[]> => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "cities")
        .maybeSingle();

      if (error) {
        // Silently return empty array if table is missing or error occurs
        // to prevent console spam while database is being set up
        return [];
      }
      
      if (!data?.value) return [];

      return JSON.parse(data.value as string) as City[];
    } catch (e) {
      return [];
    }
  },

  save: async (cities: City[]) => {
    // Ensure we are using upsert with the correct conflict resolution
    const { error } = await supabase.from("site_settings").upsert({
      key: "cities",
      value: JSON.stringify(cities),
    }, {
      onConflict: 'key' // Explicitly state we want to update based on 'key'
    });

    if (error) throw error;
    return true;
  },
};

/* ==================== HOME CONTENT ==================== */

export interface HomeContent {
  hero: {
    subtitle: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statsCustomers: string;
    statsOrders: string;
    statsRating: string;
  };
  features: {
    sectionSubtitle: string;
    sectionTitle: string;
    sectionDescription: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
  cta: {
    title: string;
    titleHighlight: string;
    description: string;
    buttonText: string;
  };
}

export const homeContentApi = {
  get: async (): Promise<HomeContent | null> => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "home_content")
        .maybeSingle();

      if (error) {
        return null;
      }
      
      if (!data?.value) return null;

      return JSON.parse(data.value as string) as HomeContent;
    } catch (e) {
      return null;
    }
  },

  save: async (content: HomeContent) => {
    const { error } = await supabase.from("site_settings").upsert({
      key: "home_content",
      value: JSON.stringify(content),
    });

    if (error) throw error;
    return true;
  },
};

/* ==================== WHATSAPP CONFIG ==================== */

export interface WhatsAppConfig {
  defaultNumber: string;
  consultationMessage: string;
  orderMessage: string;
}

export const whatsappConfigApi = {
  get: async (): Promise<WhatsAppConfig | null> => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "whatsapp_config")
        .maybeSingle();

      if (error) {
        return null;
      }
      
      if (!data?.value) return null;

      return JSON.parse(data.value as string) as WhatsAppConfig;
    } catch (e) {
      return null;
    }
  },

  save: async (config: WhatsAppConfig) => {
    const { error } = await supabase.from("site_settings").upsert({
      key: "whatsapp_config",
      value: JSON.stringify(config),
    });

    if (error) throw error;
    return true;
  },
};

/* ==================== NAVIGATION ==================== */

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  order: number;
  visible: boolean;
}

export const navigationApi = {
  get: async (): Promise<MenuItem[] | null> => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "navigation")
        .maybeSingle();

      if (error) return null;
      if (!data?.value) return null;

      return JSON.parse(data.value as string) as MenuItem[];
    } catch (e) {
      return null;
    }
  },

  save: async (items: MenuItem[]) => {
    const { error } = await supabase.from("site_settings").upsert({
      key: "navigation",
      value: JSON.stringify(items),
    }, {
      onConflict: 'key'
    });

    if (error) throw error;
    return true;
  },
};
