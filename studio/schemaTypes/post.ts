import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown in listings and meta description fallback.",
    }),
    defineField({ name: "mainImage", title: "Main image", type: "image", options: { hotspot: true } }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "Set a future date to schedule the post.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
  },
});
