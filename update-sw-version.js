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
} else {
  console.error('❌ Could not find version string in service worker');
}