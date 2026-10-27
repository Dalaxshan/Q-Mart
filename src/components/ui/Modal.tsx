"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/**
 * Dependency-free replacement for `react-bootstrap/Modal`.
 * Mirrors Bootstrap 5.0.2 modal behaviour (portal to <body>, fade + slide-in,
 * static-backdrop pulse, body scroll lock, focus handling) using Tailwind utilities.
 */

const ModalContext = createContext<{ onHide: () => void }>({ onHide: () => {} });

interface ModalProps {
  show: boolean;
  onHide: () => void;
  /** `false`: no backdrop click handling, `"static"`: backdrop click does not close. */
  backdrop?: boolean | "static";
  /** Close on Escape (default true). */
  keyboard?: boolean;
  /** Dialog max-width utilities (Bootstrap default: 500px from the `sm` breakpoint up). */
  maxWidthClassName?: string;
  children?: ReactNode;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function ModalRoot({
  show,
  onHide,
  backdrop = true,
  keyboard = true,
  maxWidthClassName = "sm:max-w-[500px]",
  children,
}: ModalProps) {
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // mount -> next tick fade/slide in; hide -> fade/slide out -> unmount
  useEffect(() => {
    if (show) {
      setRendered(true);
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    }
    setVisible(false);
    const t = setTimeout(() => setRendered(false), 300);
    return () => clearTimeout(t);
  }, [show]);

  // lock page scroll while open
  useEffect(() => {
    if (!rendered) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("modal-open");
    };
  }, [rendered]);

  // move focus into the dialog, restore it afterwards
  useEffect(() => {
    if (!visible) return;
    const previous = document.activeElement as HTMLElement | null;
    wrapperRef.current?.focus();
    return () => previous?.focus?.();
  }, [visible]);

  if (!rendered || typeof document === "undefined") return null;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && keyboard) {
      onHide();
      return;
    }
    if (e.key !== "Tab" || !wrapperRef.current) return;
    const items = Array.from(wrapperRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === wrapperRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || backdrop === false) return;
    if (backdrop === "static") {
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
      return;
    }
    onHide();
  };

  return createPortal(
    <ModalContext.Provider value={{ onHide }}>
      <div
        className={`fixed top-0 left-0 z-[1040] h-screen w-screen bg-[#000] transition-opacity duration-150 ease-linear motion-reduce:transition-none ${
          visible ? "opacity-50" : "opacity-0"
        }`}
      />
      <div
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={handleBackdropClick}
        className={`fixed top-0 left-0 z-[1060] h-full w-full overflow-x-hidden overflow-y-auto outline-0 [scrollbar-width:none] transition-opacity duration-150 ease-linear motion-reduce:transition-none ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`pointer-events-none relative m-[0.5rem] w-auto transition-transform duration-300 ease-[ease-out] motion-reduce:transition-none sm:mx-auto sm:my-7 ${maxWidthClassName} ${
            visible ? (pulse ? "scale-[1.02]" : "") : "-translate-y-[50px]"
          }`}
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-[0.3rem] bg-[#fff] bg-clip-padding outline-0">
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

function ModalHeader({ children, closeButton = false }: { children?: ReactNode; closeButton?: boolean }) {
  const { onHide } = useContext(ModalContext);
  return (
    <div className="flex shrink-0 items-center justify-between rounded-t-[calc(0.3rem-1px)] p-[1rem] [border-bottom:1px_solid_#dee2e6]">
      {children}
      {closeButton && (
        <button
          type="button"
          aria-label="Close"
          onClick={onHide}
          className="relative right-[21px] -mt-2 -mr-2 -mb-2 ml-auto box-content size-[1em] rounded-[0.25rem] border-0 bg-transparent p-[0.5rem] text-[#000] opacity-50 hover:opacity-75 focus:opacity-100 focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)] focus:outline-0"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="block size-full">
            <path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z" />
          </svg>
        </button>
      )}
    </div>
  );
}

const Modal = Object.assign(ModalRoot, { Header: ModalHeader });
export default Modal;
