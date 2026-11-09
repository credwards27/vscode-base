// Dependencies
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Recreate __dirname since it's not available in ES modules by default
const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  DIR_ROOT = path.join(__dirname, '..');

// File paths
const pkgManifestPath = path.join(DIR_ROOT, 'package.src.json'),
  keybindingsPath = path.join(DIR_ROOT, 'src', 'keybindings.json'),
  outManifestPath = path.join(DIR_ROOT, 'package.json');

try {
  // Read and parse both files
  const packageMerged = JSON.parse(fs.readFileSync(pkgManifestPath, 'utf8')),
    keybindings = JSON.parse(fs.readFileSync(keybindingsPath, 'utf8'));
  
  // Ensure the nested 'contributes' object exists
  if (!packageMerged.contributes) {
    packageMerged.contributes = {};
  }
  
  // Inject the keybindings array
  packageMerged.contributes.keybindings = keybindings;
  
  // Output the beautiful, compiled package.json
  fs.writeFileSync(
    outManifestPath,
    JSON.stringify(packageMerged, null, 2) + "\n",
    'utf8'
  );
  
  console.log('✅ Success: package.json has been compiled with external keybindings.');
}
catch (error) {
  console.error('❌ Error compiling manifest:', error.message);
  process.exit(1);
}
