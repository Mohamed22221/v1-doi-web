const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const originalContent = content;

    content = content.replace(/from ['"]@components\/routes['"]/g, 'from "@/config/routes"');
    content = content.replace(/from ['"]@\/components\/routes['"]/g, 'from "@/config/routes"');
    content = content.replace(/from ['"]\.\/components\/routes['"]/g, 'from "@/config/routes"');
    content = content.replace(/from ['"]\.\.\/components\/routes['"]/g, 'from "@/config/routes"');
    content = content.replace(/from ['"]\.\.\/\.\.\/components\/routes['"]/g, 'from "@/config/routes"');
    content = content.replace(/from ['"]\.\.\/\.\.\/\.\.\/components\/routes['"]/g, 'from "@/config/routes"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git', '.next'].includes(file)) {
                walk(fullPath);
            }
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            replaceInFile(fullPath);
        }
    });
}

walk('D:\\doi-web\\src');
