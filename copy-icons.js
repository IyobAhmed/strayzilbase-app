import fs from 'fs';
import path from 'path';

const srcPath = path.join(process.cwd(), 'src', 'assets', 'images', 'strayzil_icon_1782367941766.jpg');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy to icon-192.png and icon-512.png
if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, path.join(publicDir, 'icon-192.png'));
  fs.copyFileSync(srcPath, path.join(publicDir, 'icon-512.png'));
  console.log('Successfully copied icons to public directory.');
} else {
  // If not found, write a simple fallback file or warning
  console.warn('Source icon not found at:', srcPath);
}
