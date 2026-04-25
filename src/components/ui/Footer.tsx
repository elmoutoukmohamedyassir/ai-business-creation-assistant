import { Link } from 'react-router-dom';
import { Rocket, Twitter, Linkedin, Github } from 'lucide-react';

const PLATFORM_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Roadmap Engine', href: '/#roadmap' },
  { label: 'Intelligence', href: '/#updates' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '#' },
  // Fixed typo: "Carrers" → "Careers"
  { label: 'Careers', href: '#' },
  { label: 'Press Kit', href: '#' },
  { label: 'Contact', href: '#' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Security', href: '#' },
];

const SOCIAL_LINKS = [
  { Icon: Twitter, label: 'Twitter', href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
  { Icon: Github, label: 'GitHub', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-white/[0.02] backdrop-blur-3xl py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-2 space-y-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white"
            aria-label="BizLaunch AI — Home"
          >
            <div className="bg-indigo-600 text-white p-1.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <Rocket size={20} aria-hidden="true" />
            </div>
            BizLaunch AI
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
            The intelligent platform for entrepreneurs to ideate, launch, and grow with
            AI-driven precision.
          </p>
          <div className="flex gap-3" aria-label="Social links">
            {SOCIAL_LINKS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                rel="noopener noreferrer"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Platform" links={PLATFORM_LINKS} isInternal />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Legal" links={LEGAL_LINKS} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs font-medium">
          &copy; {new Date().getFullYear()} BizLaunch AI. Built for the next generation of
          founders.
        </p>
        <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            aria-hidden="true"
          />
          All Systems Operational
        </span>
      </div>
    </footer>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
  isInternal?: boolean;
}

function FooterColumn({ title, links, isInternal }: FooterColumnProps) {
  return (
    <nav aria-label={`${title} links`}>
      <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{title}</h4>
      <ul className="space-y-4 text-sm font-medium text-slate-400">
        {links.map(({ label, href }) => (
          <li key={label}>
            {isInternal ? (
              <a href={href} className="hover:text-indigo-400 transition-colors">
                {label}
              </a>
            ) : (
              <a
                href={href}
                className="hover:text-indigo-400 transition-colors"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}