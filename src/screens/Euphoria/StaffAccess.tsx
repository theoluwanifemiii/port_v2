import { FC, FormEvent, useState } from "react";
import { api, convex, isUnauthorized, useLive, useStaffKey } from "./backend";
import { IMG } from "./theme";

export type StaffStatus = "offline" | "checking" | "needPin" | "ready";

/**
 * Whether a staff screen runs on the live backend, and with which PIN.
 * - offline: no backend (not configured or not deployed yet): use sample data
 * - needPin: backend is up; ask for the staff PIN
 * - ready:   PIN accepted
 */
export function useStaffAccess(demo = false) {
  const [key, setKey] = useStaffKey();
  const useBackend = !!convex && !demo;
  // Any public function tells us the backend is deployed.
  const probe = useLive(api.euphoria.getTable, useBackend ? { table: "0" } : "skip");
  const deployed = useBackend && !probe.error;
  const check = useLive(api.euphoria.checkStaffKey, deployed && key ? { key } : "skip");

  let status: StaffStatus;
  let message = "";
  if (!useBackend || probe.error) status = "offline";
  else if (probe.data === undefined && !probe.error) status = "checking";
  else if (!key) status = "needPin";
  else if (check.error) {
    status = "needPin";
    message = isUnauthorized(check.error)
      ? "That PIN didn't work. Try again."
      : "Staff access isn't set up yet. Set EUPHORIA_STAFF_KEY on the Convex deployment.";
  } else status = check.data ? "ready" : "checking";

  return { status, key, message, setKey, signOut: () => setKey("") };
}

export const PinScreen: FC<{ title: string; message: string; onSubmit: (pin: string) => void; className?: string }> = ({
  title,
  message,
  onSubmit,
  className = "min-h-[100dvh] w-full",
}) => {
  const [pin, setPin] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (pin.trim()) onSubmit(pin.trim());
  };
  return (
    <div className={`eu-light flex items-center justify-center bg-eu-ivory p-6 font-eu-sans text-eu-black ${className}`}>
      <form onSubmit={submit} className="flex w-full max-w-[360px] flex-col items-center gap-5 text-center">
        <img src={IMG.mark} alt="" aria-hidden="true" className="h-[46px] w-12" />
        <div className="font-eu-display text-[11px] tracking-[0.32em] text-eu-claret">EUPHORIA STAFF</div>
        <h1 className="m-0 font-eu-display text-[28px] font-normal tracking-[0.05em]">{title}</h1>
        <div className="flex w-full flex-col gap-1 text-left">
          <label htmlFor="eu-staff-pin" className="text-[11px] font-medium tracking-[0.16em] text-eu-muted">
            STAFF PIN
          </label>
          <input
            id="eu-staff-pin"
            type="password"
            autoComplete="current-password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="h-12 border-0 border-b border-solid border-[#8C877C] bg-transparent p-0 font-eu-sans text-lg outline-none"
          />
        </div>
        {message && (
          <p role="alert" className="m-0 text-sm text-eu-claret">
            {message}
          </p>
        )}
        <button
          type="submit"
          className="h-[52px] w-full cursor-pointer border-none bg-eu-green text-xs font-medium tracking-[0.22em] text-eu-ivory"
        >
          CONTINUE
        </button>
      </form>
    </div>
  );
};

export const Connecting: FC<{ className?: string }> = ({ className = "min-h-[100dvh] w-full" }) => (
  <div className={`flex items-center justify-center bg-eu-ivory font-eu-serif text-lg italic text-eu-muted ${className}`}>Connecting…</div>
);
