#!/usr/bin/env python3
"""Generate Katalog-Style SVG-Illustrationen für das Diamantwerkzeug-Sortiment.
Output: /assets/products/*.svg
"""
from pathlib import Path
from math import sin, cos, radians

OUT = Path(__file__).parent.parent / "assets" / "products"
RED = "#D62E20"
BLACK = "#0D0D0D"
WHITE = "#FFFFFF"

DEFS = """<defs>
  <radialGradient id="steel" cx="50%" cy="38%" r="62%">
    <stop offset="0%" stop-color="#9C9C9C"/>
    <stop offset="60%" stop-color="#4A4A4A"/>
    <stop offset="100%" stop-color="#1F1F1F"/>
  </radialGradient>
  <linearGradient id="hub" x1="20%" y1="20%" x2="80%" y2="80%">
    <stop offset="0%" stop-color="#6A6A6A"/>
    <stop offset="100%" stop-color="#0D0D0D"/>
  </linearGradient>
  <radialGradient id="bronze" cx="50%" cy="38%" r="62%">
    <stop offset="0%" stop-color="#C9A66B"/>
    <stop offset="60%" stop-color="#9A7A3F"/>
    <stop offset="100%" stop-color="#5C4520"/>
  </radialGradient>
  <linearGradient id="plastic" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#FB7140"/>
    <stop offset="100%" stop-color="#A52213"/>
  </linearGradient>
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
    <feOffset dx="0" dy="8" result="off"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.32"/></feComponentTransfer>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>"""

def wrap(content, brand, code):
    """Standard-Card-Layout für alle Produkt-SVGs."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="{brand} {code}">
  {DEFS}
  <rect width="400" height="400" fill="#F5F5F5"/>
  {content}
  <rect x="60" y="318" width="280" height="3" fill="{RED}"/>
  <text x="200" y="354" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="20" fill="#0D0D0D" letter-spacing="0.02em">{code}</text>
  <text x="200" y="378" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="600" font-size="11" fill="#666" letter-spacing="0.22em">{brand.upper()}</text>
</svg>"""

# ── BOHRKRONE: senkrechte Ansicht des Zylinders mit Segment-Ring oben ──
def svg_bohrkrone(diameter_mm, application, brand, code, armierung=False):
    # Visuelle Skalierung: 25-150 mm Reicht-Range auf 60-180 px Durchmesser auf der Karte
    px_diameter = int(60 + (min(diameter_mm, 200) / 200) * 130)
    px_radius = px_diameter // 2
    cx, cy = 200, 200
    height = 200  # zylindrische Länge

    # Zylinder-Body
    body_fill = "url(#bronze)" if application == 'nass' else "url(#steel)"

    # Segmente am oberen Rand (8 sichtbar im 2D-Profil)
    n_segments = 6
    seg_w = px_diameter // (n_segments + 1)
    segment_color = RED if armierung else BLACK
    segments = []
    for i in range(n_segments):
        x = cx - px_radius + 6 + i * ((px_diameter - 12) / (n_segments - 1)) - seg_w/2
        segments.append(f'<rect x="{x:.0f}" y="{cy - height//2 - 14}" width="{seg_w-2}" height="18" rx="2" fill="{segment_color}"/>')

    # Kühlloch oben in der Mitte
    hole = f'<circle cx="{cx}" cy="{cy - height//2 + 16}" r="6" fill="#0A0A0A"/>'

    # Aufnahme-Gewinde unten (klein)
    thread = f"""<rect x="{cx - 18}" y="{cy + height//2 + 4}" width="36" height="40" rx="2" fill="url(#hub)"/>
    <line x1="{cx-14}" y1="{cy + height//2 + 14}" x2="{cx+14}" y2="{cy + height//2 + 14}" stroke="rgba(255,255,255,0.15)"/>
    <line x1="{cx-14}" y1="{cy + height//2 + 24}" x2="{cx+14}" y2="{cy + height//2 + 24}" stroke="rgba(255,255,255,0.15)"/>
    <line x1="{cx-14}" y1="{cy + height//2 + 34}" x2="{cx+14}" y2="{cy + height//2 + 34}" stroke="rgba(255,255,255,0.15)"/>"""

    body = f"""<ellipse cx="{cx}" cy="320" rx="{px_radius+20}" ry="10" fill="rgba(0,0,0,0.15)"/>
    <rect x="{cx - px_radius}" y="{cy - height//2}" width="{px_diameter}" height="{height}" fill="{body_fill}" filter="url(#shadow)"/>
    <ellipse cx="{cx}" cy="{cy - height//2}" rx="{px_radius}" ry="8" fill="url(#hub)"/>
    {hole}
    {''.join(segments)}
    {thread}"""

    return body

