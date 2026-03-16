import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Karachi Broast - Best Fast Food in Town",
    template: "%s | Karachi Broast",
  },
  description: "Order the crispiest broast, burgers, pizza and more. Fast delivery, great taste! Experience Karachi's favorite fast food restaurant.",
  keywords: ["fast food", "broast", "karachi", "food delivery", "burgers", "pizza", "chicken"],
  authors: [{ name: "Karachi Broast" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://karakhibroast.com",
    title: "Karachi Broast - Best Fast Food in Town",
    description: "Order the crispiest broast, burgers, pizza and more. Fast delivery, great taste!",
    siteName: "Karachi Broast",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karachi Broast",
    description: "Order the crispiest broast, burgers, pizza and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </div>
            <CartDrawer />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
