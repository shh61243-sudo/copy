import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const APPS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxOEWHZ8_L2T8vGLYfYA6IsFafc3aH3Id9bPkcXeJx6mXH-WEV-1zWEi-khBNzjeAb0/exec";
const NAME_REGEX = /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s'\-]+$/;
const UAE_PHONE_REGEX = /^(?:\+9715\d{8}|05\d{8})$/;

const inputSchema = z.object({
  fullName: z.string().trim().min(3).max(100).regex(NAME_REGEX),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s()\-]/g, ""))
    .pipe(z.string().regex(UAE_PHONE_REGEX)),
  email: z.string().trim().toLowerCase().email().max(255),
  status: z.string().min(1).max(50),
  emirate: z.string().min(1).max(50),
  category: z.string().min(1).max(80),
  details: z.string().trim().min(30).max(2000),
  deviceId: z.string().trim().min(6).max(200),
  timezone: z.string().max(80).optional().default(""),
  userAgent: z.string().max(500).optional().default(""),
  language: z.string().max(40).optional().default(""),
  screenSize: z.string().max(40).optional().default(""),
  viewport: z.string().max(40).optional().default(""),
  pageUrl: z.string().max(500).optional().default(""),
  source: z.string().max(120).optional().default(""),
  medium: z.string().max(120).optional().default(""),
  campaign: z.string().max(120).optional().default(""),
  referrer: z.string().max(500).optional().default(""),
});

function parseUA(ua: string): { device: string; browser: string; os: string } {
  if (!ua) return { device: "", browser: "", os: "" };
  const device = /Mobi|Android|iPhone|iPad|iPod/i.test(ua)
    ? /iPad|Tablet/i.test(ua)
      ? "Tablet"
      : "Mobile"
    : "Desktop";
  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = "Safari";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  let os = "Unknown";
  if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";
  return { device, browser, os };
}

// دالة جلب معلومات الشبكة الجغرافية بدقة متميزة
async function getClientNetInfo(): Promise<{
  ip: string;
  country: string;
  city: string;
  region: string;
}> {
  try {
    const req = getRequest();
    const h = req?.headers;
    if (!h) return { ip: "", country: "", city: "", region: "" };

    const ip =
      h.get("cf-connecting-ip") ||
      h.get("x-real-ip") ||
      (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
      "";

    let country = h.get("cf-ipcountry") || h.get("x-vercel-ip-country") || "";
    let city = h.get("cf-ipcity") || h.get("x-vercel-ip-city") || "";
    let region =
      h.get("cf-region") ||
      h.get("cf-ipcontinent") ||
      h.get("x-vercel-ip-country-region") ||
      "";

    country = decodeURIComponent(country);
    city = decodeURIComponent(city);
    region = decodeURIComponent(region);

    // إذا لم تتوفر الدولة من الهيدرات، جلب البيانات عبر IP-API بشكل مباشر
    if ((!country || country === "XX") && ip) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`, {
          signal: AbortSignal.timeout(2000), // مهلة ثانيتين حتى لا تتأخر الاستجابة
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === "success") {
            country = geoData.country || country;
            city = geoData.city || city;
            region = geoData.regionName || region;
          }
        }
      } catch (e) {
        console.warn("Geo IP fetch failed:", e);
      }
    }

    return {
      ip,
      country: country || "Unknown",
      city: city || "Unknown",
      region: region || "Unknown",
    };
  } catch {
    return { ip: "", country: "", city: "", region: "" };
  }
}

export const submitComplaint = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { device, browser, os } = parseUA(data.userAgent);
    
    // انتظر جلب بيانات الشبكة (الآن الدالة async)
    const net = await getClientNetInfo();

    const payload = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      status: data.status,
      emirate: data.emirate,
      category: data.category,
      details: data.details,

      tracking: {
        fingerprint: data.deviceId,
        timezone: data.timezone,
        language: data.language,
        userAgent: data.userAgent,
        screenResolution: data.screenSize,
        viewport: data.viewport,
        landingPage: data.pageUrl,
        currentPage: data.pageUrl,
        referrer: data.referrer,

        deviceType: device,
        browser,
        os,

        sessionId: data.deviceId,

        utm: {
          source: data.source,
          medium: data.medium,
          campaign: data.campaign,
        },

        ip: net.ip,
        country: net.country,
        city: net.city,
        region: net.region,
      },
    };

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error(text);
      throw new Error("Failed to reach Apps Script");
    }

    let result: { ok?: boolean; message?: string };

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Invalid response from Apps Script");
    }

    if (!result.ok) {
      throw new Error(result.message || "Submission failed");
    }

    return { ok: true as const };
  });