# ── TRENNSCHEIBE: Aufsicht runde Scheibe mit gezahntem Rand ──
def svg_trennscheibe(diameter_mm, color, brand, code):
    cx, cy = 200, 190
    r_outer = 130
    r_inner = 30

    # Hauptscheibe
    body = f"""<ellipse cx="200" cy="310" rx="135" ry="12" fill="rgba(0,0,0,0.15)"/>
    <circle cx="{cx}" cy="{cy}" r="{r_outer}" fill="url(#steel)" filter="url(#shadow)"/>
    <circle cx="{cx}" cy="{cy}" r="{r_outer}" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>"""

    # Diamant-Segmente am Rand (12 oder 16 je nach Größe)
    n = 14
    segments = ""
    for i in range(n):
        a = (360 / n) * i
        a_rad = radians(a)
        x = cx + (r_outer + 4) * cos(a_rad)
        y = cy + (r_outer + 4) * sin(a_rad)
        rotate = a + 90
        segments += f'<rect x="{x-6:.0f}" y="{y-4:.0f}" width="12" height="14" rx="2" fill="{color}" transform="rotate({rotate} {x:.0f} {y:.0f})"/>\n  '

    # Slots/Schlitze am Rand (alle 360/n grad eine kleine Kerbe)
    for i in range(n):
        a = (360 / n) * i + (360 / n / 2)
        a_rad = radians(a)
        x1 = cx + (r_outer - 8) * cos(a_rad)
        y1 = cy + (r_outer - 8) * sin(a_rad)
        x2 = cx + (r_outer - 30) * cos(a_rad)
        y2 = cy + (r_outer - 30) * sin(a_rad)
        segments += f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}" stroke="rgba(0,0,0,0.5)" stroke-width="2"/>\n  '

    # Aufnahme-Loch in der Mitte
    hub = f"""<circle cx="{cx}" cy="{cy}" r="{r_inner}" fill="url(#hub)"/>
    <circle cx="{cx}" cy="{cy}" r="{r_inner-8}" fill="#0A0A0A"/>
    <circle cx="{cx}" cy="{cy}" r="{r_inner-8}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>"""

    return body + segments + hub

# ── SCHLEIFTOPF: Topfform schräge Aufsicht ──
def svg_schleiftopf(diameter_mm, segmentcolor, double_row, pcd, brand, code):
    cx, cy = 200, 195
    r = 120

    # Schräge Topfform (Ellipse vorn + Zylinderform)
    body = f"""<ellipse cx="200" cy="310" rx="125" ry="11" fill="rgba(0,0,0,0.18)"/>
    <ellipse cx="{cx}" cy="{cy+30}" rx="{r}" ry="32" fill="url(#hub)" filter="url(#shadow)"/>
    <ellipse cx="{cx}" cy="{cy}" rx="{r}" ry="36" fill="url(#steel)"/>
    <ellipse cx="{cx}" cy="{cy}" rx="{r}" ry="36" fill="none" stroke="rgba(0,0,0,0.45)" stroke-width="1"/>"""

    # Innen-Kreis (Topf-Aussparung)
    body += f'<ellipse cx="{cx}" cy="{cy}" rx="{r-30}" ry="22" fill="#1F1F1F"/>'

    # Segmente am Rand
    if pcd:
        # PCD-Blöcke groß und rechteckig
        for i in range(8):
            a = (360 / 8) * i
            a_rad = radians(a)
            x = cx + (r - 14) * cos(a_rad)
            y = cy + (r * 0.93 - 14) * sin(a_rad)
            body += f'<rect x="{x-9:.0f}" y="{y-9:.0f}" width="18" height="18" fill="{segmentcolor}" transform="rotate({a + 90} {x:.0f} {y:.0f})"/>'
    else:
        # Standard Diamant-Segmente in 1 oder 2 Reihen
        rows = [r - 8] if not double_row else [r - 8, r - 28]
        for ring_r in rows:
            for i in range(16):
                a = (360 / 16) * i
                a_rad = radians(a)
                x = cx + ring_r * cos(a_rad)
                y = cy + (ring_r * 0.93) * sin(a_rad)
                body += f'<rect x="{x-3.5:.0f}" y="{y-5:.0f}" width="7" height="12" rx="1" fill="{segmentcolor}"/>'

    # Gewinde-Aufnahme oben
    body += f'<rect x="{cx-14}" y="{cy-86}" width="28" height="28" rx="2" fill="url(#hub)"/>'
    body += f'<line x1="{cx-10}" y1="{cy-78}" x2="{cx+10}" y2="{cy-78}" stroke="rgba(255,255,255,0.15)"/>'
    body += f'<line x1="{cx-10}" y1="{cy-70}" x2="{cx+10}" y2="{cy-70}" stroke="rgba(255,255,255,0.15)"/>'

    return body

