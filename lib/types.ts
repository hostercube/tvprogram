export interface Channel {
  id: string
  name: string
  description?: string
  logo_url?: string
  stream_url: string
  stream_type: "hls" | "m3u" | "embed"
  embed_code?: string
  category?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name?: string
  role: string
  is_active: boolean
  last_login?: string
  created_at: string
}
