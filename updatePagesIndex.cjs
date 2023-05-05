const fs = require('fs/promises');
const path = require('path');
const chokidar = require('chokidar');

const pagesDir = path.join(process.cwd(), 'src/pages');
const indexPath = path.join(pagesDir, 'index.js');

async function generateIndexFile() {
  // Read the contents of the "pages" directory
  const files = await fs.readdir(pagesDir);

  // Filter out any non-JSX files
  const componentFiles = files.filter(file => file.endsWith('.jsx'));

  // Generate the named exports for each component file
  const exports = componentFiles.map(file => {
    const componentName = file === 'index.jsx' ? 'Index' : path.parse(file).name;
    return `export { default as ${componentName} } from './${file}';`;
  }).join('\n');

  // Write the exports to the index.jsx file
  await fs.writeFile(indexPath, exports);
}

// Generate the initial index.jsx file on startup
generateIndexFile();

// Watch the "pages" directory for changes and regenerate the index.jsx file
chokidar.watch(pagesDir).on('all', (event, path) => {
  // if (event === 'add' || event === 'addDir' || event === 'unlink') {
  //   generateIndexFile();
  // }
  if (event === 'add' || event === 'addDir' || event === 'unlink' || event === 'unlinkDir'|| event === 'change' || event === 'change') {
    
    generateIndexFile();

  } else if (event === 'ready') {

    // Ready event
    console.log('Watching for changes...')

  }

});
