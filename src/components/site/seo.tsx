import type { ReactNode } from "react";

// قم بتحديث رابط الموقع الجديد هنا
const SITE_URL = "https://emirates-connect.com///";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export function buildHead({
  title,
  description,
  path,
  type = "website",
  image,
  noindex = false,
  jsonLd,
  breadcrumbs,
}: SeoProps) {
  const fullUrl = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  
  const ogImage = image
    ? (image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`)
    : DEFAULT_OG_IMAGE;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    
    // Open Graph Tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: fullUrl },
    { property: "og:image", content: ogImage },
    // قم بتغيير اسم الموقع الجديد هنا
    { property: "og:site_name", content: "اسم موقعك الجديد" },

    // Twitter / X Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  const links: Array<Record<string, string>> = [
    { rel: "canonical", href: fullUrl },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" }
  ];

  const scripts: Array<{ type: string; children: string }> = [];
  const schemas: Array<Record<string, unknown>> = [];

  if (jsonLd) {
    if (Array.isArray(jsonLd)) schemas.push(...jsonLd);
    else schemas.push(jsonLd);
  }

  if (breadcrumbs && breadcrumbs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${SITE_URL}${b.path.startsWith("/") ? b.path : `/${b.path}`}`,
      })),
    });
  }

  for (const s of schemas) {
    scripts.push({ type: "application/ld+json", children: JSON.stringify(s) });
  }

  return { meta, links, scripts };
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="gradient-hero border-b border-border">
      <div className="container-page py-16 md:py-20">
        {eyebrow && (
          <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}