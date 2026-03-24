import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// In-memory rate limiter stored on globalThis so it survives Next.js HMR
// reloads in dev and persists within a warm serverless instance in production.
// Sufficient for a personal portfolio; swap for Redis/Upstash for multi-instance.
// ---------------------------------------------------------------------------
declare global {
  // eslint-disable-next-line no-var
  var rateLimitMap: Map<string, { count: number; resetAt: number }> | undefined;
}
const rateLimitMap = (globalThis.rateLimitMap ??= new Map<
  string,
  { count: number; resetAt: number }
>());
const RATE_LIMIT = 3; // max submissions per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) return true;

  record.count++;
  return false;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str: string): string {
  return str.trim().replace(/[<>]/g, "");
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  // --- Rate limiting --------------------------------------------------------
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // --- Parse body -----------------------------------------------------------
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fromName = typeof body.from_name === "string" ? body.from_name : "";
  const fromEmail = typeof body.from_email === "string" ? body.from_email : "";
  const message = typeof body.message === "string" ? body.message : "";
  const recaptchaToken =
    typeof body.recaptchaToken === "string" ? body.recaptchaToken : "";

  // --- Server-side validation -----------------------------------------------
  if (!fromName.trim() || !fromEmail.trim() || !message.trim()) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(fromEmail.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (fromName.trim().length > 100) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 });
  }

  if (message.trim().length > 5000) {
    return NextResponse.json(
      { error: "Message is too long (max 5000 characters)." },
      { status: 400 }
    );
  }

  // --- reCAPTCHA v3 server-side verification --------------------------------
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Spam verification failed. Please try again." },
        { status: 400 }
      );
    }

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaToken)}`,
      }
    );

    const verifyData = (await verifyRes.json()) as {
      success: boolean;
      score: number;
      "error-codes"?: string[];
    };

    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json(
        { error: "Spam verification failed. Please try again." },
        { status: 400 }
      );
    }
  }

  // --- Send via EmailJS REST API --------------------------------------------
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        from_name: sanitize(fromName),
        from_email: sanitize(fromEmail),
        message: sanitize(message),
      },
    }),
  });

  if (!emailRes.ok) {
    const errBody = await emailRes.text();
    console.error("[EmailJS error]", emailRes.status, errBody);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
