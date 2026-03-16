import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Utensils } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-6">
          <Utensils className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-6xl font-bold text-brand-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/menu">
              Browse Menu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
