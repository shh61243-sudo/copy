import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-slate-100/90">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2.5 font-display font-bold text-slate-900">
            <img 
              src="/kk.png" 
              alt="شعار منصة حماية المستهلك" 
              width={40} 
              height={40} 
              className="h-10 w-auto shrink-0" 
              loading="lazy"
            />
            <span className="text-lg text-slate-950 font-extrabold">منصة حماية المستهلك</span>
          </Link>
          <p className="mt-4 max-w-md text-xs leading-6 text-slate-700 font-medium">
            منصة مستقلة تساعد المستهلكين في الإمارات على توثيق شكاواهم تجاه الشركات
            الخاصة ومتابعتها. المنصة غير تابعة لأي جهة حكومية ولا تمثلها بأي شكل.
          </p>
        </div>

        <nav aria-label="روابط سريعة">
          <h3 className="text-sm font-bold text-slate-950">روابط سريعة</h3>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-700 font-medium">
            <li><Link to="/about" className="transition-colors hover:text-amber-700 focus-visible:text-amber-700">من نحن</Link></li>
            <li><Link to="/how-it-works" className="transition-colors hover:text-amber-700 focus-visible:text-amber-700">كيف تعمل المنصة</Link></li>
            <li><Link to="/faq" className="transition-colors hover:text-amber-700 focus-visible:text-amber-700">الأسئلة الشائعة</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-amber-700 focus-visible:text-amber-700">تواصل معنا</Link></li>
          </ul>
        </nav>

        <nav aria-label="روابط قانونية">
          <h3 className="text-sm font-bold text-slate-950">قانوني</h3>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-700 font-medium">
            <li><Link to="/privacy" className="transition-colors hover:text-amber-700 focus-visible:text-amber-700">سياسة الخصوصية</Link></li>
            <li><Link to="/terms" className="transition-colors hover:text-amber-700 focus-visible:text-amber-700">الشروط والأحكام</Link></li>
            <li>
              <a 
                href="mailto:moetshakawi-uae@gmail.com" 
                className="inline-flex items-center gap-2 transition-colors hover:text-amber-700 focus-visible:text-amber-700" 
                dir="ltr"
              >
                <Mail className="h-4 w-4 shrink-0 text-slate-800" aria-hidden="true" />
                <span className="font-semibold text-slate-800">moetshakawi-uae@gmail.com</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200 bg-slate-200/60">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-4 text-xs font-medium text-slate-700 md:flex-row">
          <p>© {currentYear} منصة حماية المستهلك. جميع الحقوق محفوظة.</p>
          <p className="text-center md:text-right">منصة حماية المستهلك — ليست جهة حكومية ولا تمثل أي جهة رسمية في الإمارات.</p>
        </div>
      </div>
    </footer>
  );
}