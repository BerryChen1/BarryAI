"""Create web-ready WebP copies of the AI workflow image assets.

The source ZIP remains the archive of the full-resolution artwork. This script
only generates the public image derivatives; it never deletes source files.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path, help="The bundle's assets/images directory")
    parser.add_argument("destination", type=Path, help="The website's public image directory")
    args = parser.parse_args()

    if not args.source.is_dir() or not args.destination.is_dir():
        raise SystemExit("Both source and destination image directories must already exist")

    for source in sorted(args.source.iterdir()):
        if source.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
            continue
        if source.name == "skill-workflow.jpg":
            continue  # Already 89 KB; preserve text sharpness in the original chart.

        destination = args.destination / f"{source.stem}.webp"
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original)
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGB")
            max_width, max_height = (1000, 1800) if image.height > image.width else (1800, 1200)
            image.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
            image.save(destination, "WEBP", quality=82, method=6)

        old_bytes = source.stat().st_size
        new_bytes = destination.stat().st_size
        print(f"{source.name} -> {destination.name}: {old_bytes:,} -> {new_bytes:,} bytes")


if __name__ == "__main__":
    main()
