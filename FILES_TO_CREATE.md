# Complete File List for Cloud Crust

Copy each file below into your VS Code project following the exact folder structure.

## App Directory Files

### `app/globals.css`
\`\`\`css
@import 'tailwindcss';

@theme inline {
  --font-sans: 'Inter', system-ui, sans-serif;
  
  /* Colors */
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
  --color-card: 255 255 255;
  --color-card-foreground: 15 23 42;
  --color-popover: 255 255 255;
  --color-popover-foreground: 15 23 42;
  --color-primary: 234 88 12;
  --color-primary-foreground: 255 255 255;
  --color-secondary: 241 245 249;
  --color-secondary-foreground: 15 23 42;
  --color-muted: 241 245 249;
  --color-muted-foreground: 100 116 139;
  --color-accent: 241 245 249;
  --color-accent-foreground: 15 23 42;
  --color-destructive: 239 68 68;
  --color-destructive-foreground: 255 255 255;
  --color-border: 226 232 240;
  --color-input: 226 232 240;
  --color-ring: 234 88 12;
  --radius: 0.5rem;
}

.dark {
  --color-background: 15 23 42;
  --color-foreground: 248 250 252;
  --color-card: 30 41 59;
  --color-card-foreground: 248 250 252;
  --color-popover: 30 41 59;
  --color-popover-foreground: 248 250 252;
  --color-primary: 249 115 22;
  --color-primary-foreground: 255 255 255;
  --color-secondary: 51 65 85;
  --color-secondary-foreground: 248 250 252;
  --color-muted: 51 65 85;
  --color-muted-foreground: 148 163 184;
  --color-accent: 51 65 85;
  --color-accent-foreground: 248 250 252;
  --color-destructive: 220 38 38;
  --color-destructive-foreground: 255 255 255;
  --color-border: 51 65 85;
  --color-input: 51 65 85;
  --color-ring: 249 115 22;
}

* {
  border-color: rgb(var(--color-border));
}

body {
  color: rgb(var(--color-foreground));
  background: rgb(var(--color-background));
  font-feature-settings: "rlig" 1, "calt" 1;
}
\`\`\`

### `app/layout.tsx`
\`\`\`typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cloud Crust Continuing Education',
  description: 'Professional continuing education for contractors in Mississippi and Alabama',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
\`\`\`

### `app/page.tsx`
\`\`\`typescript
import Header from '@/components/header'
import Hero from '@/components/hero'
import ContactBanner from '@/components/contact-banner'
import Requirements from '@/components/requirements'
import CourseGrid from '@/components/course-grid'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ContactBanner />
      <Requirements />
      <CourseGrid />
      <Testimonials />
      <Footer />
    </main>
  )
}
\`\`\`

---

Continue in next message for component files...
