-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  plan text default 'free',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Signatures table
create table signatures (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  name text,
  signature_data jsonb,
  layout text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Payments table
create table payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  plan text,
  amount numeric,
  status text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table signatures enable row level security;
alter table payments enable row level security;

-- Policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "Users can manage own signatures" on signatures for all using (auth.uid() = user_id);
create policy "Users can manage own payments" on payments for all using (auth.uid() = user_id);
