/** Project recording: MP4 converted from the original GIF, plus its poster frame. */
export interface ProjectMediaAsset {
  /** Path to the MP4 under `public/media/projects/`. */
  video: string;
  /** First frame as JPEG, shown before playback and with reduced motion. */
  poster: string;
  /** Intrinsic width in px (reserves space, prevents layout shift). */
  width: number;
  /** Intrinsic height in px. */
  height: number;
}
