"use client";

import { useEffect } from "react";

const CARD_SELECTOR = "[data-touch-card]";
const CONTROL_SELECTOR =
  "button, input, select, textarea, [role='button'], [data-touch-card-ignore]";

function isCoarsePointer(event: PointerEvent): boolean {
  if (event.pointerType === "mouse") {
    return false;
  }

  return (
    event.pointerType === "touch" ||
    event.pointerType === "pen" ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(hover: none)").matches
  );
}

function getActiveCard(): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    `${CARD_SELECTOR}[data-touch-card-active="true"]`
  );
}

function clearActiveCard(): void {
  getActiveCard()?.removeAttribute("data-touch-card-active");
}

function setActiveCard(card: HTMLElement): void {
  const activeCard = getActiveCard();

  if (activeCard && activeCard !== card) {
    activeCard.removeAttribute("data-touch-card-active");
  }

  card.setAttribute("data-touch-card-active", "true");
}

export function TouchCardActivation() {
  useEffect(() => {
    function handlePointerUp(event: PointerEvent) {
      if (!isCoarsePointer(event)) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        clearActiveCard();
        return;
      }

      const card = target.closest<HTMLElement>(CARD_SELECTOR);
      const activeCard = getActiveCard();
      const control = target.closest<HTMLElement>(CONTROL_SELECTOR);

      if (control) {
        if (activeCard && (!card || activeCard !== card)) {
          clearActiveCard();
        }
        return;
      }

      if (!card) {
        clearActiveCard();
        return;
      }

      if (activeCard === card) {
        card.removeAttribute("data-touch-card-active");
        return;
      }

      setActiveCard(card);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        clearActiveCard();
      }
    }

    document.addEventListener("pointerup", handlePointerUp, { capture: true });
    document.addEventListener("pointercancel", clearActiveCard, { capture: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerup", handlePointerUp, { capture: true });
      document.removeEventListener("pointercancel", clearActiveCard, { capture: true });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
