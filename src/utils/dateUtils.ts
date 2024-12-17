/**
 * Convert ISO timestamp string to Unix timestamp in milliseconds
 */
export function convertTimestamp(isoString: string): number {
  return Math.floor(new Date(isoString).getTime());
}