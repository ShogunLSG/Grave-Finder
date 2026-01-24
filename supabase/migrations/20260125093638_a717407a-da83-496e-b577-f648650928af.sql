-- Fix the function search path warning
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Create storage bucket for panoramic images
INSERT INTO storage.buckets (id, name, public)
VALUES ('grave-images', 'grave-images', true);

-- Storage policies for grave images
CREATE POLICY "Anyone can view grave images"
ON storage.objects FOR SELECT
USING (bucket_id = 'grave-images');

CREATE POLICY "Authenticated users can upload grave images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'grave-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own uploads"
ON storage.objects FOR UPDATE
USING (bucket_id = 'grave-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own uploads"
ON storage.objects FOR DELETE
USING (bucket_id = 'grave-images' AND auth.uid()::text = (storage.foldername(name))[1]);