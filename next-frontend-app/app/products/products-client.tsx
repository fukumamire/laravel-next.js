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
    <main className="min-h-screen bg-gray-200 py-12 px-4">
      <section className="max-w-6xl mx-auto bg-[#efefef] border border-gray-300 rounded-3xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl text-center font-black text-gray-800 tracking-wide mb-8">
          商品一覧
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const badge = String(index + 1).padStart(2, "0")

            return (
              <article
                key={product.id}
                className="bg-white border border-gray-300 rounded-md overflow-hidden"
              >
                <div className="bg-gray-300 p-3">
                  <img
                    src={`https://picsum.photos/seed/product-${product.id}/640/360`}
                    alt={product.name}
                    className="h-40 w-full object-cover"
                  />
                </div>

                <div className="px-5 pb-6 pt-2 text-center">
                  <div className="mx-auto -mt-6 mb-3 h-9 w-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                    {badge}
                  </div>

                  <p className="text-xs text-gray-500 mb-1 tracking-wide">おすすめ商品</p>
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-2 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 leading-7 min-h-16 mb-4">
                    {product.description}
                  </p>

                  <p className="text-2xl font-black text-gray-900 mb-4">
                    ¥{product.price.toLocaleString()}
                  </p>

                  <button
                    onClick={() => alert(`${product.name} を購入します`)}
                    className="w-full py-2 rounded-md bg-gray-900 text-white font-semibold hover:bg-black transition"
                  >
                    購入する
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
