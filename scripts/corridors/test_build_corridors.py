import unittest
from pathlib import Path

from scripts.corridors.build_corridors import SECTION_IDS, load_report, validate_report

ROOT = Path(__file__).resolve().parents[2]
CITIES = ("dubai", "abu-dhabi", "ras-al-khaimah")


class CorridorContentTests(unittest.TestCase):
    def test_records_have_eight_ordered_sections_and_safe_urls(self):
        for city in CITIES:
            with self.subTest(city=city):
                report = load_report(ROOT / "content" / "corridors" / f"{city}.json")
                validate_report(report)
                self.assertEqual([s["id"] for s in report["sections"]], SECTION_IDS)
                self.assertTrue(report["canonical_url"].startswith("https://mrlivingcapital.com/corridors/"))
                self.assertEqual(len(report["sections"]), 8)

    def test_every_section_has_editorial_evidence_and_farsi(self):
        for city in CITIES:
            report = load_report(ROOT / "content" / "corridors" / f"{city}.json")
            for section in report["sections"]:
                self.assertTrue(section["body"].strip())
                self.assertTrue(section["farsi"].strip())
                self.assertFalse(section["farsi"][0].isdigit())
                self.assertNotIn("٪", section["farsi"])
                self.assertNotIn("٬", section["farsi"])
            self.assertIn("20 May 2026", report["source"])
            self.assertEqual(report["as_of"], "2026-05-20")


class CorridorAssetTests(unittest.TestCase):
    def test_farsi_lines_fit_beside_qr_codes(self):
        from PIL import Image, ImageDraw
        from scripts.corridors.build_corridors import farsi, font, layout_farsi
        draw = ImageDraw.Draw(Image.new("RGB", (1080, 1350)))
        typeface = font("Vazirmatn.ttf", 24)
        for city in CITIES:
            report = load_report(ROOT / "content" / "corridors" / f"{city}.json")
            for section in report["sections"]:
                with self.subTest(city=city, section=section["id"]):
                    lines = layout_farsi(draw, section["farsi"], typeface, 730)
                    self.assertTrue(lines)
                    self.assertLessEqual(max(draw.textlength(farsi(line), font=typeface) for line in lines), 730)
                    self.assertEqual(" ".join(lines), section["farsi"])

    def test_final_assets_have_pdf_qr_mark_and_integrity(self):
        from scripts.corridors.build_corridors import build_all, verify_manifest, verify_outputs
        results = build_all()
        self.assertEqual(len(results), 3)
        for result in results:
            with self.subTest(city=result["slug"]):
                self.assertTrue(Path(result["html"]).is_file())
                self.assertTrue(Path(result["pdf"]).is_file())
                self.assertEqual(len(result["pages"]), 8)
                verification = verify_outputs(result)
                self.assertGreaterEqual(verification["mark_confidence"], 0.99)
                self.assertEqual(verification["qr_target"], result["canonical_url"])
                self.assertTrue(verify_manifest())


if __name__ == "__main__":
    unittest.main()
