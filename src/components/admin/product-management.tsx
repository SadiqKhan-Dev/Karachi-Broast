"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { formatPrice } from "@/lib/utils"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number | null
  image?: string | null
  isAvailable: boolean
  isFeatured: boolean
  isPopular: boolean
  category: {
    name: string
  }
}

interface ProductManagementProps {
  initialProducts: Product[]
}

export function ProductManagement({ initialProducts }: ProductManagementProps) {
  const [products, setProducts] = useState(initialProducts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleToggleAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
      )
    )
  }

  const handleToggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
      )
    )
  }

  const handleTogglePopular = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isPopular: !p.isPopular } : p
      )
    )
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Products</h2>
          <p className="text-muted-foreground">
            Manage your menu items and products
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSuccess={() => setIsDialogOpen(false)}
              onCancel={() => {
                setIsDialogOpen(false)
                setEditingProduct(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">Featured</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">Popular</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{product.category.name}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{formatPrice(product.price)}</p>
                        {product.comparePrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.comparePrice)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAvailability(product.id)}
                      >
                        {product.isAvailable ? (
                          <Badge variant="success">Available</Badge>
                        ) : (
                          <Badge variant="secondary">Unavailable</Badge>
                        )}
                      </Button>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFeatured(product.id)}
                      >
                        {product.isFeatured ? (
                          <ToggleRight className="h-6 w-6 text-brand-600" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-gray-400" />
                        )}
                      </Button>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePopular(product.id)}
                      >
                        {product.isPopular ? (
                          <Badge variant="orange">Popular</Badge>
                        ) : (
                          <Badge variant="secondary">-</Badge>
                        )}
                      </Button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingProduct(product)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductForm({
  product,
  onSuccess,
  onCancel,
}: {
  product: Product | null
  onSuccess: () => void
  onCancel: () => void
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would call a server action
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            defaultValue={product?.name}
            placeholder="e.g., Zinger Burger"
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            defaultValue={product?.slug}
            placeholder="e.g., zinger-burger"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          defaultValue={product?.category.name}
          placeholder="Product description"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price (Rs.)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            defaultValue={product?.price}
            required
          />
        </div>
        <div>
          <Label htmlFor="comparePrice">Compare Price (Rs.)</Label>
          <Input
            id="comparePrice"
            type="number"
            step="0.01"
            defaultValue={product?.comparePrice || ""}
            placeholder="Original price"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  )
}
