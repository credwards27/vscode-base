// Dependencies
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Recreate __dirname since it's not available in ES modules by default
const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    DIR_ROOT = path.join(__dirname, '..'),
    srcDirPath = path.join(DIR_ROOT, 'src', 'snippets');

let combined = {},
    files;

try {
    files = readdirSync(srcDirPath, { recursive: true });
    files = files.filter(file => !!file.toLowerCase().match(/\.code-snippets$/));
    
    files.forEach((fp) => {
        fp = path.join(srcDirPath, fp);
        
        let fileData = JSON.parse(readFileSync(fp, 'utf8'));
        
        for (let desc in fileData) {
            if (!fileData.hasOwnProperty(desc)) { continue; }

            combined[desc] = fileData[desc];
        }
    });
    
    // Write full snippet dataset to file
    writeFileSync(
        path.join(DIR_ROOT, 'src', 'snippets.code-snippets'),
        JSON.stringify(combined, null, 4) + "\n",
        'utf8'
    );
    
    console.log('✅ Success: Snippets have been combined.');
}
catch (error) {
    console.error('❌ Error combining snippets:', error.message);
}
