import { DetailedBlog } from "@/lib/interface";
import { client, imageUrlParser } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

const getData = async (slug: string) => {
  const query = `*[_type == "blog" && slug.current=="${slug}"]{
    title,
    content,
    titleImage
  }[0]`;

  const res: DetailedBlog = await client.fetch(query);
  return res;
};

export default async function BlogArticle({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getData(slug);

  return (
    <div className="mt-20">
      <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight md:text-4xl">
        {data?.title}
      </span>
      <Image
        src={imageUrlParser(data?.titleImage)?.url()}
        alt="Blog Image"
        width={800}
        height={800}
        priority
        className="rounded-lg mt-8 border"
      />
      {/* prose --> for tailwind typography */}
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
        <PortableText value={data?.content} />
      </div>
    </div>
  );
}
