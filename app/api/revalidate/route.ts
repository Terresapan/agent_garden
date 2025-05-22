import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Note: `parseBody` from `next-sanity/webhook` could be used for more advanced parsing
// and security (e.g., verifying the webhook signature), but is skipped here for simplicity.

export async function POST(request: NextRequest) {
  const authorizationHeader = request.headers.get('authorization');
  const secret = authorizationHeader?.split(' ')[1]; // Assumes "Bearer <secret>"

  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error('Missing SANITY_REVALIDATE_SECRET environment variable');
    return NextResponse.json({ message: 'Server configuration error: Missing revalidation secret.' }, { status: 500 });
  }

  if (!secret) {
    return NextResponse.json({ message: 'Authorization header missing or malformed.' }, { status: 401 });
  }

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret token.' }, { status: 401 });
  }

  try {
    // Revalidate the homepage
    // Using 'layout' ensures that data fetched in the layout and the page itself is revalidated.
    // This covers the FeaturedBlogPosts component on the homepage.
    revalidatePath('/', 'layout');

    // Revalidate all pages under the /blog path.
    // This should cover individual blog posts (e.g., /blog/my-post) by revalidating their shared layout or parent path.
    // If generateStaticParams is used for /blog/[slug], revalidating the /blog path with 'layout'
    // should signal Next.js to re-evaluate those dynamic segments.
    revalidatePath('/blog', 'layout');
    
    // For more granular control, if the webhook payload contained specific slugs,
    // you would iterate and call revalidatePath for each, e.g.:
    // const body = await request.json(); // Requires parsing and type safety
    // if (body.slug && body.slug.current) {
    //   revalidatePath(`/blog/${body.slug.current}`, 'page');
    // }

    return NextResponse.json({ revalidated: true, now: Date.now(), message: 'Revalidation successful for / and /blog paths.' });

  } catch (err) {
    let errorMessage = 'Error during revalidation';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error('Revalidation error:', err);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
