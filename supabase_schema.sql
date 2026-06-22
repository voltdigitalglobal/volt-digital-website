-- ==========================================
-- VOLT DIGITAL BLOG DATABASE SETUP SCHEMA
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Create the blogs table
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  content text not null,
  image_url text,
  author text not null default 'Volt Digital Admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on blogs
alter table public.blogs enable row level security;

-- Drop policies on blogs table if they exist
drop policy if exists "Allow public read access to blogs" on public.blogs;
drop policy if exists "Allow authenticated insert to blogs" on public.blogs;
drop policy if exists "Allow authenticated update to blogs" on public.blogs;
drop policy if exists "Allow authenticated delete to blogs" on public.blogs;

-- Create policies for blogs table
create policy "Allow public read access to blogs"
  on public.blogs for select
  using (true);

create policy "Allow authenticated insert to blogs"
  on public.blogs for insert
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated update to blogs"
  on public.blogs for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated delete to blogs"
  on public.blogs for delete
  using (auth.role() = 'authenticated');


-- 2. Create the storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Drop policies on storage.objects if they exist
drop policy if exists "Public Access to blog-images" on storage.objects;
drop policy if exists "Authenticated uploads to blog-images" on storage.objects;
drop policy if exists "Authenticated updates to blog-images" on storage.objects;
drop policy if exists "Authenticated deletions from blog-images" on storage.objects;

-- Enable public read access to storage objects in blog-images
create policy "Public Access to blog-images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- Enable authenticated uploads/modifications to blog-images
create policy "Authenticated uploads to blog-images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "Authenticated updates to blog-images"
  on storage.objects for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "Authenticated deletions from blog-images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');
