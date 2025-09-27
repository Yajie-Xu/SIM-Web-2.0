# processors/week1_wordfreq.py
import csv, io, re
from collections import Counter

def wordfreq_csv(text: str) -> bytes:
    words = re.findall(r"[A-Za-z0-9']+", text.lower())
    counts = Counter(words)
    buf = io.StringIO()
    w = csv.writer(buf)
    w.writerow(["word", "count"])
    for word, c in counts.most_common():
        w.writerow([word, c])
    return buf.getvalue().encode("utf-8")