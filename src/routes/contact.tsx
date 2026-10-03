import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Clock, Timer, HelpCircle } from "lucide-react";
import { buildHead, PageHeader } from "@/components/site/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildHead({
      title: "تواصل معنا | منصة حماية المستهلك",
      description:
        "تواصل مع فريق الدعم الفني لـ منصة حماية المستهلك المستقلة عبر البريد الإلكتروني. نرد على استفساراتكم وملاحظاتكم خلال 24 ساعة عمل.",
      path: "/contact",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "تواصل معنا", path: "/contact" },
      ],
    }),
  component: ContactPage,
});

const CONTACT_EMAIL = "moetshakawi-uae@gmail.com";

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="تواصل معنا"
        title="نحن هنا للإجابة على استفساراتك"
        description="سواء كنت بحاجة إلى مساعدة في تقديم شكوى، أو لديك سؤال عام، يسعدنا التواصل معك عبر البريد الإلكتروني."
      />

      <section className="container-page grid gap-4 py-14 md:grid-cols-2">
        <InfoCard icon={Mail} title="البريد الإلكتروني">
          <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr" className="text-primary underline">
            {CONTACT_EMAIL}
          </a>
        </InfoCard>
        <InfoCard icon={Clock} title="ساعات العمل">
          من الأحد إلى الخميس
          <br />
          9:00 صباحًا – 6:00 مساءً (بتوقيت الإمارات)
        </InfoCard>
        <InfoCard icon={Timer} title="زمن الرد المتوقع">
          خلال 24 ساعة عمل من استلام الرسالة.
        </InfoCard>
        <InfoCard icon={HelpCircle} title="الأسئلة الشائعة">
          هل سؤالك عام؟ تفقد{" "}
          <Link to="/faq" className="text-primary underline">
            صفحة الأسئلة الشائعة
          </Link>
          .
        </InfoCard>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Mail;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="mt-3 text-sm leading-7 text-muted-foreground">{children}</div>
    </div>
  );
}
