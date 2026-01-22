'use client';

/**
 * Shared loading spinner for the interactive map.
 * Used during:
 * - React Suspense fallback (page streaming)
 * - Dynamic import loading (JS chunk download)
 * - Map initialization (ESRI + layer loading)
 */

interface MapLoadingSpinnerProps {
  /**
   * Loading stage message. Defaults based on stage if not provided.
   * Examples: "Initializing...", "Loading layers...", "Loading map..."
   */
  message?: string;
  /**
   * Loading stage for progressive messaging.
   * - 'suspense': Initial page load
   * - 'import': Dynamic import of map component
   * - 'init': ESRI map initialization and layer loading
   */
  stage?: 'suspense' | 'import' | 'init';
  /**
   * Whether to render as full-screen or inline overlay.
   * Full-screen uses h-screen, overlay uses absolute positioning.
   */
  variant?: 'fullscreen' | 'overlay';
}

const STAGE_MESSAGES: Record<string, string> = {
  suspense: 'Initializing...',
  import: 'Loading map components...',
  init: 'Loading map...',
};

export function MapLoadingSpinner({
  message,
  stage = 'init',
  variant = 'fullscreen',
}: MapLoadingSpinnerProps) {
  const displayMessage = message ?? STAGE_MESSAGES[stage] ?? 'Loading...';

  const containerClass =
    variant === 'fullscreen'
      ? 'flex items-center justify-center h-screen bg-gray-100'
      : 'absolute inset-0 flex items-center justify-center bg-gray-100 z-10';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
          role="status"
          aria-label={displayMessage}
        />
        <p className="text-gray-600">{displayMessage}</p>
      </div>
    </div>
  );
}
