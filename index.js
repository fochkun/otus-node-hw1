const fs = require('fs');
const path = require('path');

let dirPath = getPath();
let maxDepth = getDepth();


// check if folder exist
if (fs.existsSync(dirPath)) {
    console.log('SHOW STRUCTURE IN:\n', dirPath);
    showStructure(dirPath,0,maxDepth);
} else {
    console.log('can\'t find directory');
    process.exit(1);
}


/**
 * reads process arguments for current folder and first argument of process and join this paths
 * @returns path to target folder
 */
function getPath() {
    const rootPath= path.dirname(process.argv[1])
    if (process.argv[2]) {
        return path.join(rootPath, process.argv[2])
    }
    return rootPath;
}

/**
 * this function search -d or --depth flag in process arguments and returns it.
 * returns -1 if flag isn't exist 
 * @returns {number }depth of search
 */
function getDepth() {
    let depth = -1;
    for (const index in process.argv) {
        const item = process.argv[index];
        const nextItem = process.argv[Number(index) + 1];
        if ((item === '-d' || item === '--depth') &&  nextItem !== undefined) {
            depth = Number(nextItem);
        }
    }
    return depth;
}

/**
 * recursively search for folders and display their structure
 * @param {string} directory current search directory
 * @param {number} depth current depth of search
 * @param {number} maxDepth depth of search.
 * Use -1 for infinity loop
 * @returns {void}
 */
function showStructure(directory,depth, maxDepth) {
    if (depth == maxDepth) {
        return
    }
    let prefix = ''
    for (let idx = 0; idx < depth; idx++) {
        prefix += '|   '
    }
    fs.readdirSync(directory).forEach(file => {
        const newDepth = depth == -1 ? -1 : depth + 1 ;
        const newPath = path.join(directory,file)
        if (fs.lstatSync(newPath).isDirectory()) {
            console.log(prefix+'+---'+file);
            showStructure(newPath,newDepth, maxDepth);
        } else {
            console.log(prefix+'*---'+file);
        }
    });
}
