import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "منصة الشكاوى المستقلة",
  alternateName: "UAE Complaints Platform",
  url: "/",
  description:
    "منصة خاصة ومستقلة تساعد المستهلكين في دولة الإمارات على توثيق الشكاوى تجاه الشركات الخاصة ومتابعتها. غير تابعة لأي جهة حكومية.",
  areaServed: "AE",
  inLanguage: "ar",
};

// الكلمات المفتاحية للحملات الإعلانية و SEO
const SEO_KEYWORDS = [
  "رفع شكوى حماية المستهلك",
  "شكوى استرداد",
  "شكوى حقوق المستهلك",
  "شكوى متجر",
  "عمل شكوى",
  "تقديم الشكاوي",
  "طريقة رفع شكوى",
  "شكوى على موقع",
  "كيفيه تقديم شكوى",
  "رفع شكوى على شركة",
  "شكاوى حقوق المستهلك",
  "رفع شكوى",
  "خدمة المستهلك",
  "شكوى على متجر الكتروني",
  "رفع شكوى على موقع الكتروني",
  "تقديم شكوى حماية المستهلك",
  "تقديم بلاغ",
  "تقديم شكوى في حماية المستهلك",
  "حقوق المستهلك",
  "تقديم شكوى على متجر الكتروني",
  "تقديم شكوى",
  "شكاوى المستهلك",
  "رفع بلاغ",
  "شكاوي المستهلك",
  "بلاغ حماية المستهلك",
  "موقع حماية المستهلك",
  "شكوى",
  "خدمة حماية المستهلك",
  "رفع بلاغ احتيال مالي",
  "جمعية حماية المستهلك",
  "طريقة شكوى حماية المستهلك",
  "حماية المستهلك",
  "رفع شكوى على متجر الكتروني",
  "شكوى الكترونية",
  "تقديم شكوى الكترونية",
  "شكوى حماية المستهلك",
].join(", ");

function NotFoundComponent() {
  return (
    <>
      <Header />
      <main className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
        <div className="max-w-md">
          <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-3xl bg-accent/20 text-4xl font-bold text-primary">
            404
          </div>
          <h1 className="text-3xl font-bold text-foreground">الصفحة غير موجودة</h1>
          <p className="mt-3 text-muted-foreground">
            الرابط الذي فتحته غير صحيح أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية والبدء من جديد.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-elegant"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-foreground">حدث خطأ غير متوقع</h1>
        <p className="mt-3 text-muted-foreground">
          يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            حاول مجددًا
          </button>
          <a href="/" className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-semibold">
            الصفحة الرئيسية
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#059669" },
      { title: "منصة الشكاوى المستقلة | تقديم شكوى حماية المستهلك وتوثيق البلاغات" },
      { name: "keywords", content: SEO_KEYWORDS },
      {
        name: "description",
        content:
          "منصة خاصة ومستقلة تساعد المستهلكين في دولة الإمارات على توثيق شكاواهم تجاه الشركات والمتاجر الإلكترونية بشكل بسيط وسريع. تقديم شكوى حماية المستهلك بسهولة.",
      },
      { name: "author", content: "UAE Complaints Platform" },
      { property: "og:site_name", content: "منصة الشكاوى المستقلة" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_AE" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "منصة الشكاوى المستقلة | تقديم شكوى حماية المستهلك" },
      { name: "twitter:title", content: "منصة الشكاوى المستقلة | تقديم شكوى حماية المستهلك" },
      { property: "og:description", content: "تقديم شكوى حماية المستهلك وتوثيق البلاغات التجاري والمتاجر الإلكترونية في الإمارات عبر منصة مستقلة." },
      { name: "twitter:description", content: "تقديم شكوى حماية المستهلك وتوثيق البلاغات التجاري والمتاجر الإلكترونية في الإمارات عبر منصة مستقلة." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/20faf45e-3ae3-44db-b298-b400eb4e72c6" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/20faf45e-3ae3-44db-b298-b400eb4e72c6" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/kk.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Tajawal:wght@500;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSON_LD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        تخطي إلى المحتوى الرئيسي
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}