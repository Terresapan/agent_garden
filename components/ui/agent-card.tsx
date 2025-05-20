
import { cn } from "@/lib/utils";

interface AgentCardProps {
  title: string;
  description: string;
  category: string;
  imagePath: string;
  link: string;
  className?: string;
}

const AgentCard = ({ title, description, category, imagePath, link, className }: AgentCardProps) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative rounded-xl overflow-hidden block",
        "transition-all duration-300 hover:scale-[1.01]",
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={imagePath} 
          alt={title} 
          className="w-full h-full object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-80"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-end">
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white">
            {category}
          </span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/90">{description}</p>
        </div>
      </div>
    </a>
  );
};

export { AgentCard };
