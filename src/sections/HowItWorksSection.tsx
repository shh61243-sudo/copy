"use client";

export interface StepItem {
  n: string;
  title: string;
  desc: string;
}

export const steps: StepItem[] = [
  { n: "01", title: "تعبئة نموذج الشكوى", desc: "إدخال التفاصيل الأساسية والمشكلة وبيانات الشركة المعنية في دقائق." },
  { n: "02", title: "التدقيق المبدئي للطلب", desc: "يقوم الفريق بالتحقق من اكتمال البيانات والأوراق الثبوتية." },
  { n: "03", title: "إصدار رقم مرجعي ومخاطبة الجهة", desc: "تسجيل الشكوى رسمياً وإشعار الشركة بالمخالفة أو المشكلة." },
  { n: "04", title: "متابعة التسوية والحل", desc: "تلقي الإشعارات الفورية حول رد الشركة والحلول المقترحة." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" dir="rtl" className="bg-white py-20 md:py-28 text-gray-900 border-y border-gray-100">
      <div className="container-page">
        {/* العناوين */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-brand-red)]">
            خطوات عمل بسيطة
          </span>
          <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">
            آلية توثيق ومتابعة الشكاوى
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 font-medium">
            آلية عمل شفافة تضمن متابعة حقك برقم مرجعي رسمي.
          </p>
        </div>

        {/* شبكة الخطوات */}
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group relative rounded-xl border border-gray-200 bg-gray-50/50 p-6 shadow-sm transition-all duration-300 hover:border-[var(--color-brand-red)] hover:bg-white hover:shadow-md hover:-translate-y-1"
            >
              {/* رقم الخطوة في الزاوية اليسرى */}
              <span className="font-mono text-4xl font-black text-[var(--color-brand-red)]/25 absolute top-4 left-5 select-none transition-colors group-hover:text-[var(--color-brand-red)]/60">
                {s.n}
              </span>

              {/* العنوان والوصف */}
              <h3 className="mt-4 text-base md:text-lg font-bold text-gray-900 relative z-10">
                {s.title}
              </h3>
              <p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-600 relative z-10">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}