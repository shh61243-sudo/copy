import { useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { z } from "zod";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { submitComplaint } from "@/lib/submit-complaint.functions";

const statuses = ["مواطن", "مقيم"];

const emirates = [
  "أبوظبي",
  "دبي",
  "الشارقة",
  "عجمان",
  "أم القيوين",
  "رأس الخيمة",
  "الفجيرة",
];

const categories = [
  "شكوى تجارية",
  "شكوى على شركة",
  "شكاوى الشركات التجارية",
  "الشكاوى العقارية",
  "شكاوى حماية المستهلك",
  "شكاوى النصب والاحتيال",
  "شكاوى الاحتيال المالي",
  "شكاوى الغش التجاري",
  "شكاوى المتاجر الالكترونية",
];

const NAME_REGEX = /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s'\-]+$/;

function normalizePhone(v: string) {
  return v.replace(/[\s()\-]/g, "");
}

const UAE_PHONE_REGEX = /^(?:\+9715\d{8}|05\d{8})$/;

const DEVICE_ID_KEY = "myshakwa_device_id";
function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return `nostorage-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "الرجاء إدخال الاسم الكامل (3 أحرف على الأقل)")
    .max(100, "الحد الأقصى 100 حرف")
    .regex(NAME_REGEX, "يُسمح فقط بالحروف العربية والإنجليزية والمسافات والشرطة (-) والفاصلة العليا (')"),
  phone: z
    .string()
    .trim()
    .transform(normalizePhone)
    .pipe(
      z
        .string()
        .regex(
          UAE_PHONE_REGEX,
          "رقم هاتف إماراتي غير صحيح. استخدم الصيغة +9715XXXXXXXX أو 05XXXXXXXX",
        ),
    ),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("البريد الإلكتروني غير صحيح")
    .max(255, "الحد الأقصى 255 حرف"),
  status: z.string().min(1, "الرجاء اختيار الحالة"),
  emirate: z.string().min(1, "الرجاء اختيار الإمارة"),
  category: z.string().min(1, "الرجاء اختيار فئة الشكوى"),
  details: z
    .string()
    .trim()
    .min(30, "الرجاء توضيح الشكوى بما لا يقل عن 30 حرف")
    .max(2000, "الحد الأقصى 2000 حرف"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "يجب الموافقة على سياسة الخصوصية" }),
  }),
  website: z.string().max(0).optional().or(z.literal("")),
});

type RawValues = {
  fullName?: string;
  phone?: string;
  email?: string;
  status?: string;
  emirate?: string;
  category?: string;
  details?: string;
  consent?: boolean;
  website?: string;
};
type FieldKey = keyof RawValues;
type Errors = Partial<Record<FieldKey, string>>;
type Touched = Partial<Record<FieldKey, boolean>>;

function validateField(key: FieldKey, values: RawValues): string | undefined {
  const payload = { ...values, website: values.website ?? "" };
  const res = schema.safeParse(payload);
  if (res.success) return undefined;
  const issue = res.error.issues.find((i) => i.path[0] === key);
  return issue?.message;
}

export function ComplaintForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState<RawValues>({});
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);

  const update = useCallback(<K extends FieldKey>(key: K, v: RawValues[K]) => {
    setValues((s) => {
      const next = { ...s, [key]: v };
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const err = validateField(key, next);
        if (!err) {
          const { [key]: _omit, ...rest } = prev;
          return rest;
        }
        return prev;
      });
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (key: FieldKey) => {
      setTouched((t) => ({ ...t, [key]: true }));
      const err = validateField(key, values);
      setErrors((prev) => {
        if (err) return { ...prev, [key]: err };
        if (!prev[key]) return prev;
        const { [key]: _omit, ...rest } = prev;
        return rest;
      });
    },
    [values],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "submit_complaint_click",
        form_name: "consumer_complaint_form",
      });
    }

    const parsed = schema.safeParse({ ...values, website: values.website ?? "" });
    if (!parsed.success) {
      const errs: Errors = {};
      const allTouched: Touched = {};
      for (const iss of parsed.error.issues) {
        const k = iss.path[0] as FieldKey;
        if (!errs[k]) errs[k] = iss.message;
        allTouched[k] = true;
      }
      setErrors(errs);
      setTouched((t) => ({ ...t, ...allTouched }));
      const firstKey = parsed.error.issues[0]?.path[0] as FieldKey | undefined;
      if (firstKey) {
        const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
        el?.focus();
      }
      return;
    }

    if ((values.website ?? "").length > 0) {
      navigate({ to: "/thank-you" });
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const url = new URL(window.location.href);
      await submitComplaint({
        data: {
          fullName: parsed.data.fullName,
          phone: parsed.data.phone,
          email: parsed.data.email,
          status: parsed.data.status,
          emirate: parsed.data.emirate,
          category: parsed.data.category,
          details: parsed.data.details,
          deviceId: getDeviceId(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
          userAgent: navigator.userAgent ?? "",
          language: navigator.language ?? "",
          screenSize: `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          pageUrl: window.location.href,
          source: url.searchParams.get("utm_source") ?? "",
          medium: url.searchParams.get("utm_medium") ?? "",
          campaign: url.searchParams.get("utm_campaign") ?? "",
          referrer: document.referrer ?? "",
        },
      });

      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "complaint_submitted",
          form_name: "consumer_complaint",
        });
      }

      navigate({ to: "/thank-you" });
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("تجاوزت الحد") || msg.includes("RATE_LIMITED_24H")) {
        setSubmitError("لقد تجاوزت الحد الأقصى للرسائل، حاول بعد 24 ساعة");
      } else {
        setSubmitError("تعذّر إرسال الشكوى حالياً. الرجاء المحاولة مرة أخرى.");
      }
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  const fieldState = (key: FieldKey): "error" | "valid" | "idle" => {
    if (errors[key]) return "error";
    if (touched[key]) {
      const val = values[key];
      if (val === undefined || val === "" || val === false) return "idle";
      return validateField(key, values) ? "error" : "valid";
    }
    return "idle";
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
      className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
    >
      <fieldset className="grid gap-4 md:grid-cols-2" disabled={submitting}>
        <legend className="col-span-full mb-1 text-base font-semibold text-foreground">
          بيانات مقدّم الشكوى
        </legend>

        <Field label="الاسم الكامل" name="fullName" error={errors.fullName} required>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName ?? ""}
            onChange={(e) => update("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            aria-invalid={fieldState("fullName") === "error" || undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClsFor(fieldState("fullName"))}
            required
          />
        </Field>

        <Field label="رقم الهاتف" name="phone" error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+9715XXXXXXXX"
            value={values.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={fieldState("phone") === "error" || undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClsFor(fieldState("phone"))}
            required
          />
        </Field>

        <Field label="البريد الإلكتروني" name="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            value={values.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={fieldState("email") === "error" || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClsFor(fieldState("email"))}
            required
          />
        </Field>

        <Field label="الحالة" name="status" error={errors.status} required>
          <select
            id="status"
            name="status"
            value={values.status ?? ""}
            onChange={(e) => update("status", e.target.value)}
            onBlur={() => handleBlur("status")}
            aria-invalid={fieldState("status") === "error" || undefined}
            aria-describedby={errors.status ? "status-error" : undefined}
            className={inputClsFor(fieldState("status"))}
            required
          >
            <option value="">اختر الحالة</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="الإمارة" name="emirate" error={errors.emirate} required>
          <select
            id="emirate"
            name="emirate"
            value={values.emirate ?? ""}
            onChange={(e) => update("emirate", e.target.value)}
            onBlur={() => handleBlur("emirate")}
            aria-invalid={fieldState("emirate") === "error" || undefined}
            aria-describedby={errors.emirate ? "emirate-error" : undefined}
            className={inputClsFor(fieldState("emirate"))}
            required
          >
            <option value="">اختر الإمارة</option>
            {emirates.map((em) => (
              <option key={em} value={em}>
                {em}
              </option>
            ))}
          </select>
        </Field>

        <Field label="فئة الشكوى" name="category" error={errors.category} required>
          <select
            id="category"
            name="category"
            value={values.category ?? ""}
            onChange={(e) => update("category", e.target.value)}
            onBlur={() => handleBlur("category")}
            aria-invalid={fieldState("category") === "error" || undefined}
            aria-describedby={errors.category ? "category-error" : undefined}
            className={inputClsFor(fieldState("category"))}
            required
          >
            <option value="">اختر الفئة</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <div className="md:col-span-2">
          <Field label="تفاصيل الشكوى" name="details" error={errors.details} required>
            <textarea
              id="details"
              name="details"
              rows={5}
              maxLength={2000}
              value={values.details ?? ""}
              onChange={(e) => update("details", e.target.value)}
              onBlur={() => handleBlur("details")}
              aria-invalid={fieldState("details") === "error" || undefined}
              aria-describedby={
                errors.details ? "details-error details-count" : "details-count"
              }
              className={inputClsFor(fieldState("details")) + " resize-y"}
              placeholder="اشرح شكواك بوضوح مع ذكر التواريخ والتفاصيل ذات الصلة."
              required
            />
            <p id="details-count" className="mt-1 text-xs text-muted-foreground">
              {(values.details?.length ?? 0)}/2000
            </p>
          </Field>
        </div>

        {/* Honeypot */}
        <div aria-hidden className="hidden">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website ?? ""}
              onChange={(e) => update("website", e.target.value)}
            />
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="consent"
              className={`mt-1 h-4 w-4 rounded border-border text-slate-navy focus:ring-accent ${
                errors.consent ? "border-red-600 ring-2 ring-red-500/20" : ""
              }`}
              checked={values.consent === true}
              onChange={(e) => update("consent", e.target.checked as true)}
              onBlur={() => handleBlur("consent")}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              required
            />
            <span className="leading-7 text-muted-foreground">
              أوافق على{" "}
              <a href="/privacy" className="text-slate-navy font-semibold underline">
                سياسة الخصوصية
              </a>{" "}
              و
              <a href="/terms" className="mx-1 text-slate-navy font-semibold underline">
                الشروط والأحكام
              </a>
              ، وأقرّ بأن المعلومات المقدّمة صحيحة.
            </span>
          </label>
          {errors.consent && (
            <p
              id="consent-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          {submitError && (
            <p
              role="alert"
              aria-live="polite"
              className="mb-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {submitError}
            </p>
          )}
          
          {/* تم ربط الزر بـ bg-slate-navy ليتطابق مع الثيم الزمردي المعتمد */}
          <button
            type="submit"
            disabled={submitting}
            aria-disabled={submitting}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-navy hover:bg-slate-dark px-8 py-4 text-base font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 md:text-lg"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-white" aria-hidden />
                <span className="text-white">جارٍ إرسال الشكوى…</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5 text-white transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
                <span className="text-white">إرسال الشكوى</span>
              </>
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

const inputBase =
  "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors focus:ring-2";

/* دالة ألوان حقول المدخلات تم تحديث التركيز ليعتمد على متغيرات الـ CSS */
function inputClsFor(state: "error" | "valid" | "idle") {
  if (state === "error") {
    return `${inputBase} border-red-600 bg-red-50/20 text-red-950 focus:border-red-600 focus:ring-red-500/30`;
  }
  if (state === "valid") {
    return `${inputBase} border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/30`;
  }
  return `${inputBase} border-border focus:border-slate-navy focus:ring-slate-navy/20`;
}

/* مكون الحقل وعرض خطأ الفالديشن بالإحمر الواضح */
function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          aria-live="polite"
          className="mt-1.5 text-xs font-semibold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}