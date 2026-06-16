# Session Learnings — jun-ai-d Project

Durable, non-obvious findings captured from live sessions. Each entry states the root cause and the
verified fix so future work can skip the diagnosis dead-ends.

---

## Windows Environment & Permissions (CHORUS domain, Windows Server 2019)

### Elevated Claude session creates Admin-owned files
The Claude Code session runs **elevated** (High integrity, BUILTIN\Administrators enabled). Files it
creates via the Write tool are owned by **BUILTIN\Administrators** — Windows default-owner policy for
elevated admin processes — NOT the individual user (CHORUS\jshaik).

**Why a second non-elevated Claude session gets read-only access:** a non-elevated process running as
the same user has its Administrators membership **filtered (deny-only)**. On Admin-owned files it only
receives `BUILTIN\Users:(RX)` = read-only. Running `icacls /grant` from that session fails with
"Access is denied" because you need owner or admin rights to edit a DACL.

**Fix:** from the elevated session, grant the user an explicit Modify ACE:
```
icacls <path> /grant "CHORUS\jshaik:(OI)(CI)M" /T
```
Or keep both sessions at the same elevation level.

**Red herring:** `CHORUS\JJohn` appearing in ACLs is an inherited Full-Control ACE because
`E:\Projects` is owned by JJohn. It is unrelated to the per-file permission problem.

---

## Git on Windows

### ACL inheritance removal silently breaks Git (`/inheritance:r`)
Running `icacls <repo> /inheritance:r` (protected DACL — strips inherited ACEs) makes Git report:
```
fatal: not a git repository
```
even when the current user is the owner AND `git config --global --add safe.directory '*'` is set.
`safe.directory` does **not** fix this. Root cause: Git's internal path/stat logic fails when the
folder's security descriptor loses the standard inherited entries.

**Fix:** re-enable inheritance:
```
icacls <repo> /inheritance:e /T /C
```
Git works again immediately after.

**Implication:** you cannot lock down a Git working folder using ACL inheritance removal alone.
Alternatives that keep Git working:
- **EFS encryption** (`cipher /e`) — encrypts contents, preserves normal ACLs.
- **Relocate** the repo under a path whose inherited ACL already excludes other users (e.g.
  `C:\Users\<user>\`).

### `icacls /setowner` can trigger Git's dubious-ownership guard
Changing a repo directory's owner may cause Git to refuse the repo until the path is added to the
global safe-directory list:
```
git config --global --add safe.directory '<absolute-path>'
```

---

## Tooling Gotchas

### Bash tool mangles `icacls` flags via MSYS path translation
Running `icacls "<path>" /grant ...` inside the Bash tool silently converts `/grant` to a POSIX path
(`C:/Program Files/Git/grant`), producing "Invalid parameter" errors.

**Fix: always run `icacls` (and any Windows tool that uses `/flag` style args) via the PowerShell
tool, not the Bash tool.**

### docx → PDF conversion and page counting
- LibreOffice location: `C:\Program Files\LibreOffice\program\soffice.exe`
- Convert command:
  ```
  soffice --headless --convert-to pdf --outdir <ABSOLUTE_WINDOWS_PATH> file.docx
  ```
  Use an **absolute Windows path** for `--outdir`, NOT `/tmp` — MSYS `/tmp` breaks Python `open()`.
- Count PDF pages by regex over raw bytes: pattern `/Type\s*/Page[^s]` (matches each `Page` dict
  object, excludes `Pages` root node).
- The Read tool can open the resulting PDF to view pages visually.

---

## Project Conventions

### CV typography — anti-AI-tells rule
Generated CV/docx must contain **none** of: em-dash (—), en-dash (–), arrow (→), middot (·).

Use instead: commas, colons, periods, ` | ` separators, "to" for ranges, "plus" for "+".

Verify by inspecting `word/document.xml` inside the docx zip (it is a plain-text XML file) and
counting those characters. The CV generator lives at `E:\Projects\junaid\build_cv.js` (produces a
2-page and a 3-page output).

### Theming system — semantic classes only, never hard-coded colors
Light/dark is managed by `next-themes` (`attribute="class"`, default dark):
- Provider: `components/Providers.tsx`
- Toggle: `ThemeToggle.tsx`
- Tokens: `app/globals.css` — `:root` = dark palette, `html.light` = light palette
- Tailwind mapping: `tailwind.config.ts` uses `rgb(var(--x) / <alpha-value>)` pattern

**Always use semantic utility classes:**
| Use | Never use |
|-----|-----------|
| `text-fg`, `text-body`, `text-muted` | `text-white`, `#hex` |
| `bg-bg`, `bg-surface` | `bg-ink` |
| `border-line` | hard-coded border colors |
| `text-onaccent`, `text-mint`, `text-teal-200/300` | raw Tailwind color names |

Hard-coding colors breaks light mode silently.

`app/opengraph-image.tsx` is intentionally fixed-dark and is exempt from this rule.
