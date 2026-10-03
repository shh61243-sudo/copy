import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, CheckCircle2, XCircle } from "lucide-react";
import { buildHead, PageHeader } from "@/components/site/seo";
import { IndependenceNotice } from "@/components/site/IndependenceNotice";

export const Route = createFileRoute("/about")({
  head: () =>
    buildHead({
      // 1. عنوان محسن يدمج اسم المنصة والكلمات المفتاحية
      title: "من نحن | منصة حماية المستهلك - توثيق شكاوى المستهلكين في الإمارات",
      
      // 2. وصف جذاب ومحدد ضمن حدود 150-160 حرف لنتائج جوجل
      description:
        "تعرّف على منصة حماية المستهلك - المنصة المستقلة لتوثيق شكاوى المستهلكين في الإمارات: رؤيتنا ومهمتنا في توثيق شكاوى المستهلكين وحمايتهم وتوفير مساحة آمنة لإيصال صوتهم للشركات الخاصة.",
      
      path: "/about",
      
      // 3. مسار التنقل لـ Google Rich Results
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "من نحن", path: "/about" },
      ],

    }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "مهمتنا", desc: "تمكين المستهلك من إيصال صوته وتوثيق شكواه بطريقة منظمة وشفافة." },
  { icon: Eye, title: "رؤيتنا", desc: "أن نكون المرجع الأول للمستهلكين في الإمارات لتوثيق الشكاوى تجاه القطاع الخاص." },
  { icon: Heart, title: "قيمنا", desc: "الاستقلالية، الشفافية، احترام خصوصية المستخدم، والحياد في التعامل." },
];

const provide = [
  "استقبال الشكاوى وتوثيقها برقم مرجعي.",
  "توجيه الشكوى إلى الشركة الخاصة المعنية.",
  "متابعة الرد وإرسال التحديثات للمستخدم.",
  "توفير مساحة آمنة لتوثيق تجارب المستهلكين.",
];

const dontProvide = [
  "لا نمثّل أي جهة حكومية أو قضائية في الإمارات.",
  "لا نقدّم استشارات قانونية أو تمثيلًا قانونيًا.",
  "لا نضمن حل الشكوى أو الحصول على تعويض.",
  "لا نتعامل مع الشكاوى الجنائية أو العاجلة، يرجى التواصل مع الجهات المختصة.",
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="من نحن"
        title="منصة مستقلة لخدمة المستهلك في الإمارات"
        description="نساعد المستهلكين على توثيق شكواهم تجاه الشركات الخاصة، بأسلوب احترافي وسهل، بعيدًا عن التعقيد."
      />

      <section className="container-page py-14">
        <IndependenceNotice />
      </section>

      <section className="container-page grid gap-6 pb-16 md:grid-cols-3">
        {values.map((v) => (
          <article key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-primary">
              <v.icon className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-xl font-bold">{v.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{v.desc}</p>
          </article>
        ))}
      </section>

      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="container-page prose prose-neutral max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">قصتنا</h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            بدأت المنصة كمبادرة خاصة يقودها فريق يؤمن بأن المستهلك يستحق قناة واضحة
            لتوثيق تجربته مع الشركات الخاصة. لاحظنا أن كثيرًا من الشكاوى تضيع بين رسائل
            البريد الإلكتروني ومكالمات مراكز الاتصال، فقررنا بناء منصة تُبقي الشكوى موثقة
            من لحظة تقديمها وحتى الرد عليها.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            نحن كيان خاص مستقل، ولا نمثّل أي جهة حكومية. نعمل ضمن إطار الشفافية والالتزام
            بحقوق المستخدم في الخصوصية وحماية البيانات.
          </p>
          <h3 className="mt-10 text-xl font-bold">كيف تُراجَع الشكاوى</h3>
          <ol className="mt-4 list-decimal space-y-2 pr-5 text-muted-foreground">
            <li>يتم استلام الشكوى وإرسال رقم مرجعي إلى بريدك الإلكتروني.</li>
            <li>يراجع فريقنا تفاصيل الشكوى للتأكد من اكتمالها.</li>
            <li>يتم التواصل مع الشركة المعنية عبر قنوات خدمة العملاء لديها.</li>
            <li>نُرسل التحديثات إليك عند استلام أي رد أو تطور.</li>
          </ol>
        </div>
      </section>

      <section className="container-page grid gap-6 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="text-xl font-bold">ما نقدّمه</h3>
          <ul className="mt-4 space-y-3">
            {provide.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm leading-7 text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="text-xl font-bold">ما لا نقدّمه</h3>
          <ul className="mt-4 space-y-3">
            {dontProvide.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm leading-7 text-foreground">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
