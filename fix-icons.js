const fs = require('fs');

const path = 'c:/Users/Bleep/Documents/code/bereft/src/app/page.js';
let content = fs.readFileSync(path, 'utf8');

// Add import if missing
if (!content.includes('lucide-react')) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { ChevronRight, Search, Plus, Play, Home, MessageSquare, Bot, Plug, Hash, Zap, Clock, CheckCircle2, Circle, MoreHorizontal, ArrowRight, CornerDownRight } from 'lucide-react';");
}

function replaceSvg(content, sectionName, newIcon) {
  const regex = new RegExp(`(data-name="${sectionName}"[\\s\\S]*?<div[^>]*>\\s*)<svg[\\s\\S]*?<\\/svg>`, 'g');
  return content.replace(regex, `$1${newIcon}`);
}

content = replaceSvg(content, "Search", '<Search size={16} className="text-[#cfdbd5]" />');
content = replaceSvg(content, "Nav/Home", '<Home size={16} className="text-[#cfdbd5]" />');
content = replaceSvg(content, "Nav/Chats", '<MessageSquare size={16} className="text-[#e8eddf]" />');
content = replaceSvg(content, "Nav/Agents", '<Bot size={16} className="text-[#cfdbd5]" />');
content = replaceSvg(content, "Nav/Connections", '<Plug size={16} className="text-[#cfdbd5]" />');
content = replaceSvg(content, "ChatsHeader", '<Plus size={14} className="text-[#9fa8a2]" />');
content = replaceSvg(content, "New", '<Plus size={14} className="text-[#e8eddf]" />');
content = replaceSvg(content, "Chat/Summarize unread Slack", '<Hash size={16} className="text-[#e8eddf]" />');
content = replaceSvg(content, "Chat/Inbox triage — today", '<Hash size={16} className="text-[#cfdbd5]" />');
content = replaceSvg(content, "Chat/Deal flow tracker", '<Hash size={16} className="text-[#cfdbd5]" />');
content = replaceSvg(content, "All chats", '<MessageSquare size={16} className="text-[#9fa8a2]" />');
content = replaceSvg(content, "TopBar", '<Home size={16} className="text-[#cfdbd5]" />');

// Manual fixes for specific icons that don't match exactly by parent data-name
// Start for free ArrowRight
content = content.replace(/(Start for free[\s\S]*?<div[^>]*>\s*)<svg[\s\S]*?<\/svg>/g, '$1<ArrowRight size={16} className="text-[#242423]" />');

// Watch demo Play
content = content.replace(/(Watch demo[\s\S]*?<div[^>]*>\s*)<svg[\s\S]*?<\/svg>/, '$1<Play size={16} className="text-[#e8eddf]" />');

// Replace any remaining generic placeholder SVGs with a ChevronRight
content = content.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*><path d="m9 18 6-6-6-6"\/><\/svg>/g, '<ChevronRight size={16} className="text-[#9fa8a2]" />');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed icons in page.js');