# ── DOSENSENKER: hohle Krone mit Zentrierbohrer ──
def svg_dosensenker(diameter_mm, brand, code):
    cx, cy = 200, 195
    r = 90

    body = f"""<ellipse cx="200" cy="305" rx="100" ry="10" fill="rgba(0,0,0,0.16)"/>
    <ellipse cx="{cx}" cy="{cy+22}" rx="{r}" ry="20" fill="url(#hub)" filter="url(#shadow)"/>
    <rect x="{cx-r}" y="{cy-90}" width="{r*2}" height="112" fill="url(#bronze)"/>
    <ellipse cx="{cx}" cy="{cy-90}" rx="{r}" ry="20" fill="url(#bronze)"/>
    <ellipse cx="{cx}" cy="{cy-90}" rx="{r}" ry="20" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
    <ellipse cx="{cx}" cy="{cy-90}" rx="{r-12}" ry="16" fill="#2F2F2F"/>"""

    # Zentrierbohrer im Inneren
    body += f'<rect x="{cx-3}" y="{cy-120}" width="6" height="40" fill="#222"/>'
    body += f'<polygon points="{cx-5},{cy-120} {cx+5},{cy-120} {cx},{cy-130}" fill="#444"/>'

    # Segmente am unteren Rand der Krone
    for i in range(8):
        x = cx - r + 8 + i * ((r*2 - 16) / 7)
        body += f'<rect x="{x-4:.0f}" y="{cy+20}" width="8" height="14" rx="1" fill="{BLACK}"/>'

    # SDS-Plus Aufnahme oben
    body += f'<rect x="{cx-6}" y="{cy-150}" width="12" height="22" fill="#444"/>'

    return body

# ── FLIESENBOHRER-SET: 6 Bohrer nebeneinander ──
def svg_fliesenbohrer_set(brand, code):
    body = '<ellipse cx="200" cy="305" rx="135" ry="10" fill="rgba(0,0,0,0.15)"/>\n'
    sizes = [10, 12, 14, 16, 18, 20]
    x_start = 80
    spacing = 40
    for i, size in enumerate(sizes):
        x = x_start + i * spacing
        body += f'<rect x="{x-3}" y="{180 - size}" width="6" height="120" fill="url(#steel)" filter="url(#shadow)"/>\n'
        body += f'<rect x="{x - size//2 - 2}" y="{170 - size}" width="{size + 4}" height="14" rx="2" fill="url(#hub)"/>\n'
        body += f'<rect x="{x - size//2}" y="{170 - size}" width="{size}" height="14" fill="{BLACK}"/>\n'
        body += f'<rect x="{x-3}" y="290" width="6" height="20" fill="#444"/>\n'
    return body

