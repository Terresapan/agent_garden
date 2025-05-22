import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { client } from "@/integrations/sanity/client";
import { PortableText } from "next-sanity"; // Corrected import
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';
import { notFound } from 'next/navigation'; // For handling not found cases

// Helper function to generate image URLs from Sanity image objects
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (!source || !source.asset) {
    return null; // Or a placeholder image URL
  }
  return builder.image(source);
}

interface Post {
  _id: string; // Sanity documents have an _id
  title?: string;
  mainImage?: { asset: { _ref: string } };
  body?: any[]; // Portable Text content
  authorName?: string;
  authorImage?: { asset: { _ref: string } };
  publishedAt?: string;
  slug?: { current: string };
}

interface PageProps {
  params: {
    slug: string;
  };
}

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    mainImage,
    body,
    "authorName": author->name,
    "authorImage": author->image,
    publishedAt,
    slug
  }
`;

// Optional: generateStaticParams to pre-render pages at build time
export async function generateStaticParams() {
  const posts: Pick<Post, 'slug'>[] = await client.fetch(groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
  return posts.map((post) => ({
    slug: post.slug!.current,
  })).filter(Boolean); // Ensure slug is defined
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(postQuery, { slug });
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // Triggers the Next.js 404 page
  }

  // Format date if publishedAt exists
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : 'Date not available';

  const mainImageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1200).height(675).fit('crop').url() : null;
  const authorImageUrl = post.authorImage && post.authorName ? urlFor(post.authorImage)?.width(32).height(32).fit('crop').url() : null;


  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Modern Hero Section */}
      <div className="w-full py-20 lg:py-32">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-10 lg:items-center px-4">
          <div className="flex flex-col gap-6 flex-1">
            <Badge className="w-fit bg-white/10 border border-white/20 text-white/70">
              Blog Post
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-400">
              {post.title || "Untitled Post"}
            </h1>
            {/* Optional: Add a subtitle or excerpt here if available in your data */}
            {/* <p className="max-w-2xl text-lg text-neutral-300">
              {post.excerpt || ""} 
            </p> */}
            <div className="flex items-center gap-4 text-sm text-neutral-400 mt-4">
              {post.authorName && (
                <div className="flex items-center gap-2">
                  {authorImageUrl && (
                    <img
                      src={authorImageUrl}
                      alt={post.authorName}
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                    />
                  )}
                  <span>{post.authorName}</span>
                </div>
              )}
              {post.authorName && <span>•</span>}
              <span>{publishedDate}</span>
            </div>
          </div>
          {mainImageUrl && (
            <div className="flex-1">
              <div className="rounded-lg overflow-hidden aspect-video shadow-lg">
                <img
                  src={mainImageUrl}
                  alt={post.title || "Blog post image"}
                  className="w-full h-full object-cover brightness-75"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Content */}
      {post.body && (
        <article className="flex-grow p-8 max-w-4xl mx-auto space-y-6 prose prose-invert lg:prose-xl prose-img:rounded-lg prose-img:shadow-md">
          <PortableText value={post.body} />
        </article>
      )}
      
      <div className="p-8 max-w-4xl mx-auto">
        <Link href="/" className="text-fuchsia-400 hover:underline block mt-8">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
