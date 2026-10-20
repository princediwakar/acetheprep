// Path: components/practice/DomainFaqSection.tsx

interface FAQ {
  question: string;
  answer: string;
}

interface DomainFaqSectionProps {
  domainName: string;
  examName: string;
  faqs: FAQ[];
}

export function DomainFaqSection({
  domainName,
  examName,
  faqs,
}: DomainFaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Frequently Asked Questions about {domainName} ({examName})
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border-t border-border/50 pt-4 first:border-none first:pt-0"
          >
            <h4 className="font-semibold text-sm text-foreground">
              {faq.question}
            </h4>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
