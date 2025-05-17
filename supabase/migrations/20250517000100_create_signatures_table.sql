
-- Create signatures table to store user email signatures
CREATE TABLE public.signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  signature_data JSONB NOT NULL,
  layout TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to select only their own signatures
CREATE POLICY "select_own_signatures" ON public.signatures
FOR SELECT USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own signatures
CREATE POLICY "insert_own_signatures" ON public.signatures
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update only their own signatures
CREATE POLICY "update_own_signatures" ON public.signatures
FOR UPDATE USING (auth.uid() = user_id);

-- Create policy that allows users to delete only their own signatures
CREATE POLICY "delete_own_signatures" ON public.signatures
FOR DELETE USING (auth.uid() = user_id);

-- Create index on user_id for faster queries
CREATE INDEX signatures_user_id_idx ON public.signatures (user_id);
