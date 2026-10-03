import { Link } from "@tanstack/react-router";
import { HelpCircle, ChevronLeft } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export const faqPreview: FaqItem[] = [
  {
    q: "كيف تعمل منصة حماية المستهلك لتقديم الشكاوى؟",
    a: "تتيح لك المنصة تقديم بيانات شكواك والوثائق الداعمة بسهولة. يقوم فريقنا بمراجعتها، توثيقها برقم مرجعي، ثم مخاطبة الشركة المعنية لمتابعة التوصل إلى حل إيجابي.",
  },
  {
    q: "هل خدمة تقديم الشكوى مجانية للمستهلكين في الإمارات؟",
    a: "نعم، خدمة توثيق وتقديم ومتابعة الشكاوى مجانية بالكامل لجميع المستهلكين والمتعاملين داخل دولة الإمارات العربية المتحدة.",
  },
  {
    q: "ما الدور الذي تقوم به المنصة لحل المشكلة مع الشركة؟",
    a: "نقوم بتوثيق الشكوى قانونياً، إصدار الرقم المرجعي، ومخاطبة إدارة المنشأة التجارية للوصول إلى تسوية عادلة تحمي حقوق المستهلك وفق الأنظمة المتبعة.",
  },
];

export function FaqSection() {
  return (
    <section className="border-t border-border bg-secondary/20 py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-3">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase">
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>الأسئلة الشائعة</span>
          </div>
          <h2 className="mt-2 text-3xl font-bold text-foreground">استفسارات تتكرر باستمرار</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            إليك إجابات لأبرز الأسئلة المتعلقة بتقديم وتوثيق الشكاوى التجارية للمستهلكين.
          </p>
          <Link
            to="/faq"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 group"
          >
            عرض جميع الأسئلة
            <ChevronLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <dl className="lg:col-span-2 space-y-4">
          {faqPreview.map((f, idx) => (
            <div key={idx} className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
              <dt className="text-base font-bold text-foreground">{f.q}</dt>
              <dd className="mt-2 text-xs leading-6 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}