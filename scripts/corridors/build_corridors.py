from pathlib import Path
import hashlib
import html
import json
import sys

import arabic_reshaper
import cv2
import fitz
import numpy as np
from bidi.algorithm import get_display
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
from mrlc_mark import mark_image, verify_image

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public" / "corridors"
ARTIFACTS = ROOT.parent / "checks" / "corridor-artifacts"
FONTS = PUBLIC / "assets" / "fonts"
SIZE = (1080, 1350)

SECTION_IDS = ["cover", "market-function", "demand-drivers", "connectivity", "supply", "risks", "investor-fit", "verdict"]
REQUIRED = {"slug", "city", "serial", "version", "as_of", "thesis", "canonical_url", "pdf_url", "source", "sections"}


def load_report(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def validate_report(report: dict) -> None:
    missing = REQUIRED - report.keys()
    if missing:
        raise ValueError(f"Missing report fields: {sorted(missing)}")
    if [section.get("id") for section in report["sections"]] != SECTION_IDS:
        raise ValueError(f"{report['slug']}: sections must match {SECTION_IDS}")
    if not report["canonical_url"].startswith("https://mrlivingcapital.com/corridors/"):
        raise ValueError("Canonical URL must use the official HTTPS origin")
    for section in report["sections"]:
        for key in ("title", "body", "farsi"):
            if not section.get(key, "").strip():
                raise ValueError(f"{report['slug']}/{section['id']}: missing {key}")
        if section["farsi"][0].isdigit() or any(c in section["farsi"] for c in "٪٬"):
            raise ValueError(f"{report['slug']}/{section['id']}: invalid Farsi mirror")
    if "City A" in str(report) or "City B" in str(report):
        raise ValueError("Template copy reached a report")


def font(name: str, size: int):
    return ImageFont.truetype(str(FONTS / name), size)


def farsi(text: str) -> str:
    return get_display(arabic_reshaper.reshape(text))


def layout_farsi(draw: ImageDraw.ImageDraw, text: str, typeface: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        shaped = farsi(trial)
        if line and draw.textlength(shaped, font=typeface) > width:
            lines.append(line)
            line = word
        else:
            line = trial
    if line:
        lines.append(line)
    return lines


def wrap_text(draw: ImageDraw.ImageDraw, text: str, typeface: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if line and draw.textlength(trial, font=typeface) > width:
            lines.append(line)
            line = word
        else:
            line = trial
    if line:
        lines.append(line)
    return lines


def make_qr(target: str) -> Image.Image:
    matrix = cv2.QRCodeEncoder_create().encode(target)
    return Image.fromarray(matrix).convert("RGB").resize((140, 140), Image.Resampling.NEAREST)


def render_page(report: dict, section: dict, index: int) -> Image.Image:
    im = Image.new("RGB", SIZE, "#141817")
    draw = ImageDraw.Draw(im)
    heading = "MR LIVING CAPITAL" if index == 0 else "CORRIDOR DEEP DIVE"
    draw.text((58, 52), heading, font=font("SpaceGrotesk.ttf", 23 if index == 0 else 18), fill="#F1EEE7" if index == 0 else "#52A69A")
    draw.text((58, 95), report["serial"], font=font("SpaceGrotesk.ttf", 16), fill="#52A69A")
    draw.text((860, 70), f"{index + 1:02d}", font=font("CormorantGaramond.ttf", 150), fill="#1A2220")
    draw.text((90, 280), section["title"], font=font("CormorantGaramond.ttf", 76), fill="#F1EEE7")
    body_font = font("SpaceGrotesk.ttf", 30)
    y = 410
    for line in wrap_text(draw, section["body"], body_font, 880):
        draw.text((90, y), line, font=body_font, fill="#C7D1CC")
        y += 48
    source_font = font("SpaceGrotesk.ttf", 15)
    source = f"Source: {report['source']} · As of {report['as_of']}"
    for line_index, line in enumerate(wrap_text(draw, source, source_font, 900)):
        draw.text((90, 1030 + line_index * 24), line, font=source_font, fill="#5C6B63")
    farsi_font = font("Vazirmatn.ttf", 24)
    for line_index, line in enumerate(layout_farsi(draw, section["farsi"], farsi_font, 730)):
        draw.text((820, 1130 + line_index * 34), farsi(line), font=farsi_font, fill="#C7D1CC", anchor="ra")
    draw.rectangle((862, 1120, 1030, 1288), fill="white")
    im.paste(make_qr(report["canonical_url"]), (876, 1134))
    draw.text((58, 1306), f"@MRLIVINGCAPITAL · {report['serial']} · CORRIDOR DEEP DIVE · P{index + 1:02d}/08", font=font("SpaceGrotesk.ttf", 12), fill="#52A69A")
    return mark_image(im, report["serial"])


def png_bytes(image: Image.Image) -> bytes:
    from io import BytesIO
    output = BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()


def render_html(report: dict) -> str:
    sections = "\n".join(
        f'<section id="{html.escape(s["id"])}"><p class="page">P{index + 1:02d}/08</p><h2>{html.escape(s["title"])}</h2><p>{html.escape(s["body"])}</p><p class="farsi" lang="fa" dir="rtl">{html.escape(s["farsi"])}</p><small>Source: {html.escape(report["source"])} · As of {report["as_of"]}</small></section>'
        for index, s in enumerate(report["sections"])
    )
    order = ["dubai", "abu-dhabi", "ras-al-khaimah"]
    position = order.index(report["slug"])
    navigation = []
    if position > 0:
        navigation.append(f'<a rel="prev" href="/corridors/{order[position - 1]}/">Previous city</a>')
    else:
        navigation.append('<a href="/corridors/">Back to all cities</a>')
    if position < len(order) - 1:
        navigation.append(f'<a rel="next" href="/corridors/{order[position + 1]}/">Next city</a>')
    else:
        navigation.append('<a href="/corridors/">Back to all cities</a>')
    local_pdf = f'mrlc-2026-{report["slug"]}-corridor-brief.pdf'
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(report["city"])} Corridor Brief | MR Living Capital</title><meta name="description" content="{html.escape(report["thesis"])}"><meta name="author" content="MR Living Capital"><link rel="canonical" href="{report["canonical_url"]}"><link rel="stylesheet" href="../assets/corridor.css"></head><body><header><a href="/">MR LIVING CAPITAL</a><nav><a href="/corridors/">All cities</a></nav></header><main><p class="kicker">CORRIDOR DEEP DIVE · {report["serial"]} · AS OF {report["as_of"]}</p><h1>{html.escape(report["city"])}</h1><p class="thesis">{html.escape(report["thesis"])}</p><a class="download" href="{local_pdf}">Download the eight-page PDF</a>{sections}</main><footer><span>@MRLIVINGCAPITAL · {report["serial"]}</span><img src="qr.png" alt="QR code linking to this canonical report"><nav>{''.join(navigation)}</nav></footer></body></html>'''


def build_report(report: dict) -> dict:
    validate_report(report)
    city_dir = PUBLIC / report["slug"]
    page_dir = ARTIFACTS / report["slug"] / "pages"
    city_dir.mkdir(parents=True, exist_ok=True)
    page_dir.mkdir(parents=True, exist_ok=True)
    pages = []
    for index, section in enumerate(report["sections"]):
        page_path = page_dir / f"page-{index + 1:02d}.png"
        render_page(report, section, index).save(page_path, format="PNG")
        pages.append(page_path)
    pdf_path = city_dir / f"mrlc-2026-{report['slug']}-corridor-brief.pdf"
    doc = fitz.open()
    for page_path in pages:
        page = doc.new_page(width=540, height=675)
        page.insert_image(fitz.Rect(0, 0, 540, 675), filename=str(page_path))
    doc.set_metadata({"title": f"{report['city']} Corridor Brief", "author": "MR Living Capital", "subject": report["serial"], "keywords": "MRLC, corridor intelligence, UAE"})
    doc.save(pdf_path)
    doc.close()
    html_path = city_dir / "index.html"
    html_path.write_text(render_html(report), encoding="utf-8")
    (city_dir / "qr.png").write_bytes(png_bytes(make_qr(report["canonical_url"])))
    return {"slug": report["slug"], "canonical_url": report["canonical_url"], "html": str(html_path), "pdf": str(pdf_path), "pages": [str(p) for p in pages], "serial": report["serial"]}


def verify_outputs(result: dict) -> dict:
    report = load_report(ROOT / "content" / "corridors" / f"{result['slug']}.json")
    confidences = []
    qr_targets = []
    render_dir = ARTIFACTS / result["slug"] / "pdf-renders"
    render_dir.mkdir(parents=True, exist_ok=True)
    with fitz.open(result["pdf"]) as doc:
        if len(doc) != 8:
            raise ValueError(f"{result['slug']}: PDF must contain eight pages")
        if doc.metadata.get("author") != "MR Living Capital" or doc.metadata.get("subject") != report["serial"]:
            raise ValueError(f"{result['slug']}: PDF metadata mismatch")
        for index, page in enumerate(doc):
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            image.save(render_dir / f"page-{index + 1:02d}.png")
            payload, confidence = verify_image(image)
            if payload != report["serial"]:
                raise ValueError(f"{result['slug']}: mark payload mismatch on page {index + 1}")
            confidences.append(confidence)
            target, _, _ = cv2.QRCodeDetector().detectAndDecode(cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR))
            qr_targets.append(target)
    html_text = Path(result["html"]).read_text(encoding="utf-8")
    for section in report["sections"]:
        for value in (section["id"], section["body"], section["farsi"]):
            if html.escape(value) not in html_text:
                raise ValueError(f"{result['slug']}: HTML/PDF source drift at {section['id']}")
    if set(qr_targets) != {result["canonical_url"]}:
        raise ValueError(f"{result['slug']}: QR mismatch {qr_targets}")
    digest = hashlib.sha256(Path(result["pdf"]).read_bytes()).hexdigest()
    return {"mark_confidence": min(confidences), "qr_target": qr_targets[0], "pdf_sha256": digest}


def verify_manifest() -> bool:
    entries = json.loads((PUBLIC / "manifest.sha256.json").read_text(encoding="utf-8"))
    for relative, expected in entries.items():
        path = PUBLIC / relative
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
            raise ValueError(f"Integrity mismatch: {relative}")
    return True


def build_all() -> list[dict]:
    results = []
    cards = []
    for slug in ("dubai", "abu-dhabi", "ras-al-khaimah"):
        report = load_report(ROOT / "content" / "corridors" / f"{slug}.json")
        result = build_report(report)
        results.append(result)
        cards.append(f'<article><p class="kicker">{result["serial"]}</p><h2><a href="/corridors/{slug}/">{html.escape(report["city"])}</a></h2><p>{html.escape(report["thesis"])}</p></article>')
    hub = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>UAE City Corridor Briefs | MR Living Capital</title><meta name="author" content="MR Living Capital"><link rel="canonical" href="https://mrlivingcapital.com/corridors/"><link rel="stylesheet" href="assets/corridor.css"></head><body><header><a href="/">MR LIVING CAPITAL</a></header><main><p class="kicker">MRLC-2026-CITY-COLLECTION</p><h1>Three cities.<br>Different functions.</h1>{"".join(cards)}</main><footer>@MRLIVINGCAPITAL · MRLC-2026-CITY-COLLECTION</footer></body></html>'
    (PUBLIC / "index.html").write_text(hub, encoding="utf-8")
    entries = {"index.html": hashlib.sha256((PUBLIC / "index.html").read_bytes()).hexdigest()}
    for result in results:
        verification = verify_outputs(result)
        if verification["mark_confidence"] < 0.99:
            raise ValueError(f"{result['slug']}: mark below 0.99")
        for key in ("html", "pdf"):
            path = Path(result[key])
            entries[path.relative_to(PUBLIC).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
        qr_path = PUBLIC / result["slug"] / "qr.png"
        entries[qr_path.relative_to(PUBLIC).as_posix()] = hashlib.sha256(qr_path.read_bytes()).hexdigest()
    (PUBLIC / "manifest.sha256.json").write_text(json.dumps(entries, indent=2, sort_keys=True), encoding="utf-8")
    verify_manifest()
    return results


if __name__ == "__main__":
    build_all()
