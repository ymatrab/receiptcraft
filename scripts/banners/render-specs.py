"""Render every spec in specs-*.json to <scratch>/<slug>.png with headless Chrome.
usage: python3 render-specs.py OUTDIR [slug ...]"""
import base64, glob, json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]; only = set(sys.argv[2:])
chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for f in sorted(glob.glob(os.path.join(here, "specs-*.json"))):
    for spec in json.load(open(f)):
        if only and spec["slug"] not in only: continue
        h = base64.b64encode(json.dumps(spec).encode()).decode()
        png = os.path.join(out, spec["slug"] + ".png")
        if os.path.exists(png): os.remove(png)
        subprocess.run([chrome, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1408,768",
                        "--virtual-time-budget=3000", f"--screenshot={png}", f"file://{here}/spec-banner.html#{h}"],
                       stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
        print(spec["slug"], os.path.exists(png))
