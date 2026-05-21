"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrollt bei jedem Routenwechsel an den Seitenanfang.
 * Verwendet Lenis (window.__lenis) wenn verfügbar, sonst nativen Scroll.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
