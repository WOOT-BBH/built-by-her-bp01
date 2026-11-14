"""Instrument published core lessons without changing teaching source or saved answers."""
from pathlib import Path
import re, sys
root = Path(sys.argv[1])
pages = [root / 'index.html', *sorted(root.glob('bp*/index.html')), *sorted(root.glob('m*-l*/index.html'))]
count = 0
for page in pages:
    html = page.read_text()
    if not re.search(r'data-lesson="(?:BP-0[1-5]|M(?:0[2-9]|1[0-2])-L0[1-8])"', html):
        continue
    src = ('' if page.parent == root else '../') + 'toolkit-measurement.js?v=1'
    assert (page.parent / src.split('?')[0]).resolve().is_file(), page
    assert html.count('</body>') == 1, page
    if 'toolkit-measurement.js?v=1' not in html:
        page.write_text(html.replace('</body>', '<script src="' + src + '" defer></script>\n</body>'))
    count += 1
assert count == 80, f'Expected 80 core lessons, found {count}'
print(f'Optional measurement added to {count} published lessons; assessment excluded.')
