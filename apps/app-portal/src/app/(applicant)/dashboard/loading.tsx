export default function Loading(): JSX.Element {
  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="space-y-4">
          <div className="h-6 w-36 rounded-full bg-slate-200/80" />
          <div className="h-12 w-3/4 rounded-3xl bg-slate-200/80 sm:h-16" />
          <div className="h-5 w-full max-w-2xl rounded-full bg-slate-200/70" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="h-8 w-2/3 rounded-2xl bg-slate-100" />
            <div className="h-5 w-full rounded-full bg-slate-100" />
            <div className="h-5 w-5/6 rounded-full bg-slate-100" />
            <div className="h-36 rounded-3xl bg-slate-100" />
          </div>
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/60 p-6 shadow-sm sm:p-8">
            <div className="h-6 w-1/2 rounded-full bg-slate-200" />
            <div className="mt-4 h-28 rounded-3xl bg-slate-100" />
          </div>
        </div>
      </div>
    </section>
  );
}