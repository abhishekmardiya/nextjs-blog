import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Blog } from "@/lib/interface";
import { client, imageUrlParser } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const query = `*[_type == "blog"] | order(_createdAt desc){
    title,
    smallDescription,
    "slug":slug.current,
    titleImage
  }`;

  const res: Blog[] = await client.fetch(query);
  return res;
};

export default async function Home() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data?.map((el) => (
        <Card key={el?.title}>
          <Image
            src={imageUrlParser(el?.titleImage)?.url()}
            alt="Blog Image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />
          <CardContent className="mt-5">
            <h3 className="text-base line-clamp-3 font-bold">{el?.title}</h3>
            <p className="line-clamp-4 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {el?.smallDescription}
            </p>
            {/* asChild --> when we want another component inside as child */}
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${el?.slug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
