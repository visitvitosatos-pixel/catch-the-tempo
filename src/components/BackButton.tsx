"use client";

export function BackButton({ label = "азад" }: { label?: string }) {
  return (
    <button className="btn" type="button" onClick={() => window.history.back()}>
       {label}
    </button>
  );
}