# ── FLIESENBOHRER EINZEL Ø30 ──
def svg_fliesenbohrer_single(brand, code):
    cx = 200
    body = f"""<ellipse cx="200" cy="305" rx="60" ry="10" fill="rgba(0,0,0,0.16)"/>
    <rect x="{cx-25}" y="100" width="50" height="180" rx="2" fill="url(#steel)" filter="url(#shadow)"/>
    <ellipse cx="{cx}" cy="100" rx="25" ry="6" fill="url(#hub)"/>
    <ellipse cx="{cx}" cy="100" rx="25" ry="6" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
    <ellipse cx="{cx}" cy="100" rx="18" ry="4" fill="#0F0F0F"/>
    <rect x="{cx-4}" y="280" width="8" height="30" fill="#444"/>"""
    # Diamant-Beschichtung an der Spitze (Punkte)
    for i in range(4):
        for j in range(3):
            body += f'<circle cx="{cx - 15 + j * 15}" cy="{106 + i * 4}" r="0.8" fill="{RED}"/>'
    return body

# ── KERNBOHRGERÄT: Schräge Ansicht ──
def svg_kernbohrer(brand, code):
    body = """<ellipse cx="200" cy="320" rx="140" ry="12" fill="rgba(0,0,0,0.22)"/>
    <rect x="80" y="120" width="160" height="160" rx="12" fill="url(#plastic)" filter="url(#shadow)"/>
    <rect x="80" y="120" width="160" height="160" rx="12" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    <rect x="100" y="150" width="120" height="38" rx="4" fill="#1A1A1A"/>
    <rect x="108" y="158" width="104" height="22" rx="2" fill="#222"/>
    <circle cx="160" cy="220" r="14" fill="#0A0A0A"/>
    <circle cx="160" cy="220" r="14" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
    <text x="160" y="225" text-anchor="middle" font-family="Inter" font-weight="700" font-size="11" fill="#666">ON</text>
    <rect x="240" y="180" width="46" height="40" rx="4" fill="#1F1F1F"/>
    <rect x="245" y="185" width="36" height="6" fill="#444"/>
    <rect x="100" y="280" width="160" height="14" fill="#1F1F1F"/>
    <rect x="178" y="294" width="44" height="44" fill="url(#hub)"/>
    <rect x="178" y="294" width="44" height="44" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <line x1="184" y1="306" x2="216" y2="306" stroke="rgba(255,255,255,0.2)"/>
    <line x1="184" y1="318" x2="216" y2="318" stroke="rgba(255,255,255,0.2)"/>
    <line x1="184" y1="330" x2="216" y2="330" stroke="rgba(255,255,255,0.2)"/>"""
    return body

# ── WINKELSCHLEIFER ──
def svg_winkelschleifer(brand, code):
    body = """<ellipse cx="200" cy="320" rx="150" ry="14" fill="rgba(0,0,0,0.22)"/>
    <rect x="70" y="170" width="180" height="60" rx="14" fill="url(#plastic)" filter="url(#shadow)"/>
    <rect x="70" y="170" width="180" height="60" rx="14" fill="none" stroke="rgba(0,0,0,0.3)"/>
    <circle cx="290" cy="200" r="50" fill="url(#steel)"/>
    <circle cx="290" cy="200" r="50" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="1.5"/>
    <circle cx="290" cy="200" r="14" fill="#0A0A0A"/>
    <rect x="60" y="186" width="14" height="28" rx="2" fill="#1A1A1A"/>
    <rect x="100" y="200" width="48" height="14" rx="2" fill="#1A1A1A"/>
    <circle cx="200" cy="200" r="6" fill="#0A0A0A"/>
    <line x1="290" y1="155" x2="290" y2="245" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
    <line x1="245" y1="200" x2="335" y2="200" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>"""
    return body

# ── ZENTRIERBOHRER ──
def svg_zentrierbohrer(brand, code):
    cx = 200
    body = f"""<ellipse cx="200" cy="305" rx="60" ry="10" fill="rgba(0,0,0,0.15)"/>
    <rect x="{cx-6}" y="100" width="12" height="180" fill="url(#steel)" filter="url(#shadow)"/>
    <polygon points="{cx-6},100 {cx+6},100 {cx},88" fill="#444"/>
    <rect x="{cx-4}" y="280" width="8" height="22" fill="#444"/>"""
    # Spirale (Linien)
    for i in range(10):
        y = 110 + i * 16
        body += f'<line x1="{cx-6}" y1="{y}" x2="{cx+6}" y2="{y+8}" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>'
    return body

