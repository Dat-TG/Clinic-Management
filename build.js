const fs = require('fs-extra');
const path = require('path');

async function build() {
  try {
    console.log('Building the project...');
    
    const filesToCopy = [
      'server.js',
      'package.json'
    ];
    
    const directoriesToCopy = [
      'bin',
      'controllers',
      'public',
      'routers',
      'views'
    ];
    
    const destDir = path.join(__dirname, 'dist');
    
    // Ensure destination directory exists
    await fs.ensureDir(destDir);
    
    // Copy files
    for (const file of filesToCopy) {
      await fs.copy(path.join(__dirname, file), path.join(destDir, file));
    }
    
    // Copy directories
    for (const dir of directoriesToCopy) {
      await fs.copy(path.join(__dirname, dir), path.join(destDir, dir));
    }
    
    console.log('Build completed successfully.');
  } catch (err) {
    console.error('Error during build:', err);
    process.exit(1);
  }
}

build();