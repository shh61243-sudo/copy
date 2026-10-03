import { FileCheck2 } from "lucide-react";
import { ComplaintForm } from "@/components/site/ComplaintForm";

export function ComplaintFormSection() {
  return (
    <section 
      aria-label="قسم تقديم الشكوى التجارية"
      className="border-b border-border bg-slate-50/80 py-16 md:py-24"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-900">
            <FileCheck2 className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            النموذج الموحد
          </span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl text-slate-950">
            قدّم شكواك التجارية الآن
          </h2>
          <p className="mt-3 text-base text-slate-700 leading-relaxed font-medium">
            يرجى تعبئة النموذج بدقة. سيتم توثيق الشكوى ومعالجتها وفق الأنظمة واللوائح الخاصة بحماية المستهلك.
          </p>
        </div>

        {/* غلاف النموذج المزود بحد أدنى للارتفاع لمنع الـ CLS ووسم WebMCP للذكاء الاصطناعي */}
        <div 
          id="complaint-form" 
          aria-label="نموذج توثيق الشكاوى"
          data-webmcp-tool="complaint_submission"
          className="mx-auto mt-10 max-w-4xl scroll-mt-20 min-h-[500px]"
        >
          <ComplaintForm />
        </div>
      </div>
    </section>
  );
}