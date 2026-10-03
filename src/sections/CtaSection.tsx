import { ArrowLeft } from "lucide-react";

interface CtaSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function CtaSection({ onPrimaryClick }: CtaSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-slate-navy p-10 text-center text-white shadow-card md:p-16">
          {/* نمط خلفية تزييني زجاجي هادئ */}
          <div 
            className="absolute inset-0 -z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" 
            aria-hidden="true"
          />
          
          {/* تأثير توهج زمردي خفيف بالخلفية */}
          <div 
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" 
            aria-hidden="true"
          />

          <div className="relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-gold-amber block mb-2">
              حماية حقوقك أمانتنا
            </span>

            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold md:text-4xl text-white leading-tight">
              لا تتنازل عن حقك.. وثّق شكواك الآن بأسلوب رسمّي ومعتمد
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm md:text-base text-slate-200 font-medium leading-relaxed">
              خطوات بسيطة وسريعة لتقديم كافة التفاصيل والمستندات للحفاظ على حقوقك التجارية.
            </p>

            <div className="mt-8">
              <a
                href="#complaint-form"
                onClick={onPrimaryClick}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-accent hover:bg-accent/90 px-8 py-3.5 text-base font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-amber"
              >
                <span>ابدأ تقديم الشكوى الآن</span>
                <ArrowLeft className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}