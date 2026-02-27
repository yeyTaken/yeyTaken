import { NextRequest, NextResponse } from "next/server";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function POST(request: NextRequest) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "turnstile_not_configured",
      },
      { status: 500 },
    );
  }

  let token = "";

  try {
    const body = (await request.json()) as { token?: unknown };
    token = typeof body.token === "string" ? body.token : "";
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_json",
      },
      { status: 400 },
    );
  }

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error: "missing_token",
      },
      { status: 400 },
    );
  }

  const formBody = new URLSearchParams();
  formBody.set("secret", secretKey);
  formBody.set("response", token);

  const remoteIpHeader =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for");
  const remoteIp = remoteIpHeader?.split(",")[0]?.trim();

  if (remoteIp) {
    formBody.set("remoteip", remoteIp);
  }

  try {
    const turnstileResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
      cache: "no-store",
    });

    if (!turnstileResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "provider_unavailable",
        },
        { status: 502 },
      );
    }

    const turnstileData =
      (await turnstileResponse.json()) as TurnstileVerifyResponse;

    if (!turnstileData.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "verification_failed",
          errorCodes: turnstileData["error-codes"] ?? [],
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "provider_unavailable",
      },
      { status: 502 },
    );
  }
}
