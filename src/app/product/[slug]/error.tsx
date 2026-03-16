"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Product page error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8">
          We&apos;re sorry, but there was an error loading this product.
          Please try again or browse our menu.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/menu">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Menu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
