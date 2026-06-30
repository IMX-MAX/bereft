const fs = require('fs');

const path = 'c:/Users/Bleep/Documents/code/bereft/src/app/page.js';
let content = fs.readFileSync(path, 'utf8');

// Remove import lines
content = content.replace(/const img.*? = "http:\/\/localhost:3845\/assets\/.*?\.svg";\n/g, '');

// Gadients
content = content.replace(/<img alt="" className="block max-w-none size-full" src=\{imgGlowTerracotta\} \/>/g, '<div className="w-full h-full rounded-full bg-[#e26a4f]/20 blur-[120px]" />');
content = content.replace(/<img alt="" className="block max-w-none size-full" src=\{imgGlowNavy\} \/>/g, '<div className="w-full h-full rounded-full bg-[#3e5672]/20 blur-[120px]" />');
content = content.replace(/<img alt="" className="block max-w-none size-full" src=\{imgGlowTan\} \/>/g, '<div className="w-full h-full rounded-full bg-[#d2ab72]/20 blur-[120px]" />');

// Top left Window control dots
content = content.replace(/<img alt="" className="absolute block inset-0 max-w-none size-full" src=\{imgEllipse.*?\} \/>/g, '<div className="w-full h-full rounded-full bg-[#40403e]" />');

// Generic frames: replace with a simple inline icon (ChevronRight or similar) or an empty block
content = content.replace(/<img alt="" className="absolute block inset-0 max-w-none size-full" src=\{imgFrame.*?\} \/>/g, '<div className="w-full h-full bg-[#40403e] rounded-[4px]" />');

// Replace standard icons explicitly based on context
content = content.replace(
  /<div className="w-full h-full bg-\[#40403e\] rounded-\[4px\]" \/>/g, 
  '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Replaced local assets in page.js');
