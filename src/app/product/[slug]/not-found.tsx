import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-6">
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
          It might have been removed or the link is broken.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/menu">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Menu
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
