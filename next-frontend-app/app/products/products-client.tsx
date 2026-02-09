"use client"

interface Product {
  id: number
  name: string
  description: string
  price: number
}

export default function ProductsClient({
  products,
}: {
  products: Product[]
}) {
  const handlePurchase = async (productId: number) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/purchase`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      }
    )

    alert("購入しました！")
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <h1 className="text-4xl text-center mb-12">商品一覧</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-2xl font-bold mt-4">
              ¥{product.price.toLocaleString()}
            </p>

            <button 
            onClick={() => alert(`${product.name} を購入します`)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              購入
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
