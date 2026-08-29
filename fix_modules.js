const fs = require('fs');
let code = fs.readFileSync('src/components/site/modules.tsx', 'utf8');

// Replace the watermark span
code = code.replace(
  '<span className="pointer-events-none absolute right-6 top-4 font-serif text-7xl font-bold text-navy/[0.05]">',
  '<span className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-4 font-serif text-5xl sm:text-7xl font-bold text-navy opacity-10">'
);

// Reduce right padding for title so it doesn't squish too much, but enough for the smaller number
code = code.replace(
  '<div className="flex-1 pr-16 sm:pr-24">',
  '<div className="flex-1 pr-14 sm:pr-24">'
);

fs.writeFileSync('src/components/site/modules.tsx', code);
console.log('Fixed modules.tsx');
