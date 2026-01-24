-- Create family_circles table for privacy groups
CREATE TABLE public.family_circles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    shared_emails TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create graves table
CREATE TABLE public.graves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    birth_date DATE,
    death_date DATE,
    coordinates POINT NOT NULL,
    description TEXT,
    panoramic_url TEXT,
    photo_url TEXT,
    is_public BOOLEAN DEFAULT true,
    family_circle_id UUID REFERENCES public.family_circles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    qr_code_data TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tributes table
CREATE TABLE public.tributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grave_id UUID REFERENCES public.graves(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    tribute_type TEXT NOT NULL CHECK (tribute_type IN ('flower', 'candle', 'heart', 'note')),
    message TEXT,
    emoji TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.family_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.graves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Family Circles policies
CREATE POLICY "Users can view own family circles" ON public.family_circles
    FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can create family circles" ON public.family_circles
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own family circles" ON public.family_circles
    FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own family circles" ON public.family_circles
    FOR DELETE USING (auth.uid() = owner_id);

-- Graves policies
CREATE POLICY "Anyone can view public graves" ON public.graves
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own private graves" ON public.graves
    FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Family circle members can view private graves" ON public.graves
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.family_circles fc
            WHERE fc.id = family_circle_id
            AND (
                fc.owner_id = auth.uid()
                OR auth.jwt() ->> 'email' = ANY(fc.shared_emails)
            )
        )
    );

CREATE POLICY "Users can create graves" ON public.graves
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own graves" ON public.graves
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own graves" ON public.graves
    FOR DELETE USING (auth.uid() = created_by);

-- Tributes policies
CREATE POLICY "Anyone can view tributes on public graves" ON public.tributes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.graves g
            WHERE g.id = grave_id AND g.is_public = true
        )
    );

CREATE POLICY "Authenticated users can create tributes" ON public.tributes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tributes" ON public.tributes
    FOR DELETE USING (auth.uid() = user_id);

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_graves_updated_at
    BEFORE UPDATE ON public.graves
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_family_circles_updated_at
    BEFORE UPDATE ON public.family_circles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();