#!/usr/bin/env python3
"""Generate catalog-style SVG product visualizations for Baudienst Schleifsegmente."""
from pathlib import Path

OUT = Path(__file__).parent.parent / "assets" / "products"

DEFS = """<defs>
  <radialGradient id="plate" cx="50%" cy="42%" r="62%">
    <stop offset="0%" stop-color="#7A7A7A"/>
    <stop offset="55%" stop-color="#3F3F3F"/>
    <stop offset="100%" stop-color="#1A1A1A"/>
  </radialGradient>
  <linearGradient id="hub" x1="20%" y1="20%" x2="80%" y2="80%">
    <stop offset="0%" stop-color="#5A5A5A"/>
    <stop offset="100%" stop-color="#0D0D0D"/>
  </linearGradient>
  <radialGradient id="adpPlate" cx="40%" cy="35%" r="75%">
    <stop offset="0%" stop-color="#A5A5A5"/>
    <stop offset="70%" stop-color="#5C5C5C"/>
    <stop offset="100%" stop-color="#2A2A2A"/>
  </radialGradient>
  <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
    <feOffset dx="0" dy="6" result="off"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>"""

# 3-block diamond segment at 0/120/240 deg
def seg_block(color, count=3):
    if count == 3:
        return f"""<g filter="url(#dropshadow)">
    <rect x="190" y="55" width="20" height="48" rx="3" fill="{color}"/>
    <rect x="190" y="55" width="20" height="48" rx="3" fill="{color}" transform="rotate(120 200 200)"/>
    <rect x="190" y="55" width="20" height="48" rx="3" fill="{color}" transform="rotate(240 200 200)"/>
  </g>"""
    elif count == 5:
        return "".join([
            f'<rect x="190" y="55" width="20" height="48" rx="3" fill="{color}" transform="rotate({i*72} 200 200)" filter="url(#dropshadow)"/>'
            for i in range(5)
        ])

def dome_block(color):
    """T-REX DOME style — rounded top PCD blocks."""
    return f"""<g filter="url(#dropshadow)">
    <path d="M 184 110 L 184 60 Q 200 50 216 60 L 216 110 Z" fill="{color}"/>
    <path d="M 184 110 L 184 60 Q 200 50 216 60 L 216 110 Z" fill="{color}" transform="rotate(120 200 200)"/>
    <path d="M 184 110 L 184 60 Q 200 50 216 60 L 216 110 Z" fill="{color}" transform="rotate(240 200 200)"/>
  </g>"""

def segment_svg(brand, code, color, accent, mode="standard"):
    if mode == "dome":
        blocks = dome_block(color)
    elif mode == "five":
        blocks = seg_block(color, count=5)
    else:
        blocks = seg_block(color)

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="{brand} {code}">
  {DEFS}
  <rect width="400" height="400" fill="#F5F5F5"/>
  <ellipse cx="200" cy="350" rx="120" ry="14" fill="rgba(0,0,0,0.18)"/>
  <circle cx="200" cy="200" r="155" fill="url(#plate)" filter="url(#dropshadow)"/>
  <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
  {blocks}
  <circle cx="200" cy="200" r="48" fill="url(#hub)"/>
  <circle cx="200" cy="200" r="48" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <circle cx="200" cy="200" r="22" fill="#0A0A0A"/>
  <circle cx="200" cy="200" r="22" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <rect x="60" y="318" width="280" height="3" fill="{accent}"/>
  <text x="200" y="354" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="24" fill="#0D0D0D" letter-spacing="0.04em">{code}</text>
  <text x="200" y="378" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="600" font-size="11" fill="#666" letter-spacing="0.22em">{brand.upper()}</text>
</svg>"""

def adapter_svg(brand, code, label, cols, rows, accent, hard=False):
    """Square baseplate with grid of mounting positions."""
    plate_fill = "url(#adpPlate)" if not hard else "url(#hub)"
    holes = []
    # spread cols x rows holes in a 240x240 area centered at 200,180
    grid_w, grid_h = 220, 160
    if rows == 2:
        grid_h = 100
    x0 = 200 - grid_w/2
    y0 = 180 - grid_h/2
    for r in range(rows):
        for c in range(cols):
            cx = x0 + (c * grid_w/(cols-1) if cols > 1 else 0)
            cy = y0 + (r * grid_h/(rows-1) if rows > 1 else 0)
            holes.append(f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="14" fill="#0A0A0A"/>')
            holes.append(f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="14" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>')
    holes_svg = "\n  ".join(holes)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="{brand} {code}">
  {DEFS}
  <rect width="400" height="400" fill="#F5F5F5"/>
  <ellipse cx="200" cy="320" rx="130" ry="12" fill="rgba(0,0,0,0.15)"/>
  <rect x="60" y="70" width="280" height="230" rx="18" fill="{plate_fill}" filter="url(#dropshadow)"/>
  <rect x="60" y="70" width="280" height="230" rx="18" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
  {holes_svg}
  <rect x="60" y="318" width="280" height="3" fill="{accent}"/>
  <text x="200" y="354" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="20" fill="#0D0D0D" letter-spacing="0.02em">{label}</text>
  <text x="200" y="378" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="600" font-size="11" fill="#666" letter-spacing="0.22em">{brand.upper()}</text>
</svg>"""

# Brand red from CI
RED = "#D62E20"

# Schleifsegmente
SEGS = [
    ("ez-h",        "ELITE-GRIND",  "EZ H",            "#5C5C5C", "#888"),
    ("ez-s",        "ELITE-GRIND",  "EZ S",            "#1E5BBF", "#3A78D9"),
    ("ez-x",        "ELITE-GRIND",  "EZ X",            "#8B1810", "#C2362A"),
    ("ez-sharxx",   "ELITE-GRIND",  "EZ SHARXX",       "#0D0D0D", RED),
    ("ez-m",        "ELITE-GRIND",  "EZ M",            "#7A7A7A", "#A5A5A5"),
    ("vari-grind-sl","VARI-GRIND",  "EZ SL",           "#2D8540", "#4FA563"),
]

for slug, brand, code, blockcol, accent in SEGS:
    (OUT / f"{slug}.svg").write_text(segment_svg(brand, code, blockcol, accent))

# T-REX (PCD) - special shapes
(OUT / "t-rex-dome.svg").write_text(segment_svg("ELITE-GRIND", "T-REX DOME", "#B8862F", "#D8A045", mode="dome"))
(OUT / "t-rex-super.svg").write_text(segment_svg("ELITE-GRIND", "T-REX SUPER", "#8B5A1A", "#C2742E", mode="five"))

# Adapter und Werkzeughalter
(OUT / "adapter-multi-400-9.svg").write_text(adapter_svg("HUSQVARNA", "ADP-400-9", "ADAPTER 400 / 9 POS", 3, 3, RED, hard=False))
(OUT / "adapter-multi-280-6.svg").write_text(adapter_svg("HUSQVARNA", "ADP-280-6", "ADAPTER 280 / 6 POS", 3, 2, RED, hard=False))
(OUT / "halter-multi-400-9.svg").write_text(adapter_svg("HUSQVARNA", "WZH-400-9", "WERKZEUGHALTER 400 / 9", 3, 3, "#888", hard=True))
(OUT / "halter-multi-230-6.svg").write_text(adapter_svg("HUSQVARNA", "WZH-230-6H", "WERKZEUGHALTER 230 / 6 H", 3, 2, "#888", hard=True))

print(f"Generated {len(list(OUT.glob('*.svg')))} SVG files in {OUT}")
