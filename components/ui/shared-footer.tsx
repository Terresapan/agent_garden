import { Linkedin, Github, Youtube } from "lucide-react";

export const SharedFooter = () => {
  return (
    <footer className="bg-black/[0.96] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500">
              Terresa Pan
            </h3>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-400">AI Consultant</span>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/terresa-pan-292443245/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-fuchsia-500 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/Terresapan?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-fuchsia-500 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.youtube.com/@Terresa_P"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-fuchsia-500 transition-colors"
            >
              <Youtube size={20} />
            </a>
          </div>

          <div className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
