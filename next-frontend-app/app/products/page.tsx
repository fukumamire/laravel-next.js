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


// 👇 Client Component を呼ぶだけ！
import ProductsClient from "./products-client"

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsClient products={products} />
}
