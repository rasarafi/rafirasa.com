export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3.5 font-mono text-[13px] font-medium uppercase tracking-[1.5px] text-coral transition-colors duration-[0.25s]">
      {children}
    </p>
  );
}
