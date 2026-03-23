const fs = require('fs');

const cssFiles = [
  'src/pages/Home.css',
  'src/components/Navbar.css',
  'src/components/Footer.css'
];

cssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Convert linear gradients on text/buttons to flat colors
  content = content.replace(/background:\s*linear-gradient\([^)]+\)/g, 'background: var(--g1)');
  
  // Clean up webkit text fill
  content = content.replace(/-webkit-background-clip:\s*text;/g, '');
  content = content.replace(/-webkit-text-fill-color:\s*transparent;/g, '');
  content = content.replace(/background-clip:\s*text;/g, 'color: var(--black)');
  
  // Make btn-fire black on white
  content = content.replace(/\.btn-fire\s*\{[^}]+\}/g, `.btn-fire {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--black);
  background: var(--text);
  border: 1px solid var(--text);
  padding: 15px 40px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: opacity .2s, transform .15s;
}`);

  // Make btn-ghost white outlined
  content = content.replace(/\.btn-ghost\s*\{[^}]+\}/g, `.btn-ghost {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--text);
  background: transparent;
  border: 1px solid var(--border-hot);
  padding: 15px 40px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background .2s, border-color .2s;
}`);
  
  // Update btn hovers
  content = content.replace(/\.btn-fire:hover\s*\{[^}]+\}/g, `.btn-fire:hover { opacity: .85; }`);
  content = content.replace(/\.btn-ghost:hover\s*\{[^}]+\}/g, `.btn-ghost:hover { border-color: var(--text); }`);

  // Remove glows
  content = content.replace(/radial-gradient\([^)]+\)/g, 'transparent');

  // Any remaining background: var(--g1); that should be color on .og
  content = content.replace(/\.og\s*\{[\s\S]*?\}/g, `.og {
  color: var(--black);
  background: var(--text);
  padding: 0 4px;
}`);

  // Replace all color rgb with grays
  content = content.replace(/rgba\(\d+,\s*\d+,\s*\d+,/g, 'rgba(255, 255, 255,');

  // Fix Navbar buttons
  content = content.replace(/\.nav-btn-fire\s*\{[^}]+\}/g, `.nav-btn-fire {
    background: var(--text);
    color: var(--black);
    border: none;
    padding: 10px 24px;
    font-size: 11px;
    font-family: var(--font-sans);
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity .15s;
}`);

  content = content.replace(/\.nav-btn-ghost\s*\{[^}]+\}/g, `.nav-btn-ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
    padding: 10px 24px;
    font-size: 11px;
    font-family: var(--font-sans);
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color .15s;
}`);

  fs.writeFileSync(file, content);
});

console.log("Cleanup script completed.");
