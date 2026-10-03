"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion, useInView, animate, type Variants } from "framer-motion";

interface HeroProps {
  onPrimaryClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// إعدادات أنميشن تتابع الظهور الناعم للهيرو
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
};

// مكون العد التصاعدي السريع للأرقام
function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroSection({ onPrimaryClick }: HeroProps) {
  return (
    <div className="w-full bg-[var(--color-background)] py-8 md:py-12 dir-rtl text-right overflow-hidden">
      <div className="container-page space-y-16 md:space-y-20">

        {/* ==========================================================================
            1. HERO SECTION (بطاقة الهيرو المنفصلة مع الأنميشن)
           ========================================================================== */}
        <section className="relative w-full min-h-[460px] md:min-h-[520px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black text-white p-8 sm:p-12 md:p-16 flex flex-col justify-between shadow-sm">

          {/* الصورة الخلفية مع أنميشن التكبير والتكثيف التدريجي */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src="/mn.png"
              alt="منصة حماية المستهلك"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black via-black/85 to-transparent w-full md:w-3/4" />
          </motion.div>

          {/* محتوى الهيرو */}
          <div className="relative z-10 max-w-2xl my-auto space-y-6">

            {/* الشارة الرسمية */}
            <motion.div 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md"
            >
              <ShieldCheck className="h-4 w-4 text-white" />
              <span>منصة مستقلة لتوثيق الشكاوى — دولة الإمارات</span>
            </motion.div>

            {/* العنوان والنص الفرعي */}
            <div className="space-y-2">
              <motion.h1 
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
              >
                منصة حماية المستهلك
              </motion.h1>

              <motion.p 
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-lg sm:text-xl text-neutral-300 font-medium"
              >
                منصة مستقلة وغير تابعة لأي جهة حكومية <br />
                لحماية حقوق المستهلك وتوثيق البلاغات الرسمية
              </motion.p>
            </div>

            {/* الأزرار مع تأثيرات التفاعل (Hover & Tap) */}
            <motion.div 
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="pt-2 flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#complaint-form"
                onClick={onPrimaryClick}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold px-8 py-3.5 text-base transition-colors duration-200 group shadow-sm"
              >
                <span>تقديم طلب توثيق شكوى</span>
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/40 hover:bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-colors duration-200"
              >
                دليل الإجراءات
              </motion.a>
            </motion.div>

          </div>
        </section>

        {/* ==========================================================================
            2. ABOUT & STATS SECTION (قسم عن المنصة والبطاقات مع العد التصاعدي)
           ========================================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* الجانب الأيمن: عن المنصة */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              عن المنصة
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              منصة مستقلة غير تابعة لأي جهة حكومية، متخصصة في توثيق الشكاوى والبلاغات ضد الشركات والمؤسسات الخاصة في دولة الإمارات بطريقة منظمة. نساعدك في صياغة البلاغ ومتابعة حالته لإيصال صوتك للجهات المعنية بأعلى درجات السرية.
            </p>
          </motion.div>

          {/* الجانب الأيسر: الإحصائيات مع العداد السريع */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >

            {/* بطاقة 1: 100% */}
            <motion.div 
              whileHover={{ y: -2 }} 
              className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 flex flex-col justify-between space-y-2 transition-all duration-200"
            >
              <span className="text-3xl md:text-4xl font-black text-black tracking-tight">
                <CountUp to={100} suffix="%" duration={1} />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-600">
                خدمة مجانية بالكامل
              </span>
            </motion.div>

            {/* بطاقة 2: 24 ساعة */}
            <motion.div 
              whileHover={{ y: -2 }} 
              className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 flex flex-col justify-between space-y-2 transition-all duration-200"
            >
              <span className="text-3xl md:text-4xl font-black text-black tracking-tight">
                <CountUp to={24} suffix=" ساعة" duration={0.8} />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-600">
                سرعة المراجعة والتنفيذ
              </span>
            </motion.div>

            {/* بطاقة 3: تأطير الشكوى */}
            <motion.div 
              whileHover={{ y: -2 }} 
              className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 flex flex-col justify-between space-y-2 transition-all duration-200"
            >
              <span className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                تأطير الشكوى
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-600">
                صياغة وتنظيم كامل للشكوى
              </span>
            </motion.div>

            {/* بطاقة 4: +10,000 */}
            <motion.div 
              whileHover={{ y: -2 }} 
              className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 flex flex-col justify-between space-y-2 transition-all duration-200"
            >
              <span className="text-3xl md:text-4xl font-black text-black tracking-tight">
                <CountUp to={10000} prefix="+" duration={1.2} />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-600">
                بلاغ معالج بنجاح
              </span>
            </motion.div>

          </motion.div>

        </section>

      </div>
    </div>
  );
}