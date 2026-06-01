"use client";

import { useState } from "react";

export function useLandingFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return { openIdx, toggle };
}
