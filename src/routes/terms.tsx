import { createFileRoute } from "@tanstack/react-router";
import { buildHead, PageHeader } from "@/components/site/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildHead({
      // 1. عنوان فريد ومباشر مرتبط باسم المنصة
      title: "الشروط والأحكام | منصة حماية المستهلك",

      // 2. وصف شامل ومحسّن لنتائج جوجل
      description:
        "الشروط والأحكام الخاصة بـ منصة حماية المستهلك: توضيح طبيعة الخدمة المستقلة، حدود المسؤولية، وحقوق واستخدام المستهلك.",

      path: "/terms",

      // 3. مسار التنقل لـ Breadcrumbs
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "الشروط والأحكام", path: "/terms" },
      ],
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="قانوني"
        title="الشروط والأحكام"
        description="باستخدامك للمنصة فإنك توافق على الشروط الموضحة أدناه. يُرجى قراءتها بعناية."
      />
      <article className="container-page prose prose-neutral mx-auto max-w-3xl py-14 leading-8">
        <p className="text-sm text-muted-foreground">آخر تحديث: 14 يوليو 2026</p>

        <h2 className="mt-8 text-xl font-bold">1. طبيعة المنصة</h2>
        <p className="mt-2 text-muted-foreground">
          منصة حماية المستهلك هي منصة خاصة ومستقلة تمامًا، غير تابعة لأي جهة حكومية في دولة الإمارات
          ولا تمثلها بأي شكل. تعمل المنصة كوسيط لتوثيق شكاوى المستهلكين تجاه الشركات الخاصة.
        </p>

        <h2 className="mt-8 text-xl font-bold">2. مسؤولية المنصة</h2>
        <ul className="mt-3 list-disc space-y-1 pr-5 text-muted-foreground">
          <li>توثيق الشكوى وإصدار رقم مرجعي لها.</li>
          <li>محاولة توجيه الشكوى إلى الشركة المعنية عبر قنواتها الرسمية.</li>
          <li>الحفاظ على سرية بيانات المستخدم وفقًا لسياسة الخصوصية.</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold">3. مسؤولية المستخدم</h2>
        <ul className="mt-3 list-disc space-y-1 pr-5 text-muted-foreground">
          <li>تقديم معلومات صحيحة وكاملة.</li>
          <li>عدم استخدام المنصة لأي غرض غير مشروع أو مسيء.</li>
          <li>احترام حقوق الأطراف الأخرى وعدم القذف أو التشهير.</li>
          <li>الالتزام بعدم إرسال محتوى مكرر أو تلقائي.</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold">4. حدود المسؤولية</h2>
        <p className="mt-2 text-muted-foreground">
          لا تضمن المنصة حل الشكوى أو الحصول على أي تعويض. لا نتحمل مسؤولية القرارات التي
          تتخذها الشركات المعنية، ولا تتحمل المنصة أي أضرار مباشرة أو غير مباشرة ناتجة عن
          الاستخدام.
        </p>

        <h2 className="mt-8 text-xl font-bold">5. المحتوى المرفوض</h2>
        <p className="mt-2 text-muted-foreground">
          يحق للمنصة رفض أو حذف أي شكوى تتضمن محتوى مسيء، عنصري، تهديدي، أو مخالف للقوانين،
          دون الحاجة إلى إبداء الأسباب.
        </p>

        <h2 className="mt-8 text-xl font-bold">6. الاستقلالية</h2>
        <p className="mt-2 text-muted-foreground">
          نؤكد أن المنصة كيان خاص مستقل، ولا تمثل أي جهة حكومية أو قضائية أو رسمية في
          الإمارات، ولا تحل محلها بأي حال.
        </p>

        <h2 className="mt-8 text-xl font-bold">7. التعديلات</h2>
        <p className="mt-2 text-muted-foreground">
          قد نقوم بتحديث هذه الشروط في أي وقت. يُعدّ استمرارك في استخدام المنصة موافقة على
          الشروط بعد التعديل.
        </p>

        <h2 className="mt-8 text-xl font-bold">8. القانون المعمول به</h2>
        <p className="mt-2 text-muted-foreground">
          تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة.
        </p>
      </article>
    </>
  );
}