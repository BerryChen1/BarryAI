# Custom Instructions for AI Coding Agent

This file stores persistent project-specific design principles and implementation rules. The AI Coding Agent will read and adhere to these directives on every turn.

## Video Player Implementation Standard

All videos in the portfolio/website must utilize the custom-built `<CustomVideoPlayer>` component instead of raw `<video>` elements or un-themed native players. This ensures an integrated, premium cinema experience.

### CustomVideoPlayer Component Specifications (`/src/components/CustomVideoPlayer.tsx`):
- **Play Action Label**: The overlay text when the video is paused must read `"点击播放视频"` (or `"Click to Play Video"` in English mode), centered inside a glassy backdrop-blur container with a subtle hover zoom and shadow.
- **Seek bar & Controls Layout**:
  - The ultra-thin seekbar (0.5 h-0.5) is positioned at the top of the controls container.
  - The functional controls dashboard (Play, Volume, Timing counter, Speed selector, Fullscreen) is placed neatly **underneath** the seekbar.
- **Time Indicators**:
  - **Seekbar Timings**: The left is the current `progress` indicator, and the right must show the counting-down remaining time formatted as a negative segment: `-{remainingTime}` (e.g., `-01:24`).
  - **Bottom Status Counter**: The left of the dashboard shows current time / total static duration (e.g., `00:15 / 01:39`).
- **Security & Integrity**:
  - Disable native contextual interactions to prevent raw scraping (utilize `controlsList="nodownload"` and prevent right-click context menu via `onContextMenu={(e) => e.preventDefault()}`).
  - Disable `autoPlay` on initial load for detailed sections unless requested.
- **Performance & Decoding Optimization**:
  - All video elements must include `preload="auto"` or `preload="metadata"` to leverage efficient network caching.
  - Video elements or their adjacent wrapping layouts must employ CSS GPU hardware acceleration utility classes (`transform-gpu` and `will-change-transform`) to bypass main-thread CPU bottlenecks and prevent frame lag during scroll transitions.

### Layout Navigation Rules:
- **Persistent Header/Exit Option**: The top action banner and glassy close button in detail views must be `fixed` (`z-[180]`) and have `pointer-events-none` on the outer shell (with `pointer-events-auto` on the buttons themselves). This guarantees that as the user scrolls deep into the material narration details, the closer button floats consistently on top of the screen for seamless exit.
