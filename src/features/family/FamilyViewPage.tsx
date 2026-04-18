import { memo, useCallback, useState } from "react";
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  Heart,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  X,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { PageHeader, PageShell } from "@/layouts/page-shell";
import { FAMILY_TIMELINE, INITIAL_CONTACTS } from "./family-data";
import type { FamilyContact } from "./family-types";

export function FamilyViewPage() {
  const [contacts, setContacts] = useState<FamilyContact[]>(INITIAL_CONTACTS);
  const [drawer, setDrawer] = useState(false);
  const [form, setForm] = useState({ name: "", relation: "", phone: "", email: "" });
  const [expanded, setExpanded] = useState<number | null>(null);

  const addContact = useCallback(() => {
    if (!form.name) return;
    const initials = form.name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    setContacts((c) => [...c, { ...form, initials, alertOn: true }]);
    setForm({ name: "", relation: "", phone: "", email: "" });
    setDrawer(false);
  }, [form]);

  const toggleAlert = useCallback((i: number) => {
    setContacts((c) => c.map((x, idx) => (idx === i ? { ...x, alertOn: !x.alertOn } : x)));
  }, []);

  const remove = useCallback((i: number) => {
    setContacts((c) => c.filter((_, idx) => idx !== i));
  }, []);

  return (
    <PageShell maxWidth="wide">
      <PageHeader
        badge="Family Circle"
        title={
          <>
            Stay connected to <em className="text-primary">Margaret&apos;s care</em>
          </>
        }
        description="Patient summary, emergency contacts and recent alerts."
      />

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-5 lg:gap-6">
        <div className="space-y-5 lg:col-span-2">
          <div className="animate-fade-in rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-7">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary-gradient font-display text-3xl text-primary-foreground shadow-soft">
                MT
              </div>
              <h2 className="mt-4 font-display text-2xl">Margaret Thompson, 72</h2>
              <p className="text-sm text-muted-foreground">🇬🇧 Manchester, United Kingdom</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  Hypertension
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  Type 2 Diabetes
                </span>
              </div>
              <span className="mt-4 rounded-full bg-warning/15 px-4 py-1.5 text-sm font-semibold text-warning">
                MEDIUM RISK
              </span>
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-6">
              <FamilyStat icon={Activity} label="Blood Pressure" value="142/91 mmHg" tone="warn" />
              <FamilyStat icon={Heart} label="Heart Rate" value="78 bpm" tone="ok" />
              <FamilyStat icon={CheckCircle2} label="Glucose" value="5.4 mmol/L" tone="ok" />
            </div>

            <a
              href="tel:+447700900000"
              className="btn-press mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-success py-3 font-medium text-success-foreground transition hover:opacity-95"
            >
              <Phone className="h-4 w-4" /> Call Margaret
            </a>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-3">
          <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  Emergency Contacts
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {contacts.length} people on the list
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="btn-press flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-primary-gradient px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft sm:w-auto"
              >
                <Plus className="h-4 w-4" /> Add Contact
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {contacts.map((c, i) => (
                <div
                  key={`${c.email}-${i}`}
                  className="animate-fade-in flex flex-col gap-3 rounded-2xl border border-border p-4 transition hover:border-primary/40 sm:flex-row sm:flex-wrap sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                      {c.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">
                        {c.name}{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          — {c.relation}
                        </span>
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3 shrink-0" /> {c.phone}
                        </span>
                        <span className="hidden sm:inline">·</span>
                        <span className="wrap-break-word">{c.email}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:ml-auto sm:justify-end">
                    <label className="flex cursor-pointer items-center gap-2 text-xs">
                      <span
                        className={`relative h-5 w-9 rounded-full transition ${c.alertOn ? "bg-success" : "bg-muted"}`}
                      >
                        <span
                          className={`absolute top-0.5 ${c.alertOn ? "left-[18px]" : "left-0.5"} h-4 w-4 rounded-full bg-white shadow transition-all`}
                        />
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={c.alertOn}
                        onChange={() => toggleAlert(i)}
                      />
                      <span className="font-medium">{c.alertOn ? "Alert Active" : "Muted"}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="text-xs text-muted-foreground transition hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Alert History for Family
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">All notifications sent</p>
            <div className="relative mt-6">
              <div className="absolute bottom-2 left-[19px] top-2 w-px bg-border" />
              <ul className="space-y-5">
                {FAMILY_TIMELINE.map((t, i) => (
                  <li
                    key={t.time}
                    className="relative animate-fade-in pl-12"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div
                      className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-card"
                      style={{ borderColor: t.color }}
                    >
                      <t.icon className="h-4 w-4" style={{ color: t.color }} />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{t.time}</span>
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        className="flex w-full items-start justify-between gap-3 text-left"
                      >
                        <div className="min-w-0">
                          <p className="mt-0.5 font-medium">{t.title}</p>
                          <p className="text-sm text-muted-foreground">{t.desc}</p>
                        </div>
                        <ChevronDown
                          className={`mt-1.5 h-4 w-4 shrink-0 transition-transform ${expanded === i ? "rotate-180" : ""}`}
                        />
                      </button>
                      {expanded === i && (
                        <div className="mt-3 animate-fade-in rounded-xl bg-muted/50 p-3 text-sm italic text-muted-foreground">
                          &ldquo;{t.full}&rdquo;
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {drawer ? (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            aria-label="Close"
            className="animate-fade-in flex-1 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
          />
          <div className="animate-slide-in-right flex h-full w-full max-w-full flex-col bg-card shadow-card sm:max-w-md">
            <div className="flex items-center justify-between border-b border-border p-5 sm:p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  New Contact
                </p>
                <h3 className="mt-1 font-display text-2xl">Add to circle</h3>
              </div>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="btn-press flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
              <ContactField
                label="Full name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="James Thompson"
              />
              <ContactField
                label="Relationship"
                value={form.relation}
                onChange={(v) => setForm({ ...form, relation: v })}
                placeholder="Son, Daughter, GP…"
              />
              <ContactField
                label="WhatsApp number"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="+44 7700 900000"
              />
              <ContactField
                label="Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="name@example.com"
              />
            </div>
            <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:p-6">
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="btn-press min-h-11 flex-1 rounded-xl border border-border py-3 text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addContact}
                disabled={!form.name}
                className="btn-press min-h-11 flex-1 rounded-xl bg-primary-gradient py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-95 disabled:opacity-50"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

const FamilyStat = memo(function FamilyStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "ok" | "warn";
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone === "warn" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
      <Mail className="h-4 w-4 shrink-0 text-muted-foreground/40" />
    </div>
  );
});

const ContactField = memo(function ContactField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
});
