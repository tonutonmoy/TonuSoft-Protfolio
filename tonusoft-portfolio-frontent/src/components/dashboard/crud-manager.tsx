import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil, X, Search } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "checkbox" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[];
};

type Props = {
  table: "projects" | "services" | "products" | "careers" | "blog_posts" | "skills" | "pricing" | "categories";
  title: string;
  fields: Field[];
  displayKey: string;
  subKey?: string;
  onSaved?: () => void;
};

export function CrudManager({ table, title, fields, displayKey, subKey, onSaved }: Props) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: rows, isLoading } = useQuery({
    queryKey: [table, searchTerm],
    queryFn: async () => {
      const response = await api.get<any[]>(`/content/${table}?search=${searchTerm}`);
      return response.data;
    },
  });

  const save = useMutation({
    mutationFn: async (payload: any) => {
      if (editing?.id) {
        await api.put(`/content/${table}/${editing.id}`, payload);
      } else {
        await api.post(`/content/${table}`, payload);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      onSaved?.();
      setOpen(false);
      setEditing(null);
      toast.success("Saved");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to save"),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      await api.del(`/content/${table}/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast.success("Deleted");
    },
    onError: (e: any) => toast.error(e.message),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, any> = {};
    for (const f of fields) {
      if (f.type === "checkbox") payload[f.name] = fd.get(f.name) === "on";
      else payload[f.name] = (fd.get(f.name) as string)?.trim() || null;
    }
    save.mutate(payload);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">Manage {title.toLowerCase()} content shown on the public site.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Loading…</div>
        ) : !rows?.length ? (
          <div className="p-10 text-center text-sm text-muted-foreground">No items yet. Click “New” to add one.</div>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <div className="truncate font-medium">{r[displayKey] || "Untitled"}</div>
                  {subKey && r[subKey] && (
                    <div className="truncate text-xs text-muted-foreground">{r[subKey]}</div>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => {
                      setEditing(r);
                      setOpen(true);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-accent"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => confirm("Delete this item?") && del.mutate(r.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border text-destructive hover:bg-destructive/10"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">{editing ? "Edit" : "New"} {title.replace(/s$/, "")}</h3>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg border border-border">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      name={f.name}
                      defaultValue={editing?.[f.name] ?? ""}
                      placeholder={f.placeholder}
                      rows={4}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  ) : f.type === "checkbox" ? (
                    <label className="mt-1 inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" name={f.name} defaultChecked={editing?.[f.name] ?? true} className="h-4 w-4" />
                      {f.placeholder ?? "Yes"}
                    </label>
                  ) : f.type === "select" ? (
                    <select
                      name={f.name}
                      defaultValue={editing?.[f.name] ?? ""}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                      <option value="">Select {f.label.toLowerCase()}</option>
                      {f.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={f.name}
                      type={f.type === "url" ? "url" : "text"}
                      defaultValue={editing?.[f.name] ?? ""}
                      placeholder={f.placeholder}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  )}
                </div>
              ))}
              <button
                disabled={save.isPending}
                className="mt-2 w-full rounded-full gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
              >
                {save.isPending ? "Saving…" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
