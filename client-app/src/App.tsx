import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file) { setError("Choose a .txt file"); return; }
    setBusy(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch('/process', { method: 'POST', body: form });
      // const res = await fetch(import.meta.env.VITE_API_URL + "/process", { method: "POST", body: form });
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const cd = res.headers.get("Content-Disposition") || "";
      const match = cd.match(/filename=([^;]+)$/i);
      const filename = match?.[1] ?? "result.csv";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally { setBusy(false); }
  };

  return (
    <main style={{maxWidth:640,margin:"3rem auto",fontFamily:"system-ui"}}>
      <h1>SIM Prototype – Text Processor</h1>
      <form onSubmit={onSubmit} style={{display:"grid",gap:12}}>
        <input type="file" accept=".txt,text/plain" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button disabled={!file||busy}>{busy?"Processing…":"Process & Download"}</button>
        {error && <div style={{color:"crimson"}}>{error}</div>}
      </form>
    </main>
  );
}

export default App
