
-- Create signatures table
CREATE TABLE IF NOT EXISTS public.signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

-- Users can view their own signatures
CREATE POLICY "Users can view their own signatures" ON public.signatures
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own signatures
CREATE POLICY "Users can insert their own signatures" ON public.signatures
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own signatures
CREATE POLICY "Users can update their own signatures" ON public.signatures
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own signatures
CREATE POLICY "Users can delete their own signatures" ON public.signatures
  FOR DELETE USING (auth.uid() = user_id);
