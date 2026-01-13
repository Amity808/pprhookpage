"use client";

import { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    // Check if fonts are already loaded
    if (document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
      return;
    }

    // Create and append preconnect links
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "";
    document.head.appendChild(preconnect2);

    // Create and append Inter font
    const interFont = document.createElement("link");
    interFont.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
    interFont.rel = "stylesheet";
    document.head.appendChild(interFont);

    // Create and append Material Symbols font
    const materialFont = document.createElement("link");
    materialFont.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
    materialFont.rel = "stylesheet";
    document.head.appendChild(materialFont);
  }, []);

  return null;
}

