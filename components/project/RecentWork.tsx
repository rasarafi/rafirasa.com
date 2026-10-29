/**
 * A dated "what shipped recently" entry. Proves the project is alive, which is
 * a different and stronger signal than proving it exists.
 *
 * Rendered only where there is something real to say — never as an empty shell.
 */
export default function RecentWork({
  when,
  title,
  items,
}: {
  when: string;
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="pt-16 sm:pt-20 lg:pt-[96px]">
      <p className="mb-3 font-mono text-[11.5px] tracking-[0.6px] text-text-3">LATEST WORK</p>
      <h2 className="font-display text-[26px] font-bold leading-[1.12] tracking-[-0.9px] sm:text-[31px]">
        What shipped recently
      </h2>
      <div className="mt-6 max-w-[74ch] rounded-[var(--radius)] border border-line bg-surface p-6 shadow-[var(--shadow)] sm:p-8">
        <p className="mb-3 font-mono text-[11.5px] tracking-[0.5px] text-text-3">{when}</p>
        <h3 className="mb-3 font-display text-[18px] font-semibold">{title}</h3>
        <ul className="list-disc pl-5">
          {items.map((item, i) => (
            <li key={i} className="py-[3px] text-[15px] text-text-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
