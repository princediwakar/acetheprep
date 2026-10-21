// Path: app/landing/students/page.tsx
import { permanentRedirect } from "next/navigation";

export default function StudentsLandingRedirect() {
  permanentRedirect("/");
}
