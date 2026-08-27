import React from 'react';

export const Marquee: React.FC = () => {
  const items = ["SOFTWARE ENGINEER", "WEB DEVELOPMENT", "SOFTWARE QA"];
  
  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-transparent py-4 border-y border-purple-200/50">
      <div className="inline-block animate-marquee">
        {/* We repeat the items a few times to ensure seamless infinite scrolling */}
        {[...Array(6)].map((_, groupIdx) => (
          <span key={groupIdx} className="inline-flex items-center">
            {items.map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-sm font-bold tracking-widest text-purple-200/80 uppercase mx-8 drop-shadow-md">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-300/80 shadow-[0_0_8px_rgba(216,180,254,0.8)]"></span>
              </React.Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};
