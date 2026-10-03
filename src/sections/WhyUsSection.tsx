"use client";

import { ShieldCheck, Clock, Scale, Users, ArrowLeft, LucideIcon } from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  bgImage: string;
}

export const whyUs: FeatureItem[] = [
  { 
    icon: ShieldCheck, 
    title: "منصة معتمدة وموثوقة", 
    desc: "معايير مهنية وقانونية صارمة لضمان موثوقية وحماية كافة الأطراف.",
    bgImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
  },
  { 
    icon: Clock, 
    title: "معالجة سريعة وفعالة", 
    desc: "بدء مراجعة الشكوى واتخاذ الإجراءات الأولية خلال 24 ساعة عمل.",
    bgImage: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80"
  },
  { 
    icon: Scale, 
    title: "توثيق قانوني متكامل", 
    desc: "إصدار ملف مرجعي موحد للشكوى يمكن استخدامه في المتابعات الرسمية.",
    bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
  },
  { 
    icon: Users, 
    title: "دعم مخصص للمستهلك", 
    desc: "فريق عمل يتفهم القوانين المحلية ويدعم المستهلك خطوة بخطوة.",
    bgImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
  },
];

interface WhyUsSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function WhyUsSection({ onPrimaryClick }: WhyUsSectionProps) {
  return (
    <section dir="rtl" className="relative border-y border-border/50 bg-slate-navy py-20 md:py-28 text-white overflow-hidden">
      {/* خلفية تزيينية زجاجية هادئة */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/5 via-transparent to-transparent opacity-20 pointer-events-none" />

      <div className="container-page relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
        
        {/* الجزء الأيمن: العنوان والنص + الزر */}
        <div className="lg:col-span-5">
          <span className="text-xs font-black uppercase tracking-widest text-gold-amber">
            مميزات المنصة
          </span>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl leading-tight tracking-tight">
            لماذا تعتبر منصتنا الخيار الأفضل لتوثيق شكواك؟
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-200 font-medium leading-relaxed">
            نوفر لك منصة متكاملة وسلسة تجمع بين السرعة والشفافية التامة في التعامل مع القضايا والشكاوى التجارية في كافة إمارات الدولة.
          </p>
          <div className="mt-8">
            <a
              href="#complaint-form"
              onClick={onPrimaryClick}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-accent hover:bg-accent/90 px-7 py-3.5 text-sm font-extrabold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-amber"
            >
              <span>تقديم شكوى جديدة</span>
              <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* الجزء الأيسر: شبكة الكروت مع الصور */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {whyUs.map((w, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/15 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-amber/50 hover:shadow-2xl min-h-[190px] flex flex-col justify-between"
            >
              {/* صورة الخلفية مع تأثير التكبير (Hover Zoom) */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url('${w.bgImage}')` }}
              />
              
              {/* طبقة التغميق (تم تخفيفها لزيادة وضوح الصور) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-navy/80 via-slate-navy/50 to-slate-navy/30 group-hover:from-slate-navy/70 group-hover:via-slate-navy/35 group-hover:to-slate-navy/10 transition-colors" />

              {/* المحتوى المباشر للكارت */}
              <div className="relative z-10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-navy/60 backdrop-blur-md text-gold-amber border border-white/20 transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:scale-110 shadow-lg">
                  <w.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white transition-colors [text-shadow:_0_1px_3px_rgb(0_0_0_/_60%)]">
                  {w.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-100 font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}