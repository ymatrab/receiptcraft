export const sanityConfig = {
  // Project id 3pvc71cl (org oX2QzK1jJ). Override per-env with NEXT_PUBLIC_SANITY_PROJECT_ID.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "3pvc71cl",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
};

/** True once a Sanity project id is set — blog pages fall back to empty otherwise. */
export const sanityConfigured = Boolean(sanityConfig.projectId);
