// spotify-preview-finder.d.ts
declare module 'spotify-preview-finder' {
    interface PreviewResult {
      success: boolean;
      results: {
        name: string;
        spotifyUrl: string;
        previewUrls: string[];
      }[];
      error?: string;
    }
  
    function spotifyPreviewFinder(
      songName: string,
      limit?: number
    ): Promise<PreviewResult>;
  
    export = spotifyPreviewFinder;
  }
  