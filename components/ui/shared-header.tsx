
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "./button";
import { ButtonColorful } from "./button-colorful";

export const SharedHeader = () => {
  const router = useRouter();

  const handleGetInTouch = () => {
    if (window.location.pathname !== '/') {
      router.push('/');
    } else {
      const introSection = document.getElementById('intro-section');
      if (introSection) {
        introSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="flowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5C5C" />
                <stop offset="100%" stopColor="#3B99FC" />
              </linearGradient>
            </defs>
            <g stroke="url(#flowerGradient)" strokeWidth="8" fill="none">
              <path d="M100 15 C130 35, 140 80, 100 100 C60 80, 70 35, 100 15"/>
              <path d="M185 100 C165 130, 120 140, 100 100 C120 60, 165 70, 185 100"/>
              <path d="M100 185 C70 165, 60 120, 100 100 C140 120, 130 165, 100 185"/>
              <path d="M15 100 C35 70, 80 60, 100 100 C80 140, 35 130, 15 100"/>
              <circle cx="100" cy="100" r="8"/>
            </g>
          </svg>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/agent-garden">
            <ButtonColorful>
              Agent Garden
            </ButtonColorful>
          </Link>
          <Button 
            variant="outline"
            className="border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500/10"
            onClick={handleGetInTouch}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
};
