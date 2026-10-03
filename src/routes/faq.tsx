import { createFileRoute } from "@tanstack/react-router";
import { buildHead, PageHeader } from "@/components/site/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () =>
    buildHead({
      // 1. عنوان محسن يربط الأسئلة باسم المنصة
      title: "الأسئلة الشائعة | منصة حماية المستهلك",

      // 2. وصف شامل وجذاب لنتائج بحث جوجل
      description:
        "إجابات مفصلة وشاملة عن أكثر الأسئلة شيوعًا حول منصة حماية المستهلك: كيفية تقديم الشكاوى، شروط الخدمة، والخصوصية.",

      path: "/faq",

      // 3. مسار التنقل لـ Breadcrumbs
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "الأسئلة الشائعة", path: "/faq" },
      ],

      // 4. الـ Schema المتطورة (FAQPage Rich Snippets)
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    }),
  component: FaqPage,
});

const faqs = [
  {
    q: "هل هذه المنصة تابعة لجهة حكومية في الإمارات؟",
    a: "لا. المنصة خاصة ومستقلة تمامًا، ولا تمثل أي جهة حكومية أو رسمية في الدولة.",
  },
  {
    q: "ما نوع الشكاوى التي تقبلها المنصة؟",
    a: "نستقبل الشكاوى المتعلقة بالشركات الخاصة في قطاعات مثل الاتصالات، التسوق الإلكتروني، العقارات، الطيران، الخدمات المالية الخاصة، وغيرها.",
  },
  {
    q: "هل خدمة تقديم الشكوى مجانية؟",
    a: "نعم، تقديم الشكوى عبر المنصة مجاني بالكامل للمستهلكين.",
  },
  {
    q: "كم يستغرق الرد على الشكوى؟",
    a: "نقوم بمراجعة الشكوى خلال 24 ساعة عمل عادةً، بينما يعتمد وقت الرد النهائي على الشركة المعنية.",
  },
  {
    q: "هل تضمنون حل المشكلة؟",
    a: "لا نقدم أي ضمان بحل الشكوى أو الحصول على تعويض. دورنا هو التوثيق والمتابعة بشكل احترافي.",
  },
  {
    q: "كيف تحمي المنصة بياناتي؟",
    a: "نلتزم بأفضل ممارسات حماية البيانات، ولا نشارك معلوماتك مع أي طرف باستثناء ما هو ضروري لمعالجة الشكوى. للمزيد راجع سياسة الخصوصية.",
  },
  {
    q: "هل يمكنني تعديل أو حذف شكواي؟",
    a: "نعم، يمكنك التواصل معنا عبر البريد الإلكتروني للمطالبة بتعديل أو حذف بياناتك وفقًا لسياسة الخصوصية.",
  },
  {
    q: "هل تتعاملون مع الشكاوى ضد جهات حكومية؟",
    a: "لا، المنصة مخصصة للشكاوى ضد الشركات الخاصة فقط. للشكاوى ضد الجهات الحكومية يُرجى التوجه إلى القنوات الرسمية المختصة.",
  },
];

function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="الأسئلة الشائعة"
        title="إجابات لأكثر أسئلتكم شيوعًا"
        description="جمعنا لكم أهم التساؤلات التي تصلنا حول عمل المنصة والخدمات التي نقدمها."
      />
      <section className="container-page py-14">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-right text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
