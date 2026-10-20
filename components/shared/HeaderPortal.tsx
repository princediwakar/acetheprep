// Path: components/shared/HeaderPortal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface HeaderPortalProps {
  children: React.ReactNode;
  targetId?: string;
}

export function HeaderPortal({
  children,
  targetId = "header-actions-portal",
}: HeaderPortalProps) {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(() => {
    if (typeof document !== "undefined") {
      return document.getElementById(targetId);
    }
    return null;
  });

  useEffect(() => {
    if (!targetElement && typeof document !== "undefined") {
      const el = document.getElementById(targetId);
      if (el) setTargetElement(el);
    }
  }, [targetId, targetElement]);

  if (!targetElement) return null;
  return createPortal(children, targetElement);
}
