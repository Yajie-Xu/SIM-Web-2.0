import { useState } from 'react'
import { API_URL } from './api' // or './util' if that's where your constant lives

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setFile(e.target.files?.[0] || null)
  }

  const onDrop: React.DragEventHandler<HTMLLabelElement> = e => {
    e.preventDefault()
    setError(null)
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!file) { setError('Choose a .txt file'); return }
    setBusy(true)
    try {
      const form = new FormData()
      form.append('file', file)

      const res = await fetch(`${API_URL}/process`, { method: 'POST', body: form })
      if (!res.ok) {
        const msg = await res.text().catch(() => '')
        throw new Error(msg || `Upload failed (HTTP ${res.status})`)
      }

      const blob = await res.blob()
      const cd = res.headers.get('Content-Disposition') || ''
      const match = cd.match(/filename=\"?([^\";]+)\"?/i)
      const filename = match?.[1] ?? 'result.csv'

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove()
      URL.revokeObjectURL(url)
    } catch (err: any) {
      setError(err?.message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>SIM Prototype – Text Processor</h1>
        <p className="sub">Upload a UTF-8 .txt file. We’ll process it and return a downloadable result.</p>
      </header>

      <form className="card" onSubmit={onSubmit}>
        <label
          className={`file-drop ${file ? 'has-file' : ''}`}
          htmlFor="fileInput"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <div className="file-drop-inner">
            <strong>{file ? file.name : 'Drag & drop your .txt here'}</strong>
            <span>or click to choose</span>
          </div>
          <input id="fileInput" type="file" accept=".txt,text/plain" onChange={handleBrowse} hidden />
        </label>

        <button className="primary" disabled={!file || busy}>
          {busy ? 'Processing…' : 'Process & Download'}
        </button>

        <div className="hint">Only .txt files. Max a few MB for now.</div>
        {error && <div className="error" role="alert">{error}</div>}
      </form>

      <footer className="footer">SIM • Week 1 demo</footer>
    </div>
  )
}

export default App