import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2024-01-01",
  dataset: "production",
  projectId: "wtf38suc",
  // unless you have caching for your front end, `useCdn` should be `true` for most production environments
  // we use nextjs ISR so we don't need cdn
  useCdn: false,
});

const builder = ImageUrlBuilder(client);

export const imageUrlParser = (source: any) => {
  return builder.image(source);
};
