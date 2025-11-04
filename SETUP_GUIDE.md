# Cloud Crust Continuing Education - Local Setup Guide

## Prerequisites
- Node.js 18+ installed
- VS Code or any code editor
- Supabase account (free tier works)
- Stripe account (test mode)

## Step 1: Create New Next.js Project

\`\`\`bash
npx create-next-app@latest cloud-crust-education
\`\`\`

Select these options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: Yes (@/*)

\`\`\`bash
cd cloud-crust-education
\`\`\`

## Step 2: Install Dependencies

\`\`\`bash
npm install @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js lucide-react swr
\`\`\`

## Step 3: Install shadcn/ui

\`\`\`bash
npx shadcn@latest init
\`\`\`

Then install components:
\`\`\`bash
npx shadcn@latest add button card input label select sheet badge dropdown-menu avatar
\`\`\`

## Step 4: Create Environment Variables

Create `.env.local` in root directory:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
\`\`\`

## Step 5: Create Project Files

Follow the file structure below and copy each file's content.

---

## File Structure & Contents

### 1. Configuration Files

#### `next.config.mjs`
Already created by Next.js

#### `tsconfig.json`
Already created by Next.js

---

### 2. Middleware

#### `middleware.ts`
\`\`\`typescript
import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabase = await createServerClient()
  
  // Refresh session if expired
  await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const protectedPaths = ['/dashboard', '/course', '/certificate']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged-in users away from auth pages
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
\`\`\`

---

### 3. Library Files

#### `lib/supabase/client.ts`
\`\`\`typescript
import { createBrowserClient as createClient } from '@supabase/ssr'

let client: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

export const createBrowserClient = getSupabaseBrowserClient
\`\`\`

#### `lib/supabase/server.ts`
\`\`\`typescript
import { createServerClient as createClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    }
  )
}

export const createServerClient = getSupabaseServerClient
\`\`\`

#### `lib/cart-context.tsx`
\`\`\`typescript
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Course {
  id: string
  title: string
  price: number
  image_url: string
  state: string
}

interface CartContextType {
  items: Course[]
  addItem: (course: Course) => void
  removeItem: (courseId: string) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Course[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (course: Course) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === course.id)) {
        return prev
      }
      return [...prev, course]
    })
  }

  const removeItem = (courseId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== courseId))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
\`\`\`

---

### 4. Database Scripts

#### `scripts/01-create-tables.sql`
\`\`\`sql
-- Create users profile table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  hours INTEGER NOT NULL,
  state TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress INTEGER DEFAULT 0,
  stripe_payment_id TEXT,
  UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Courses policies (public read)
CREATE POLICY "Anyone can view courses"
  ON public.courses FOR SELECT
  TO public
  USING (true);

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments"
  ON public.enrollments FOR UPDATE
  USING (auth.uid() = user_id);
\`\`\`

#### `scripts/02-seed-courses.sql`
\`\`\`sql
-- Seed Mississippi courses
INSERT INTO public.courses (title, description, price, hours, state, category, image_url, content) VALUES
('Mississippi Project Management', 'Comprehensive project management course covering planning, execution, and delivery of construction projects.', 49.99, 4, 'MS', 'Management', '/project-management-construction.jpg', 'Course content here...'),
('MS Roofing & Repair Techniques', 'Advanced roofing installation and repair methods for Mississippi contractors.', 39.99, 3, 'MS', 'Technical', '/roofing-repair-construction.jpg', 'Course content here...'),
('Business Management for MS Contractors', 'Essential business skills including accounting, contracts, and client relations.', 59.99, 5, 'MS', 'Business', '/business-management-office.jpg', 'Course content here...'),
('Mississippi Construction Safety', 'OSHA-compliant safety training for construction sites in Mississippi.', 44.99, 4, 'MS', 'Safety', '/construction-safety-equipment.jpg', 'Course content here...'),
('MS Ethics & Professional Conduct', 'Professional ethics and legal responsibilities for Mississippi contractors.', 29.99, 2, 'MS', 'Ethics', '/professional-handshake-business.jpg', 'Course content here...');

-- Seed Alabama courses
INSERT INTO public.courses (title, description, price, hours, state, category, image_url, content) VALUES
('Alabama Project Management', 'Comprehensive project management course covering planning, execution, and delivery of construction projects.', 49.99, 4, 'AL', 'Management', '/project-management-construction.jpg', 'Course content here...'),
('AL Roofing & Repair Techniques', 'Advanced roofing installation and repair methods for Alabama contractors.', 39.99, 3, 'AL', 'Technical', '/roofing-repair-construction.jpg', 'Course content here...'),
('Business Management for AL Contractors', 'Essential business skills including accounting, contracts, and client relations.', 59.99, 5, 'AL', 'Business', '/business-management-office.jpg', 'Course content here...'),
('Alabama Construction Safety', 'OSHA-compliant safety training for construction sites in Alabama.', 44.99, 4, 'AL', 'Safety', '/construction-safety-equipment.jpg', 'Course content here...'),
('AL Ethics & Professional Conduct', 'Professional ethics and legal responsibilities for Alabama contractors.', 29.99, 2, 'AL', 'Ethics', '/professional-handshake-business.jpg', 'Course content here...');
\`\`\`

---

## Step 6: Run the Project

1. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

2. Visit `http://localhost:3000/admin/setup` to set up the database

3. Click "Run Database Setup" to create tables and seed courses

4. Start using the application!

---

## Next Steps

- Configure Stripe webhooks for production
- Add more course content
- Customize styling and branding
- Deploy to Vercel

For deployment, push to GitHub and connect to Vercel for automatic deployments.
