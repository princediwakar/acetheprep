// Path: lib/slugs.ts
import taxonomyRaw from "./taxonomies.json";

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyRaw as unknown as TaxonomyData;

/**
 * Normalizes any string to a clean, lowercase kebab-case slug.
 * Removes punctuation, normalizes spaces, replaces commas/ampersands.
 * Example: "Linear equations in two variables" -> "linear-equations-in-two-variables"
 * Example: "Financial Statement Analysis" -> "financial-statement-analysis"
 * Example: "CFA Level 1" -> "cfa-level-1"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface TaxonomyEntry {
  exam: string;
  examSlug: string;
  subject: string;
  subjectSlug: string;
  domain: string;
  domainSlug: string;
}

// Build pre-computed index for O(1) lookups
const entries: TaxonomyEntry[] = [];
const examSlugMap = new Map<string, string>();
const slugToExamMap = new Map<string, string>();

const subjectSlugMap = new Map<string, string>();
const slugToSubjectMap = new Map<string, string>();

const domainSlugMap = new Map<string, string>();
const slugToDomainMap = new Map<string, string>();

for (const [exam, subjects] of Object.entries(taxonomy)) {
  if (exam === "_schema_version") continue;
  const examSlug = slugify(exam);
  examSlugMap.set(exam, examSlug);
  slugToExamMap.set(examSlug, exam);

  if (typeof subjects === "object" && subjects !== null) {
    for (const [subject, domains] of Object.entries(subjects)) {
      const subjectSlug = slugify(subject);
      subjectSlugMap.set(subject, subjectSlug);
      slugToSubjectMap.set(subjectSlug, subject);

      if (Array.isArray(domains)) {
        for (const domain of domains) {
          const domainSlug = slugify(domain);
          domainSlugMap.set(domain, domainSlug);
          slugToDomainMap.set(domainSlug, domain);

          entries.push({
            exam,
            examSlug,
            subject,
            subjectSlug,
            domain,
            domainSlug,
          });
        }
      }
    }
  }
}

export const GLOBAL_EXAM_PRIORITY = [
  "SAT",
  "GRE",
  "GMAT Focus",
  "CFA Level 1",
  "IELTS Academic",
  "TOEFL iBT",
];

// Sort entries strictly according to global priority
const getExamRank = (examName: string) => {
  const idx = GLOBAL_EXAM_PRIORITY.indexOf(examName);
  return idx === -1 ? 999 : idx;
};
entries.sort((a, b) => getExamRank(a.exam) - getExamRank(b.exam));

/**
 * Returns all taxonomy entries with their canonical names and slugs.
 */
export function getAllTaxonomyEntries(): TaxonomyEntry[] {
  return entries;
}


/**
 * Maps raw exam name to kebab-case slug.
 */
export function examToSlug(exam: string): string {
  return examSlugMap.get(exam) || slugify(exam);
}

/**
 * Resolves kebab-case slug back to authentic exam name.
 */
export function slugToExam(slug: string): string | null {
  const normalized = slug.toLowerCase().trim();
  return slugToExamMap.get(normalized) || null;
}

/**
 * Maps raw subject name to kebab-case slug.
 */
export function subjectToSlug(subject: string): string {
  return subjectSlugMap.get(subject) || slugify(subject);
}

/**
 * Resolves kebab-case slug back to authentic subject name.
 */
export function slugToSubject(slug: string): string | null {
  const normalized = slug.toLowerCase().trim();
  return slugToSubjectMap.get(normalized) || null;
}

/**
 * Maps raw domain name to kebab-case slug.
 */
export function domainToSlug(domain: string): string {
  return domainSlugMap.get(domain) || slugify(domain);
}

/**
 * Resolves kebab-case slug back to authentic domain name.
 */
export function slugToDomain(slug: string): string | null {
  const normalized = slug.toLowerCase().trim();
  return slugToDomainMap.get(normalized) || null;
}

/**
 * Resolves a triple of params (which might be slugs OR legacy decoded names)
 * into their canonical authentic database values and canonical slugs.
 */
export function resolvePracticeParams(rawExam: string, rawSubject: string, rawDomain: string): {
  isValid: boolean;
  isCanonicalSlug: boolean;
  canonicalExam: string;
  canonicalSubject: string;
  canonicalDomain: string;
  canonicalPath: string;
} {
  const decodedExam = decodeURIComponent(rawExam).trim();
  const decodedSubject = decodeURIComponent(rawSubject).trim();
  const decodedDomain = decodeURIComponent(rawDomain).trim();

  // Try matching via slug first
  let examName = slugToExam(decodedExam);
  let subjectName = slugToSubject(decodedSubject);
  let domainName = slugToDomain(decodedDomain);

  // If not found via slug, check if they passed raw names (case-insensitive)
  if (!examName) {
    for (const [canonical, slug] of examSlugMap.entries()) {
      if (canonical.toLowerCase() === decodedExam.toLowerCase()) {
        examName = canonical;
        break;
      }
    }
  }

  if (!subjectName) {
    for (const [canonical, slug] of subjectSlugMap.entries()) {
      if (canonical.toLowerCase() === decodedSubject.toLowerCase()) {
        subjectName = canonical;
        break;
      }
    }
  }

  if (!domainName) {
    for (const [canonical, slug] of domainSlugMap.entries()) {
      if (canonical.toLowerCase() === decodedDomain.toLowerCase()) {
        domainName = canonical;
        break;
      }
    }
  }

  if (!examName || !subjectName || !domainName) {
    return {
      isValid: false,
      isCanonicalSlug: false,
      canonicalExam: decodedExam,
      canonicalSubject: decodedSubject,
      canonicalDomain: decodedDomain,
      canonicalPath: `/practice/${encodeURIComponent(decodedExam)}/${encodeURIComponent(decodedSubject)}/${encodeURIComponent(decodedDomain)}`,
    };
  }

  const examSlug = examToSlug(examName);
  const subjectSlug = subjectToSlug(subjectName);
  const domainSlug = domainToSlug(domainName);
  const canonicalPath = `/practice/${examSlug}/${subjectSlug}/${domainSlug}`;

  // Check if original request path was already the canonical kebab-case slug
  const isCanonicalSlug =
    decodedExam === examSlug &&
    decodedSubject === subjectSlug &&
    decodedDomain === domainSlug;

  return {
    isValid: true,
    isCanonicalSlug,
    canonicalExam: examName,
    canonicalSubject: subjectName,
    canonicalDomain: domainName,
    canonicalPath,
  };
}
