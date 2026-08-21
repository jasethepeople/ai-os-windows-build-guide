import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Category = "build" | "launch" | "integration" | "documentation" | "other";
type Severity = "low" | "normal" | "high" | "critical";

const initialForm = {
  category: "build" as Category,
  severity: "normal" as Severity,
  title: "",
  description: "",
  reproductionSteps: "",
  environmentDetails: "",
  commandUsed: "",
  contactEmail: "",
  consent: false,
};

export default function BugReportForm() {
  const [form, setForm] = useState(initialForm);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const submitReport = trpc.bugReports.submit.useMutation({
    onSuccess: result => {
      setReferenceCode(result.referenceCode);
      setForm(initialForm);
    },
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm(current => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReferenceCode(null);
    submitReport.mutate({
      category: form.category,
      severity: form.severity,
      title: form.title,
      description: form.description,
      reproductionSteps: form.reproductionSteps.trim() || undefined,
      environmentDetails: form.environmentDetails.trim() || undefined,
      commandUsed: form.commandUsed.trim() || undefined,
      contactEmail: form.contactEmail.trim(),
      consent: form.consent,
    });
  };

  if (referenceCode) {
    return (
      <div className="bug-success" role="status" aria-live="polite">
        <div className="bug-success__icon"><CheckCircle2 size={28} /></div>
        <div>
          <span className="card-label">Report received</span>
          <h3>Thank you for sending a useful report.</h3>
          <p>Your reference code is <code>{referenceCode}</code>. Keep it if you need to follow up about this issue.</p>
        </div>
        <button className="bug-secondary-action" type="button" onClick={() => setReferenceCode(null)}>Submit another report</button>
      </div>
    );
  }

  return (
    <form className="bug-form" onSubmit={submit} noValidate>
      <div className="bug-form__grid bug-form__grid--compact">
        <label className="form-field">
          <span>Issue category <b>*</b></span>
          <select value={form.category} onChange={event => update("category", event.target.value as Category)}>
            <option value="build">Build or packaging</option>
            <option value="launch">Launch or runtime</option>
            <option value="integration">Integration</option>
            <option value="documentation">Documentation</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="form-field">
          <span>Severity <b>*</b></span>
          <select value={form.severity} onChange={event => update("severity", event.target.value as Severity)}>
            <option value="low">Low — minor inconvenience</option>
            <option value="normal">Normal — blocks one task</option>
            <option value="high">High — blocks a core workflow</option>
            <option value="critical">Critical — no workaround</option>
          </select>
        </label>
      </div>

      <label className="form-field">
        <span>Short issue title <b>*</b></span>
        <Input value={form.title} onChange={event => update("title", event.target.value)} placeholder="Example: PyInstaller cannot locate the application module" minLength={8} maxLength={180} required />
      </label>

      <label className="form-field">
        <span>What happened? <b>*</b></span>
        <Textarea value={form.description} onChange={event => update("description", event.target.value)} placeholder="Describe the problem, the expected result, and the actual result. Include the first useful error message if one appears." minLength={30} maxLength={6000} required rows={6} />
        <small>Minimum 30 characters. Do not include passwords, access tokens, private keys, or other credentials.</small>
      </label>

      <div className="bug-form__grid">
        <label className="form-field">
          <span>Steps to reproduce</span>
          <Textarea value={form.reproductionSteps} onChange={event => update("reproductionSteps", event.target.value)} placeholder="1. Extract the ZIP…\n2. Run…\n3. Observe…" maxLength={6000} rows={5} />
        </label>
        <div className="bug-form__diagnostics">
          <label className="form-field">
            <span>Environment details</span>
            <Input value={form.environmentDetails} onChange={event => update("environmentDetails", event.target.value)} placeholder="Windows version, Python version, hardware" maxLength={1000} />
          </label>
          <label className="form-field">
            <span>Command used</span>
            <Input value={form.commandUsed} onChange={event => update("commandUsed", event.target.value)} placeholder="pyinstaller ai_os.spec" maxLength={2000} />
          </label>
          <label className="form-field">
            <span>Contact email <em>(optional)</em></span>
            <Input type="email" value={form.contactEmail} onChange={event => update("contactEmail", event.target.value)} placeholder="you@example.com" maxLength={320} />
          </label>
        </div>
      </div>

      <label className="privacy-check">
        <input type="checkbox" checked={form.consent} onChange={event => update("consent", event.target.checked)} />
        <span><ShieldCheck size={17} /> I confirm this report does not include passwords, tokens, private keys, or other sensitive credentials. <b>*</b></span>
      </label>

      {submitReport.error ? <p className="bug-form__error" role="alert">{submitReport.error.message}</p> : null}

      <div className="bug-form__footer">
        <p>Reports are saved with a reference code. A contact email is optional and is used only if follow-up is needed.</p>
        <button className="bug-submit" type="submit" disabled={submitReport.isPending}>
          {submitReport.isPending ? <Loader2 size={17} className="spin" /> : <Send size={17} />}
          {submitReport.isPending ? "Sending report…" : "Submit bug report"}
        </button>
      </div>
    </form>
  );
}
