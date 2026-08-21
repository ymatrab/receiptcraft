import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
    // Optional, and deliberately empty until a real value exists. An author page
    // carrying an invented job title or a profile link that goes nowhere is
    // worse than one carrying neither — a fabricated expert is the failure mode
    // this whole byline effort exists to avoid.
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      description: "URL for this author's page. Falls back to a slug of the name when empty.",
    }),
    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
      description: 'Real role, e.g. "Founder & Editor". Leave blank rather than inventing one.',
    }),
    defineField({
      name: "sameAs",
      title: "Profiles",
      type: "array",
      of: [{ type: "url" }],
      description:
        "Public profiles that are genuinely this person (LinkedIn, X). Each becomes a sameAs entry in the Person schema, so a wrong link is a false identity claim.",
    }),
  ],
});
