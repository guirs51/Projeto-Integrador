export default function CardRequest({
  title = "Solicitações",
  value = 0,
}: {
  title?: string;
  value: number;
}) {
  return (
    <div className="w-full p-10 rounded-xl bg-white dark:bg-emerald-800 shadow-sm border border-slate-200 dark:border-slate-700">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
        {value}
      </h2>
    </div>
  );
}
