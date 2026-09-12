const fs = require('fs');
let html = fs.readFileSync('public/xuanye.html', 'utf8');

// Extract the body content
const bodyMatch = html.match(/<body>([\s\S]*?)<script>/i);
if (!bodyMatch) {
  console.log("Could not find body content");
  process.exit(1);
}

let jsx = bodyMatch[1];
jsx = jsx.replace(/class=/g, 'className=');
jsx = jsx.replace(/<br>/g, '<br />');
jsx = jsx.replace(/<img(.*?)>/g, (match) => {
    if(!match.endsWith('/>')) {
        return match.replace(/>$/, ' />');
    }
    return match;
});
// inline styles style="width:100%;display:block;border:1px solid rgba(200,164,92,.18)"
jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
    const styleObj = p1.split(';').filter(Boolean).reduce((acc, style) => {
        const [key, value] = style.split(':').map(s => s.trim());
        if (key && value) {
            const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            acc[camelKey] = value;
        }
        return acc;
    }, {});
    return `style={${JSON.stringify(styleObj)}}`;
});
jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

let result = `import React, { useEffect, useRef } from 'react';
import CustomVideoPlayer from './CustomVideoPlayer';

export const Xuanye = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    if (containerRef.current) {
      const reveals = containerRef.current.querySelectorAll('.reveal');
      reveals.forEach((el) => io.observe(el));
    }
    return () => io.disconnect();
  }, []);

  return (
    <div className="xuanye-container" ref={containerRef}>
      ${jsx}
    </div>
  );
};
`;

fs.writeFileSync('src/components/Xuanye.tsx', result);
console.log("Converted.");
