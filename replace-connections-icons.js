const fs = require('fs');

const path = 'c:/Users/Bleep/Documents/code/bereft/src/app/(app)/connections/page.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/const img.*? = "http:\/\/localhost:3845\/assets\/.*?\.svg";\n/g, '');

content = content.replace(/<img alt="" className="absolute block inset-0 max-w-none size-full" src=\{imgFrame.*?\} \/>/g, '<div className="w-full h-full bg-[#40403e] rounded-[4px]" />');
content = content.replace(
  /<div className="w-full h-full bg-\[#40403e\] rounded-\[4px\]" \/>/g, 
  '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Replaced local assets in connections page');
