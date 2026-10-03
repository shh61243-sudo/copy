import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { buildHead } from "@/components/site/seo";

export const Route = createFileRoute("/thank-you")({
  head: () =>
    buildHead({
      title: "تم استلام شكواك بنجاح | منصة حماية المستهلك",
      description:
        "شكرًا لتقديم شكواك عبر منصة حماية المستهلك تم استلام الطلب وبدأت عملية المراجعة.",
      path: "/thank-you",
    }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <section dir="rtl" className="relative min-h-screen overflow-hidden bg-background">
      {/* نسيج ورق أمان + توهج ذهبي خفيف — نفس هوية الهيرو */}
      <div className="pointer-events-none absolute inset-0">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--color-foreground) 0px, var(--color-foreground) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, var(--color-foreground) 0px, var(--color-foreground) 1px, transparent 1px, transparent 28px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-220px] h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.10] blur-[120px]"
          style={{ background: "var(--color-accent)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center px-5 py-12 md:px-8">
        <div className="w-full max-w-3xl">
          {/* أيقونة النجاح */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 scale-150 rounded-full bg-success/10 blur-2xl" />
              <div className="relative grid h-24 w-24 place-items-center rounded-full border border-success/25 bg-success/10 shadow-soft">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-success shadow-card">
                  <Check className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-4 py-2 text-xs font-bold text-success">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              تم تسجيل الطلب بنجاح
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
              شكواك وصلت إلينا
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              شكرًا لثقتك بـ{" "}
              <span className="font-bold text-accent">منصة حماية المستهلك</span>
              . تم استلام شكواك بنجاح، وبدأت عملية مراجعتها.
            </p>
          </div>

          {/* بطاقة حالة الطلب */}
          <div className="mt-10 overflow-hidden rounded-[28px] border border-border bg-surface shadow-card">
            <div className="border-b border-border px-6 py-5 md:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-muted-foreground">حالة الطلب</p>
                  <p className="mt-1 text-lg font-extrabold text-foreground">قيد المراجعة</p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
                  <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="px-6 py-7 md:px-8">
              <div className="grid gap-6 md:grid-cols-3">
                {/* الخطوة 1 */}
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-success text-white">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">تم استلام الشكوى</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        تم تسجيل بياناتك بنجاح
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-10 top-10 hidden h-px w-[calc(100%-40px)] border-t border-dashed border-success/40 md:block" />
                </div>

                {/* الخطوة 2 */}
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                      <Clock3 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">قيد المراجعة</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        يتم التحقق من تفاصيل الشكوى
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-10 top-10 hidden h-px w-[calc(100%-40px)] border-t border-dashed border-border md:block" />
                </div>

                {/* الخطوة 3 */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-muted text-muted-foreground">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground/70">متابعة الحالة</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        ستصلك التحديثات عبر البريد
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* تنويه */}
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-foreground">راجع بريدك الإلكتروني</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  سيصلك الرقم المرجعي والتحديثات المتعلقة بالشكوى.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-muted-foreground">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              خلال 24 ساعة عمل
            </div>
          </div>

          {/* الإجراءات */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow sm:w-auto"
            >
              العودة للصفحة الرئيسية
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          {/* طمأنة أسفل الصفحة */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            بياناتك محمية ويتم التعامل معها بسرية
          </div>
        </div>
      </div>
    </section>
  );
}
