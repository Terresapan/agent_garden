import Link from "next/link";
import { client } from "@/integrations/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';
import { GlareCard } from "@/components/ui/glare-card"; // Assuming this path is correct

// Helper function to generate image URLs from Sanity image objects
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (!source || !source.asset) {
    return null; 
  }
  return builder.image(source);
}

interface BlogPost {
  _id: string;
  title?: string;
  slug?: { current: string };
  mainImage?: { asset: { _ref: string } };
  excerpt?: string;
}

const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    "excerpt": pt::text(body[0]) 
  }[0...3]
`;

export async function FeaturedBlogPosts() {
  const posts: BlogPost[] = await client.fetch(postsQuery);

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Featured{" "}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-fuchsia-500">
            Blog Posts
          </span>
        </h2>
        <p className="text-neutral-400">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Featured{" "}
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-fuchsia-500">
          Blog Posts
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center max-w-6xl mx-auto">
        {posts.map((post) => {
          const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(400).height(300).fit('crop').url() : '/placeholder-image.jpg'; // Provide a fallback placeholder
          const postUrl = post.slug ? `/blog/${post.slug.current}` : '#';

          return (
            <div key={post._id} className="relative w-full transform transition-transform duration-300 hover:-translate-y-1">
              <Link href={postUrl}>
                <GlareCard className="flex flex-col items-center justify-center p-6 text-center relative overflow-hidden min-h-[250px]"> {/* Ensure consistent card height */}
                  {post.mainImage && imageUrl && (
                    <img
                      src={imageUrl}
                      alt={post.title || "Blog post image"}
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                  )}
                  {!post.mainImage && ( // Simple placeholder visual if no image
                    <div className="absolute inset-0 w-full h-full bg-gray-700 opacity-40"></div>
                  )}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {post.title || "Untitled Post"}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-200 line-clamp-3"> {/* line-clamp to limit excerpt length */}
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </GlareCard>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
