import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Search, Send, Bell, ArrowLeft } from "lucide-react";
import { buildHead, PageHeader } from "@/components/site/seo";
export const Route = createFileRoute("/how-it-works")({
  head: () =>
    buildHead({
      // 1. عنوان محسن يربط طريقة العمل باسم المنصة
      title: "كيف تعمل المنصة | منصة حماية المستهلك",

      // 2. وصف جذاب ومحدد يتضمن المراحل الأساسية للخدمة
      description:
        "تعرف على كيفية تقديم وتوثيق الشكاوى عبر منصة حماية المستهلك خطوة بخطوة: من تعبئة النموذج وحتى متابعة الرد واستلام الإشعارات.",

      path: "/how-it-works",

      // 3. مسار التنقل لـ Breadcrumbs
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "كيف تعمل المنصة", path: "/how-it-works" },
      ],

      // 4. إضافة Schema من نوع HowTo لإظهار الخطوات بوضوح لمُحركات البحث
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "طريقة تقديم وتوثيق شكوى عبر منصة حماية المستهلك",
        description: "خطوات بسيطة وشفافة لتقديم شكوى ضد الشركات الخاصة في الإمارات.",
        step: steps.map((s, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: s.title,
          itemListElement: [
            {
              "@type": "HowToDirection",
              text: s.desc,
            },
          ],
        })),
      },
    }),
  component: HowItWorksPage,
});
const steps = [
  {
    icon: FileText,
    title: "1. تعبئة نموذج الشكوى",
    desc: "أدخل بياناتك واسم الشركة وتفاصيل واضحة عن الشكوى. كل ما تحتاجه هو دقائق قليلة.",
  },
  {
    icon: Search,
    title: "2. مراجعة الشكوى",
    desc: "يقوم فريقنا بمراجعة المحتوى للتحقق من اكتماله وعدم مخالفته لسياسة الاستخدام.",
  },
  {
    icon: Send,
    title: "3. توجيه الشكوى",
    desc: "نُرسل الشكوى إلى الشركة المعنية عبر قنواتها الرسمية لخدمة العملاء.",
  },
  {
    icon: Bell,
    title: "4. متابعة وإشعارات",
    desc: "تصلك التحديثات على بريدك الإلكتروني. يمكنك الاحتفاظ بالرقم المرجعي للرجوع إليه.",
  },
];

function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="آلية العمل"
        title="من الفكرة إلى الرد… خطوة بخطوة"
        description="صمّمنا العملية لتكون بسيطة وشفافة، تُبقيك على اطلاع في كل مرحلة."
      />

      <section className="container-page py-16">
        <ol className="grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <li key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-5 text-xl font-bold">{s.title}</h2>
              <p className="mt-2 leading-7 text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-3xl border border-border bg-secondary/50 p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">جاهز للبدء؟</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            قدّم شكواك الآن، وسنتولى الباقي. تقديم الشكوى مجاني عبر المنصة.
          </p>
          <Link
            to="/"
            hash="complaint-form"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-elegant"
          >
            تقديم شكوى
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
