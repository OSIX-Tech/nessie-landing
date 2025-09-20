import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface WaitlistEntry {
  id?: number
  email: string
  user_type?: string
  expected_price?: string
  created_at?: string
  browser_language?: string
  user_agent?: string
  referrer?: string
  country_code?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  timezone?: string
  screen_resolution?: string
}