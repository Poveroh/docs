import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { LastUpdated } from "@/components/LastUpdated";
import { getGithubLastEdit } from "fumadocs-core/server";
import { Github } from "lucide-react";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  const time = await getGithubLastEdit({
    owner: "poveroh",
    repo: "docs",
    path: `content/docs/${page.file.path}`,
  });

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        <hr className="mt-4 mb-4" />
        <div className="flex flex-row justify-between items-center">
          {time && <LastUpdated date={time} />}

          <a
            target="_blank"
            href={`https://github.com/poveroh/docs/issues/new?title=Issue%20on%20${encodeURIComponent(
              page.data.title
            )}`}
            className="inline-flex items-center w-fit gap-2 px-3 py-2 rounded-md font-medium border no-underline text-sm [&_svg]:size-4"
          >
            <Github />
            Open an issue
          </a>
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
