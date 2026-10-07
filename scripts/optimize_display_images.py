"""Create display-size variants while preserving full-resolution zoom assets."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TARGETS = {
    "20260809224217524": 1440,
    "20260812001803954": 1280,
    "20260812001817685": 1280,
    "20260812001829062": 1280,
    "20260812001844238": 1280,
    "20260812001908765": 1280,
    "20260812001930770": 1280,
    "20260812011753353": 1280,
    "20260812011809631": 1280,
    "20260812011859134": 1280,
    "20260812011911807": 1280,
}


def main():
    old_total = new_total = 0
    for stem, width in TARGETS.items():
        original = ROOT / "public/images" / f"{stem}.webp"
        output = original.with_name(f"{stem}-display.webp")
        with Image.open(original) as image:
            image.thumbnail((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
            image.save(output, format="WEBP", quality=85, method=6)
            dimensions = image.size
        with Image.open(output) as verify:
            verify.load()
            assert verify.size == dimensions
        original_size, output_size = original.stat().st_size, output.stat().st_size
        assert output_size < original_size, f"Variant is not smaller: {output}"
        old_total += original_size
        new_total += output_size
        print(f"{output.name}: {dimensions}, {original_size:,} -> {output_size:,} bytes")
    print(f"Total display transfer: {old_total:,} -> {new_total:,} bytes")


if __name__ == "__main__":
    main()
