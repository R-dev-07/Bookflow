import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';

export function InfoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bf-root info-page">
      <div>
        <Link href="/" className="info-page__back">
          <ArrowLeft className="h-4 w-4" />
          Back to BookFlow
        </Link>
        <header className="info-page__header">
          <p className="info-page__eyebrow">{eyebrow}</p>
          <h1 className="info-page__title">{title}</h1>
          <p className="info-page__intro">{intro}</p>
        </header>
        <div className="info-page__content" aria-live="polite">
          {children}
        </div>
        <div className="info-page__actions">
          <Link href="/faq" className="info-page__action">
            <MessageCircle className="h-5 w-5 text-accent" />
            <span>Browse common questions</span>
          </Link>
          <Link href="/contact" className="info-page__action">
            <Mail className="h-5 w-5 text-accent" />
            <span>Talk to the BookFlow team</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