# ── ADAPTER ──
def svg_adapter(brand, code):
    cx, cy = 200, 200
    body = f"""<ellipse cx="200" cy="305" rx="80" ry="10" fill="rgba(0,0,0,0.15)"/>
    <rect x="{cx-40}" y="140" width="80" height="40" rx="3" fill="url(#hub)" filter="url(#shadow)"/>
    <rect x="{cx-28}" y="180" width="56" height="40" rx="2" fill="url(#bronze)"/>
    <rect x="{cx-20}" y="220" width="40" height="50" rx="2" fill="url(#hub)"/>"""
    # Gewindelinien
    for y in [148, 158, 168]:
        body += f'<line x1="{cx-34}" y1="{y}" x2="{cx+34}" y2="{y}" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>'
    for y in [230, 240, 250, 260]:
        body += f'<line x1="{cx-16}" y1="{y}" x2="{cx+16}" y2="{y}" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>'
    return body

# ── KÜHLADAPTER ──
def svg_kuehladapter(brand, code):
    cx = 200
    body = f"""<ellipse cx="200" cy="305" rx="70" ry="10" fill="rgba(0,0,0,0.15)"/>
    <rect x="{cx-32}" y="180" width="64" height="60" rx="6" fill="url(#plastic)" filter="url(#shadow)"/>
    <circle cx="{cx}" cy="160" r="22" fill="url(#hub)"/>
    <circle cx="{cx}" cy="160" r="14" fill="#0A0A0A"/>
    <rect x="{cx-4}" y="240" width="8" height="40" fill="url(#hub)"/>"""
    return body

# ── BDE SCHLEIFSTIFT ──
def svg_bde_schleifstift(diameter_mm, brand, code):
    cx = 200
    head_r = 18 if diameter_mm == 6 else 22
    body = f"""<ellipse cx="200" cy="305" rx="40" ry="10" fill="rgba(0,0,0,0.15)"/>
    <circle cx="{cx}" cy="160" r="{head_r}" fill="{BLACK}" filter="url(#shadow)"/>
    <rect x="{cx-3}" y="178" width="6" height="120" fill="url(#steel)"/>"""
    # Diamantkörnung als Punkte
    for ring in range(3):
        for a in range(0, 360, 30):
            a_rad = radians(a)
            x = cx + (head_r - 4 - ring*4) * cos(a_rad)
            y = 160 + (head_r - 4 - ring*4) * sin(a_rad)
            body += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="1" fill="{RED}"/>'
    body += f'<text x="{cx}" y="280" text-anchor="middle" font-family="Inter" font-weight="800" font-size="11" fill="#999">Ø{diameter_mm}</text>'
    return body

# ── BDE KLETT-SCHLEIFPAPIER ──
def svg_bde_klett(label, color, brand, code):
    cx, cy = 200, 195
    r = 110
    body = f"""<ellipse cx="200" cy="305" rx="120" ry="11" fill="rgba(0,0,0,0.16)"/>
    <circle cx="{cx}" cy="{cy}" r="{r}" fill="{color}" filter="url(#shadow)"/>
    <circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="rgba(0,0,0,0.2)"/>
    <circle cx="{cx}" cy="{cy}" r="20" fill="url(#hub)"/>
    <circle cx="{cx}" cy="{cy}" r="20" fill="none" stroke="rgba(255,255,255,0.18)"/>
    <text x="{cx}" y="{cy-50}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="14" fill="#0D0D0D" letter-spacing="0.05em">BDE</text>
    <text x="{cx}" y="{cy+70}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="11" fill="#0D0D0D" letter-spacing="0.18em">{label}</text>"""
    # Körnungs-Punkte (Sand)
    for _ in range(180):
        from random import seed, randint, uniform
        # deterministic seed per label
    # Use a fixed seed for repeatability
    import random as _r
    _r.seed(hash(label) & 0xffff)
    for _ in range(160):
        x = cx + _r.uniform(-r+25, r-25)
        y = cy + _r.uniform(-r+25, r-25)
        if (x - cx)**2 + (y - cy)**2 < (r-30)**2 and (x - cx)**2 + (y - cy)**2 > 28**2:
            body += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="0.8" fill="rgba(0,0,0,0.45)"/>'
    return body

