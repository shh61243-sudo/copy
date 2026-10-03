import { Info } from "lucide-react";

export function IndependenceNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="note"
      className={
        "flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm text-foreground " +
        (compact ? "" : "shadow-soft")
      }
    >
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
      <p className="leading-7">
        <strong className="font-semibold">تنبيه:</strong> هذه منصة خاصة ومستقلة تمامًا،
        وليست تابعة لأي جهة حكومية في دولة الإمارات ولا تمثلها. نساعدك على توثيق شكواك
        وتوجيهها إلى الشركة المعنية.
      </p>
    </div>
  );
}
