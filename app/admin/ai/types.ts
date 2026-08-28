/**
 * Shared shapes for the AI connections screen.
 *
 * Kept out of actions.ts because that file is "use server": every export there
 * must be an async server action, so a type belongs here instead.
 */
export interface TestResult {
  id: string;
  ok: boolean;
  /** Round-trip time of the test generation. */
  ms: number;
  /** Human-readable outcome — the provider's own error text when it failed. */
  message: string;
}
