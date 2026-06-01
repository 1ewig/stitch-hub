"use client";

import { useState } from "react";

export function useLandingProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return { activeStep, setActiveStep };
}
