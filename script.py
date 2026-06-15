import sys, os
import subprocess

try:
    import pypdf
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

docs_dir = r"c:\Users\shiva\Desktop\14-st\docs"
out_file = r"c:\Users\shiva\Desktop\14-st\docs_content.txt"

with open(out_file, "w", encoding="utf-8") as out:
    for f in os.listdir(docs_dir):
        if f.endswith(".pdf"):
            out.write(f"--- {f} ---\n")
            pdf_path = os.path.join(docs_dir, f)
            try:
                reader = pypdf.PdfReader(pdf_path)
                for page in reader.pages:
                    text = page.extract_text()
                    if text:
                        out.write(text + "\n")
            except Exception as e:
                out.write(f"Error reading {f}: {e}\n")
            out.write("\n\n")

print("Finished extracting docs_content.txt")
