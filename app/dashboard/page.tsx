// Path: app/dashboard/page.tsx
import { permanentRedirect } from "next/navigation";

export type {
  DashboardPageData,
  SyllabusSubject,
  SyllabusDomain,
} from "@/app/home/page";

export default function DashboardRedirect() {
  permanentRedirect("/home");
}
