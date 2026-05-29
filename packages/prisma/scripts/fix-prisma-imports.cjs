const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..', 'dist', 'generated', 'prisma')

function walk(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.isFile() && full.endsWith('.js')) fixFile(full)
  }
}

function fixFile(file) {
  let s = fs.readFileSync(file, 'utf8')
  // Add .js extension to relative imports/exports that lack an extension
  s = s.replace(
    /(from\s+['\"])(\.(?:\.\/|\/)?[^'\"]+?)(['\"])/g,
    (m, p1, p2, p3) => {
      if (/\.[a-zA-Z0-9]+$/.test(p2)) return m
      return p1 + p2 + '.js' + p3
    },
  )
  s = s.replace(
    /(import\s+\*\s+as\s+[^\s]+\s+from\s+['\"])(\.(?:\.\/|\/)?[^'\"]+?)(['\"])/g,
    (m, p1, p2, p3) => {
      if (/\.[a-zA-Z0-9]+$/.test(p2)) return m
      return p1 + p2 + '.js' + p3
    },
  )

  fs.writeFileSync(file, s, 'utf8')
}

walk(root)
console.log('Fixed Prisma generated imports to include .js extensions')