# ── BDE SCHLEIFTELLER ──
def svg_bde_schleifteller(brand, code):
    cx, cy = 200, 195
    r = 115
    body = f"""<ellipse cx="200" cy="310" rx="125" ry="11" fill="rgba(0,0,0,0.18)"/>
    <ellipse cx="{cx}" cy="{cy+18}" rx="{r}" ry="22" fill="url(#hub)" filter="url(#shadow)"/>
    <circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#plastic)"/>
    <circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="rgba(0,0,0,0.3)"/>
    <circle cx="{cx}" cy="{cy}" r="40" fill="url(#hub)"/>
    <text x="{cx}" y="{cy+5}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="16" fill="white" letter-spacing="0.1em">BDE</text>"""
    # Klett-Struktur (Häkchen-Muster)
    import random as _r
    _r.seed(424242)
    for _ in range(70):
        x = cx + _r.uniform(-r+50, r-10)
        y = cy + _r.uniform(-r+50, r-10)
        if 50 < (x-cx)**2 + (y-cy)**2 < (r-15)**2:
            body += f'<circle cx="{x:.0f}" cy="{y:.0f}" r="1.4" fill="rgba(0,0,0,0.18)"/>'
    return body


# ─── Generate all SVGs ─────────────────────────────────────────────────
def gen():
    files = []

    # Bohrkronen
    bks = [
        ('bk-nass-52.svg',  'Husqvarna', 'Ø52',  52,  'nass'),
        ('bk-nass-82.svg',  'Husqvarna', 'Ø82',  82,  'nass'),
        ('bk-nass-112.svg', 'Husqvarna', 'Ø112', 112, 'nass'),
        ('bk-nass-152.svg', 'Husqvarna', 'Ø152', 152, 'nass'),
        ('bk-trocken-82.svg', 'ADT', 'Ø82 TROCKEN', 82, 'trocken'),
        ('bk-armierung-122.svg', 'Husqvarna', 'Ø122 ARMIERUNG', 122, 'nass'),
    ]
    bks_arm = {'bk-armierung-122.svg'}
    for fn, brand, code, d, app in bks:
        content = svg_bohrkrone(d, app, brand, code, armierung=(fn in bks_arm))
        (OUT / fn).write_text(wrap(content, brand, code))
        files.append(fn)

    # Trennscheiben
    tss = [
        ('trennscheibe-230.svg', 'Husqvarna', 'TRENN Ø230', 230, BLACK),
        ('trennscheibe-300.svg', 'Husqvarna', 'TRENN Ø300', 300, BLACK),
        ('trennscheibe-asphalt-400.svg', 'Tyrolit', 'ASPHALT Ø400', 400, RED),
        ('trennscheibe-fliese-125.svg', 'Heller', 'FLIESE Ø125', 125, '#1E5BBF'),
    ]
    for fn, brand, code, d, color in tss:
        content = svg_trennscheibe(d, color, brand, code)
        (OUT / fn).write_text(wrap(content, brand, code))
        files.append(fn)

    # Schleiftöpfe
    sts = [
        ('schleiftopf-doppel-125.svg', 'Bosch', 'TOPF Ø125 2R', 125, BLACK, True, False),
        ('schleiftopf-doppel-180.svg', 'Bosch', 'TOPF Ø180 2R', 180, BLACK, True, False),
        ('schleiftopf-pcd-125.svg', 'Husqvarna', 'PCD-TOPF Ø125', 125, '#B8862F', False, True),
    ]
    for fn, brand, code, d, color, dbl, pcd in sts:
        content = svg_schleiftopf(d, color, dbl, pcd, brand, code)
        (OUT / fn).write_text(wrap(content, brand, code))
        files.append(fn)

    # Dosensenker
    for fn, brand, code, d in [
        ('dosensenker-68.svg', 'Heller', 'DOSE Ø68', 68),
        ('dosensenker-82.svg', 'Heller', 'DOSE Ø82', 82),
    ]:
        content = svg_dosensenker(d, brand, code)
        (OUT / fn).write_text(wrap(content, brand, code))
        files.append(fn)

    # Fliesenbohrer
    (OUT / 'fliesenbohrer-set.svg').write_text(wrap(svg_fliesenbohrer_set('Heller', 'FLIESEN SET'), 'Heller', 'FLIESEN-SET'))
    files.append('fliesenbohrer-set.svg')
    (OUT / 'fliesenbohrer-30.svg').write_text(wrap(svg_fliesenbohrer_single('Bosch', 'FLIESE Ø30'), 'Bosch', 'FLIESE Ø30'))
    files.append('fliesenbohrer-30.svg')

    # Maschinen
    (OUT / 'maschine-kernbohr.svg').write_text(wrap(svg_kernbohrer('Husqvarna', 'DM 230'), 'Husqvarna', 'DM 230'))
    files.append('maschine-kernbohr.svg')
    (OUT / 'maschine-winkelschleifer.svg').write_text(wrap(svg_winkelschleifer('Bosch', 'GWS 17-125'), 'Bosch', 'GWS 17-125'))
    files.append('maschine-winkelschleifer.svg')

    # Zubehör
    (OUT / 'adapter-125-m18.svg').write_text(wrap(svg_adapter('Husqvarna', '1¼ → M18'), 'Husqvarna', '1¼ → M18'))
    files.append('adapter-125-m18.svg')
    (OUT / 'zentrierbohrer-50.svg').write_text(wrap(svg_zentrierbohrer('Husqvarna', 'ZB Ø50'), 'Husqvarna', 'ZB Ø50'))
    files.append('zentrierbohrer-50.svg')
    (OUT / 'kuehladapter.svg').write_text(wrap(svg_kuehladapter('Husqvarna', 'GARDENA'), 'Husqvarna', 'GARDENA'))
    files.append('kuehladapter.svg')

    # BDE
    (OUT / 'bde-schleifstift-6.svg').write_text(wrap(svg_bde_schleifstift(6, 'BDE', 'STIFT Ø6'), 'BDE', 'STIFT Ø6'))
    files.append('bde-schleifstift-6.svg')
    (OUT / 'bde-schleifstift-10.svg').write_text(wrap(svg_bde_schleifstift(10, 'BDE', 'STIFT Ø10'), 'BDE', 'STIFT Ø10'))
    files.append('bde-schleifstift-10.svg')
    (OUT / 'bde-klett-select.svg').write_text(wrap(svg_bde_klett('SELECT 225', '#E6A872', 'BDE', 'KLETT SELECT'), 'BDE', 'KLETT SELECT'))
    files.append('bde-klett-select.svg')
    (OUT / 'bde-klett-fleece.svg').write_text(wrap(svg_bde_klett('FLEECE 225', '#D8C9B5', 'BDE', 'KLETT FLEECE'), 'BDE', 'KLETT FLEECE'))
    files.append('bde-klett-fleece.svg')
    (OUT / 'bde-klett-gitter.svg').write_text(wrap(svg_bde_klett('GITTER 225', '#B5A185', 'BDE', 'KLETT GITTER'), 'BDE', 'KLETT GITTER'))
    files.append('bde-klett-gitter.svg')
    (OUT / 'bde-schleifteller.svg').write_text(wrap(svg_bde_schleifteller('BDE', 'TELLER 225'), 'BDE', 'TELLER 225'))
    files.append('bde-schleifteller.svg')

    # Fallback (für unbekannte Bilder)
    fallback = """<rect width="400" height="400" fill="#F5F5F5"/>
    <rect x="100" y="100" width="200" height="200" rx="20" fill="url(#hub)" filter="url(#shadow)"/>
    <text x="200" y="210" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="white">?</text>"""
    (OUT / '_fallback.svg').write_text(wrap(fallback, 'BAUDIENST', 'Produkt'))
    files.append('_fallback.svg')

    return files

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    files = gen()
    print(f"Generated {len(files)} SVGs in {OUT}")
    for f in files:
        print(f"  {f}")
