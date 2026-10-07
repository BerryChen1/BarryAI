"""Build the local ZCOOL KuaiLe WOFF2 used by the static Redtest deck.

The subset includes every character present in the deck's HTML, CSS and JS,
so it preserves the visible glyphs while avoiding the much larger TTF download.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("deck_directory", type=Path)
    parser.add_argument("source_ttf", type=Path)
    parser.add_argument("destination_woff2", type=Path)
    args = parser.parse_args()

    text_files = [args.deck_directory / name for name in ("index.html", "style.css", "deck.js")]
    for path in (*text_files, args.source_ttf):
        if not path.is_file():
            raise SystemExit(f"Missing input: {path}")

    characters = {ord(char) for path in text_files for char in path.read_text(encoding="utf-8")}
    characters.update(range(32, 127))

    font = TTFont(args.source_ttf)
    original_cmap = set().union(*(table.cmap.keys() for table in font["cmap"].tables))
    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.name_legacy = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=characters)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(args.destination_woff2)

    compressed = TTFont(args.destination_woff2)
    new_cmap = set().union(*(table.cmap.keys() for table in compressed["cmap"].tables))
    missing = (characters & original_cmap) - new_cmap
    if missing:
        raise SystemExit(f"Subset is missing {len(missing)} characters used by the deck")

    print(f"Preserved {len(characters & original_cmap)} used glyphs")
    print(f"TTF {args.source_ttf.stat().st_size:,} bytes -> WOFF2 {args.destination_woff2.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
