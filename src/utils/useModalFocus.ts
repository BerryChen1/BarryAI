import { useEffect, useRef, type RefObject } from 'react';

const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, video[controls], [tabindex]:not([tabindex="-1"])';

type ModalEntry = {
  dialog: HTMLElement;
  priority: number;
  previousFocus: HTMLElement | null;
  focusFirst: () => void;
};

const modalStack = new Set<ModalEntry>();
const originalInert = new Map<HTMLElement, boolean>();
let topModal: ModalEntry | null = null;
let sessionReturnFocus: HTMLElement | null = null;

// One owner recomputes inert state for the top dialog. Independent saved boolean
// values break when an outer dialog closes before an exiting child is unmounted.
function syncModalStack() {
  for (const [element, previous] of originalInert) element.inert = previous;
  originalInert.clear();

  topModal = null;
  for (const entry of modalStack) {
    if (!entry.dialog.isConnected) continue;
    if (!topModal || entry.priority > topModal.priority || (
      entry.priority === topModal.priority &&
      (topModal.dialog.contains(entry.dialog) || (
        !entry.dialog.contains(topModal.dialog) &&
        Boolean(topModal.dialog.compareDocumentPosition(entry.dialog) & Node.DOCUMENT_POSITION_FOLLOWING)
      ))
    )) {
      topModal = entry;
    }
  }

  if (!topModal) return;
  let branch: HTMLElement = topModal.dialog;
  while (branch.parentElement) {
    for (const sibling of branch.parentElement.children) {
      if (sibling !== branch && sibling instanceof HTMLElement) {
        originalInert.set(sibling, sibling.inert);
        sibling.inert = true;
      }
    }
    if (branch.parentElement === document.body) break;
    branch = branch.parentElement;
  }
}

export function useModalFocus(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void, priority = 300) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const dialog: HTMLElement | null = ref.current;
    if (!active || !dialog) return;
    const available = (element: HTMLElement) => !element.closest('[inert]') && element.getClientRects().length > 0;
    const focusable = () => Array.from<HTMLElement>(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(available);
    const entry: ModalEntry = {
      dialog,
      priority,
      previousFocus: document.activeElement instanceof HTMLElement ? document.activeElement : null,
      focusFirst: () => {
        if (topModal !== entry || !dialog.isConnected || dialog.closest('[inert]')) return;
        const closeButton = dialog.querySelector<HTMLElement>('[data-modal-close]');
        const target = closeButton && available(closeButton) ? closeButton : focusable()[0] ?? dialog;
        target.focus({ preventScroll: true });
      },
    };
    if (modalStack.size === 0) sessionReturnFocus = entry.previousFocus;
    modalStack.add(entry);
    syncModalStack();
    const frame = requestAnimationFrame(entry.focusFirst);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || topModal !== entry || dialog.closest('[inert]')) return;
      if (event.key === 'Escape' && !document.fullscreenElement) {
        event.preventDefault();
        event.stopPropagation();
        closeRef.current();
      } else if (event.key === 'Tab') {
        const items = focusable();
        const first = items[0];
        const last = items[items.length - 1];
        if (!first) {
          event.preventDefault();
          dialog.focus();
        } else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (topModal === entry && event.target instanceof Node && !dialog.contains(event.target)) entry.focusFirst();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      const wasTop = topModal === entry;
      modalStack.delete(entry);
      // Preserve the opener when an outer dialog exits before its child.
      for (const remaining of modalStack) {
        if (remaining.previousFocus && dialog.contains(remaining.previousFocus)) {
          remaining.previousFocus = entry.previousFocus;
        }
      }
      syncModalStack();
      if (modalStack.size === 0) {
        if (sessionReturnFocus?.isConnected && !sessionReturnFocus.closest('[inert]')) {
          sessionReturnFocus.focus({ preventScroll: true });
        }
        sessionReturnFocus = null;
        return;
      }
      if (!wasTop) return;

      const previous = entry.previousFocus;
      if (previous?.isConnected && !previous.closest('[inert]') && (!topModal || topModal.dialog.contains(previous))) {
        previous.focus({ preventScroll: true });
      } else {
        topModal?.focusFirst();
      }
    };
  }, [active, ref, priority]);
}
