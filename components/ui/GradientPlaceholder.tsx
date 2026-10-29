import {
  BarChart3,
  Bot,
  Brain,
  ClipboardList,
  SlidersHorizontal,
  Building2,
  ShoppingCart,
  Users,
  Globe,
  Newspaper,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const gradientConfig: Record<
  string,
  {
    gradient: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }
> = {
  jarvis: {
    gradient: 'from-indigo-600 to-violet-700',
    icon: Bot,
  },
  'bd-llm': {
    gradient: 'from-violet-600 to-fuchsia-700',
    icon: Brain,
  },
  'mis-dash-web': {
    gradient: 'from-emerald-500 to-teal-700',
    icon: BarChart3,
  },
  'mis-dcapp-web': {
    gradient: 'from-sky-500 to-blue-700',
    icon: ClipboardList,
  },
  'mis-dcapp-admin': {
    gradient: 'from-slate-500 to-slate-700',
    icon: SlidersHorizontal,
  },
  'titan-platform': {
    gradient: 'from-amber-500 to-orange-700',
    icon: Building2,
  },
  entresoft: {
    gradient: 'from-rose-500 to-red-700',
    icon: ShoppingCart,
  },
  'ru-rokeya-hall': {
    gradient: 'from-pink-500 to-rose-700',
    icon: Users,
  },
  'mfnl-site': {
    gradient: 'from-blue-500 to-indigo-700',
    icon: Globe,
  },
  bmsf: {
    gradient: 'from-stone-500 to-stone-700',
    icon: Newspaper,
  },
  'portfolio-app': {
    gradient: 'from-cyan-500 to-sky-700',
    icon: Code2,
  },
  'hr-management-system': {
    gradient: 'from-teal-500 to-cyan-600',
    icon: Users,
  },
};

export default function GradientPlaceholder({
  slug,
  projectType,
  className,
}: {
  slug: string;
  projectType: string;
  className?: string;
}) {
  const config = gradientConfig[slug];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden bg-gradient-to-br',
        config.gradient,
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
          <Icon size={28} className="text-white/80" />
        </div>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[1.5px] text-white/50">
          {projectType}
        </span>
      </div>
    </div>
  );
}
