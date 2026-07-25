#!/usr/bin/env node

/*
 * Service Worker Version Updater
 * 
 * This script updates the service worker version to force cache refresh
 * Run this before deploying to ensure users get the latest version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swPath = path.join(__dirname, 'public', 'sw.js');
const indexPath = path.join(__dirname, 'index.html');

// Read the service worker file
let swContent = fs.readFileSync(swPath, 'utf8');

// Find and update the version
const versionMatch = swContent.match(/const CACHE_VERSION = 'v(\d+)'/);
if (versionMatch) {
  const currentVersion = parseInt(versionMatch[1]);
  const newVersion = currentVersion + 1;
  
  swContent = swContent.replace(
    /const CACHE_VERSION = 'v\d+'/,
    `const CACHE_VERSION = 'v${newVersion}'`
  );
  
  // Write the updated content back
  fs.writeFileSync(swPath, swContent);

  console.log(`✅ Service Worker version updated from v${currentVersion} to v${newVersion}`);

  // Keep the build-version meta tag in index.html in sync so the deployed
  // version can be confirmed from any device via window.__WOTC_VERSION__
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const metaPattern = /(<meta name="build-version" content=")v\d+(" \/>)/;

  if (metaPattern.test(indexContent)) {
    fs.writeFileSync(indexPath, indexContent.replace(metaPattern, `$1v${newVersion}$2`));
    console.log(`✅ index.html build-version meta tag updated to v${newVersion}`);
  } else {
    console.error('❌ Could not find build-version meta tag in index.html');
    process.exit(1);
  }
} else {
  console.error('❌ Could not find version string in service worker');
  process.exit(1);
}