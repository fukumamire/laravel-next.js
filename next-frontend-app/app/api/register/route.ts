export async function POST(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return Response.json(
      { message: "NEXT_PUBLIC_API_BASE_URL is not set." },
      { status: 500 },
    );
  }

  try {
    const body = await req.text();
    const upstream = await fetch(`${baseUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
      cache: "no-store",
      redirect: "manual",
    });

    if (upstream.status >= 300 && upstream.status < 400) {
      return Response.json(
        { message: "登録処理で不正なリダイレクトが発生しました。" },
        { status: 502 },
      );
    }

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { message: "Laravel API connection failed." },
      { status: 502 },
    );
  }
}
