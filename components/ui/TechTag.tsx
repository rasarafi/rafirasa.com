export default function TechTag({
  children,
  size = 'default',
}: {
  children: React.ReactNode;
  size?: 'default' | 'small';
}) {
  const sizeClasses =
    size === 'small'
      ? 'text-[10px] px-[9px] py-[3px]'
      : 'text-[11px] px-[11px] py-1';

  return (
    <span
      className={`whitespace-nowrap rounded-[5px] bg-coral-bg font-mono font-medium text-coral transition-all duration-[0.25s] ${sizeClasses}`}
    >
      {children}
    </span>
  );
}
