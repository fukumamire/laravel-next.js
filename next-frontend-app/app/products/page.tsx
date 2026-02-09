// APIから返される商品データの型を定義  型定義: interface Productで、APIから受け取るデータの構造を定義
interface Product {
  id: number;//商品ID 数字なので number
  name: string;//商品名 文字なので string
  description: string;//商品説明文 文字なので string
  price: number;//値段 数値なので number
  created_at: string;
  updated_at: string;
}

// APIから商品一覧を取得
async function getProducts(): Promise<Product[]> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}


//  商品カードコンポーネント
function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="
        bg-white rounded-2xl p-6
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        border border-gray-100
      "
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h2>

      <p className="text-gray-500 text-sm mb-6 line-clamp-3">
        {product.description}
      </p>

      <div className="flex items-end justify-between">
        <span className="text-sm text-gray-400">税込</span>
        <span className="text-2xl font-bold text-indigo-600">
          ¥{product.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// 👇 Client Component を呼ぶだけ！
import ProductsClient from "./products-client"

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsClient products={products} />
}
