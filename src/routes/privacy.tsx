import { createFileRoute } from "@tanstack/react-router";
import { buildHead, PageHeader } from "@/components/site/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildHead({
      // 1. عنوان واضح ومباشر مرتبط باسم المنصة
      title: "سياسة الخصوصية | منصة حماية المستهلك",

      // 2. وصف دقيق وشامل لنتائج البحث
      description:
        "تعرّف على سياسة الخصوصية وحماية البيانات في منصة حماية المستهلك: آلية جمع واستخدام وحماية بيانات المستخدمين وحقوق الخصوصية الخاصة بك.",

      path: "/privacy",

      // 3. مسار التنقل لـ Breadcrumbs
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "سياسة الخصوصية", path: "/privacy" },
      ],
    }) as any,
  component: PrivacyPage,
});

const CONTACT_EMAIL = "moetshakawi-uae@gmail.com";

function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="قانوني"
        title="سياسة الخصوصية"
        description="نلتزم بحماية خصوصيتك. يوضح هذا المستند نوع البيانات التي نجمعها وكيف نستخدمها."
      />
      <article className="container-page prose prose-neutral mx-auto max-w-3xl py-14 leading-8">
        <p className="text-sm text-muted-foreground">آخر تحديث: 14 يوليو 2026</p>

        <h2 className="mt-8 text-xl font-bold">1. المعلومات التي نجمعها</h2>
        <ul className="mt-3 list-disc space-y-1 pr-5 text-muted-foreground">
          <li>بيانات التعريف: الاسم، البريد الإلكتروني، رقم الهاتف، الإمارة.</li>
          <li>محتوى الشكوى: اسم الشركة والتفاصيل التي تدخلها في النموذج.</li>
          <li>بيانات تقنية: عنوان IP، نوع المتصفح، وقت الزيارة (لأغراض الأمان).</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold">2. الغرض من جمع البيانات</h2>
        <p className="mt-2 text-muted-foreground">
          نستخدم بياناتك لتوثيق شكواك وتوجيهها إلى الشركة المعنية، والتواصل معك بشأن حالتها،
          ولتحسين خدمات المنصة.
        </p>

        <h2 className="mt-8 text-xl font-bold">3. التخزين والاحتفاظ</h2>
        <p className="mt-2 text-muted-foreground">
          تُخزَّن البيانات في خوادم آمنة، ونحتفظ بها للمدة اللازمة لإتمام معالجة الشكوى ولمدة
          إضافية معقولة لأغراض قانونية أو تشغيلية، بحد أقصى 24 شهرًا.
        </p>

        <h2 className="mt-8 text-xl font-bold">4. ملفات تعريف الارتباط (Cookies)</h2>
        <p className="mt-2 text-muted-foreground">
          نستخدم ملفات تعريف الارتباط الضرورية لتشغيل الموقع، وقد نستخدم ملفات تحليلية لفهم
          طريقة استخدام الموقع وتحسين تجربتك.
        </p>

        <h2 className="mt-8 text-xl font-bold">5. مشاركة البيانات</h2>
        <p className="mt-2 text-muted-foreground">
          لا نبيع بياناتك. نُشارك تفاصيل الشكوى فقط مع الشركة المعنية بها ومع مزودي الخدمة
          التقنيين الذين يخضعون لالتزامات سرية.
        </p>

        <h2 className="mt-8 text-xl font-bold">6. الأمان</h2>
        <p className="mt-2 text-muted-foreground">
          نطبّق إجراءات تقنية وتنظيمية لحماية بياناتك، بما في ذلك التشفير عند النقل ومراجعات
          الوصول الدورية.
        </p>

        <h2 className="mt-8 text-xl font-bold">7. حقوقك</h2>
        <ul className="mt-3 list-disc space-y-1 pr-5 text-muted-foreground">
          <li>حق الوصول إلى بياناتك.</li>
          <li>حق تصحيحها أو تحديثها.</li>
          <li>حق طلب حذفها وفقًا للسياسات المعمول بها.</li>
          <li>حق سحب الموافقة على المعالجة.</li>
        </ul>
        <p className="mt-3 text-muted-foreground">
          لممارسة أي من هذه الحقوق راسلنا على{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline" dir="ltr">
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <h2 className="mt-8 text-xl font-bold">8. تحديث السياسة</h2>
        <p className="mt-2 text-muted-foreground">
          قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بنشر أي تحديثات على هذه الصفحة مع
          تاريخ آخر مراجعة.
        </p>
      </article>
    </>
  );
}