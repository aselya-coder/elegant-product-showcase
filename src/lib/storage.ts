/**
 * Supabase Storage Utility
 * Handles file uploads to Supabase Storage with proper error handling
 */

import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";

export interface UploadOptions {
  bucket: string;
  folder?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  filePath?: string;
}

/**
 * Upload a file to Supabase Storage
 * @param file - The file to upload
 * @param options - Upload configuration options
 * @returns Promise with upload result
 */
export async function uploadFile(
  file: File,
  options: UploadOptions
): Promise<UploadResult> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: "Supabase tidak terkonfigurasi. Silakan atur kredensial Supabase di file .env",
    };
  }

  // Validate file size (default 5MB)
  const maxSize = (options.maxSizeMB || 5) * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      success: false,
      error: `Ukuran file terlalu besar. Maksimal ${options.maxSizeMB || 5}MB`,
    };
  }

  // Validate file type
  if (options.allowedTypes && options.allowedTypes.length > 0) {
    const fileType = file.type;
    const isAllowed = options.allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        return fileType.startsWith(category + '/');
      }
      return fileType === type;
    });

    if (!isAllowed) {
      return {
        success: false,
        error: `Tipe file tidak diizinkan. Hanya ${options.allowedTypes.join(', ')} yang diperbolehkan`,
      };
    }
  }

  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}-${randomStr}.${fileExt}`;
    
    // Build file path with optional folder
    const filePath = options.folder
      ? `${options.folder}/${fileName}`
      : fileName;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(options.bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      
      // Handle specific error cases
      if (uploadError.message?.includes("Bucket not found")) {
        return {
          success: false,
          error: `Bucket '${options.bucket}' tidak ditemukan. Silakan buat bucket terlebih dahulu di Supabase Dashboard.`,
        };
      }
      
      if (uploadError.message?.includes("The resource already exists")) {
        return {
          success: false,
          error: "File dengan nama yang sama sudah ada. Silakan coba lagi.",
        };
      }

      return {
        success: false,
        error: uploadError.message || "Gagal mengupload file",
      };
    }

    // Get public URL
    const { data } = supabase.storage
      .from(options.bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: data.publicUrl,
      filePath: filePath,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat mengupload file",
    };
  }
}

/**
 * Upload product image to Supabase Storage
 * @param file - Image file to upload
 * @returns Promise with upload result
 */
export async function uploadProductImage(file: File): Promise<UploadResult> {
  return uploadFile(file, {
    bucket: "products",
    folder: "images",
    maxSizeMB: 5,
    allowedTypes: ["image/*"],
  });
}

/**
 * Delete a file from Supabase Storage
 * @param bucket - Storage bucket name
 * @param filePath - Path to the file in storage
 * @returns Promise with deletion result
 */
export async function deleteFile(
  bucket: string,
  filePath: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: "Supabase tidak terkonfigurasi",
    };
  }

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error("Delete error:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus file",
    };
  }
}

/**
 * Delete product image from Supabase Storage
 * @param imageUrl - Full URL of the image
 * @returns Promise with deletion result
 */
export async function deleteProductImage(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  // Extract file path from URL
  const urlParts = imageUrl.split("/");
  const bucketIndex = urlParts.findIndex((part) => part === "products");
  
  if (bucketIndex === -1) {
    return {
      success: false,
      error: "Invalid image URL",
    };
  }

  const filePath = urlParts.slice(bucketIndex + 1).join("/");
  return deleteFile("products", filePath);
}
