"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TOKEN = "rtgs_admin_session_token";

// Helper to get administrative password
function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

// Authentication verification helper
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value === SESSION_TOKEN;
}

// Admin login action
export async function login(password: string) {
  const expectedPassword = getAdminPassword();
  if (password === expectedPassword) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });
    return { success: true };
  }
  return { success: false, error: "Invalid passcode. Please try again." };
}

// Admin logout action
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return { success: true };
}

// Helper to resolve data files safely
function getDataFilePath(filename: string): string {
  return path.join(process.cwd(), "data", filename);
}

// Helper to read JSON files
async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = getDataFilePath(filename);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    throw new Error(`Failed to read content data: ${filename}`);
  }
}

// Helper to write JSON files
async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = getDataFilePath(filename);
  try {
    const content = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, content, "utf-8");
  } catch (error) {
    console.error(`Error writing file ${filename}:`, error);
    throw new Error(`Failed to save content data: ${filename}`);
  }
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  features: string[];
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
}

export interface KeywordsConfig {
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
}

// CRUD Operations: Products
export async function getProducts(): Promise<Product[]> {
  return await readJsonFile<Product[]>("products.json");
}

export async function saveProducts(products: Product[]) {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized access");
  }
  await writeJsonFile("products.json", products);
  revalidatePath("/");
  revalidatePath("/products");
  products.forEach((p) => {
    revalidatePath(`/products/${p.slug}`);
  });
  return { success: true };
}

// CRUD Operations: Industries
export async function getIndustries(): Promise<Industry[]> {
  return await readJsonFile<Industry[]>("industries.json");
}

export async function saveIndustries(industries: Industry[]) {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized access");
  }
  await writeJsonFile("industries.json", industries);
  revalidatePath("/");
  revalidatePath("/industries");
  industries.forEach((i) => {
    revalidatePath(`/industries/${i.slug}`);
  });
  return { success: true };
}

// CRUD Operations: Locations
export async function getLocations(): Promise<string[]> {
  return await readJsonFile<string[]>("locations.json");
}

export async function saveLocations(locations: string[]) {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized access");
  }
  await writeJsonFile("locations.json", locations);
  revalidatePath("/");
  revalidatePath("/locations");
  return { success: true };
}

// CRUD Operations: Keywords
export async function getKeywords(): Promise<KeywordsConfig> {
  return await readJsonFile<KeywordsConfig>("keywords.json");
}

export async function saveKeywords(keywords: KeywordsConfig) {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized access");
  }
  await writeJsonFile("keywords.json", keywords);
  revalidatePath("/");
  return { success: true };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  keywords?: string[];
}

// CRUD Operations: Blogs
export async function getBlogs(): Promise<BlogPost[]> {
  return await readJsonFile<BlogPost[]>("blogs.json");
}

export async function saveBlogs(blogs: BlogPost[]) {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized access");
  }
  await writeJsonFile("blogs.json", blogs);
  revalidatePath("/");
  revalidatePath("/blog");
  blogs.forEach((b) => {
    revalidatePath(`/blog/${b.slug}`);
  });
  return { success: true };
}

