# Rubik's Cube Algorithm Translator

A modern web application for learning and practicing Rubik's Cube algorithms with visual notation translation. Convert algorithm notation to step-by-step visual move sequences for those that struggle to learn and internalize the traditional notation system used in speedcubing communities.

**Live Demo**: [https://www.wayofthecube.com](https://www.wayofthecube.com)

## 🚀 Features

### Two Operating Modes
- **Tutorial Mode**: Interactive carousel with essential beginner algorithms
- **Explorer Mode**: Comprehensive database of 109 algorithms with advanced search and filtering

### Core Features
- **Visual Sequence Translation**: Step-by-step visual representation of cube moves with actual move images
- **Pattern Recognition**: Visual pattern images for algorithms (where available)
- **Smart Search**: Find algorithms by name, notation, category, or nicknames
- **Favorites System**: Star and save your frequently used algorithms
- **Theme Toggle**: Light/Dark mode with persistent preference
- **Mobile Optimized**: Responsive design with touch-friendly controls and tabbed interface on mobile
- **Offline Support**: Progressive Web App (PWA) with intelligent caching
- **Cross-Platform**: Works seamlessly on desktop, iPad, and iPhone devices

### Algorithm Categories
- **Utility**: Basic algorithms for beginners (Daisy Edge Flipper, Right/Left Hand Algorithm, etc.) — 8 entries
- **F2L (First Two Layers)**: 13 entries
- **OLL (Orientation of Last Layer)**: 64 entries
- **PLL (Permutation of Last Layer)**: 24 entries

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Inline styles with a shared design system and CSS variables
- **State Management**: React hooks with optimized re-renders
- **Build Tool**: Vite with optimized production builds
- **PWA**: Service Worker v6 for offline functionality
- **Performance**: Lazy loading, memoization, and dynamic image detection

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rubiks-translator.git
cd rubiks-translator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## 🚀 Production Deployment

### Critical: Update Service Worker Before Every Deployment

To ensure users always get the latest version without needing a hard refresh:

```bash
# STEP 1: Update service worker version (REQUIRED)
npm run update-version

# STEP 2: Build the application
npm run build

# STEP 3: Deploy (for Vercel, this happens automatically on push)
git add -A
git commit -m "Your commit message"
git push
```

### Vercel Deployment Configuration

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Build Settings**: 
   - Build Command: `npm run update-version && npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Environment Variables**: None required
4. **Deploy**: Automatic deployment on push to main branch

### Manual Deployment

```bash
# Update service worker version for cache refresh
npm run update-version

# Build the application
npm run build

# Deploy the contents of dist/ to your web server
# Ensure your server supports:
# - HTTPS (required for PWA)
# - Proper MIME types for .js and .json files
# - URL rewriting for single-page application
```

## 📱 Progressive Web App Features

- **Offline Support**: Full functionality without internet connection
- **Intelligent Caching**: Version-based cache management with automatic updates
- **App Installation**: Install as native app on mobile and desktop
- **Auto-Update**: Automatic detection and application of updates
- **Responsive Design**: Optimized layouts for all screen sizes

### Mobile Layout Breakpoints
- **Mobile**: ≤ 768px (single column with tabs)
- **Tablet Portrait**: 768px - 1024px (uses mobile layout)
- **Tablet Landscape/Desktop**: > 1024px (two-column layout)

## 🎨 Adding Content

### Adding New Algorithms
1. Edit `src/data/algorithms.json`:
```json
{
  "id": "algorithm-id",
  "name": "Algorithm Name",
  "notation": "R U R' U'",
  "category": "Utility|F2L|OLL|PLL",
  "difficulty": "beginner|intermediate|advanced",
  "description": "Brief description",
  "nicknames": ["Alternative Name"]
}
```

### Adding Pattern Images
1. Create pattern image: `public/images/patterns/[algorithm-id]-pattern.png`
2. Recommended size: 140x140px
3. Format: PNG with transparent background

### Adding Tutorial Images
1. Create tutorial image: `public/images/moves/[algorithm-id]-tutorial.png`
2. Place in appropriate directory

## 📊 Performance Targets

These are indicative targets; actual results may vary by device, network conditions, and content changes.

- **Bundle Size**: ~294KB (78.6KB gzipped)
- **Lighthouse Score**: 95+ Performance
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.0s
- **Cumulative Layout Shift**: < 0.05
- **Time to Interactive**: < 2.5s

## 🔒 Security Features

Note: A CSP is configured via a meta tag in `index.html`, and additional headers are applied in the local dev server. For production environments (e.g., Vercel), configure your hosting platform to send equivalent HTTP headers.

- **Content Security Policy**: Configured via meta tag
- **XSS Protection**: `X-XSS-Protection: 1; mode=block` (legacy; configure on host if desired)
- **Frame Options**: `X-Frame-Options: DENY` (configure on host)
- **Content Type Options**: `X-Content-Type-Options: nosniff` (configure on host)
- **Referrer Policy**: `strict-origin-when-cross-origin` (configure on host)
- **HTTPS**: `upgrade-insecure-requests` directive in CSP

## 🧪 Development Guidelines

### Code Quality Standards
- No console.log statements in production
- Proper error boundaries for graceful failure
- Memory leak prevention with cleanup in useEffect
- Optimized re-renders with useMemo and useCallback

### Testing Checklist
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] iPhone (Safari, Chrome) - Portrait & Landscape
- [ ] iPad (Safari, Chrome) - Portrait & Landscape
- [ ] Android devices (Chrome, Firefox)
- [ ] Offline functionality
- [ ] Algorithm search and filtering
- [ ] Favorite system persistence
- [ ] Image loading with slow connections
- [ ] Service worker updates

## 🐛 Known Issues & Solutions

### Pattern Images
- Only 5 algorithms currently have pattern images
- App gracefully handles missing images by showing notation only
- Dynamic detection prevents broken image icons

### Mobile Considerations
- iPad portrait mode uses mobile layout for better UX
- Long notation text wraps properly on small screens
- Touch targets meet 44px minimum for accessibility

## 📝 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting (`npm run lint`)
5. Test thoroughly on multiple devices
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and patterns
- Add appropriate error handling
- Consider mobile users in all changes
- Update tests if applicable
- Document any new features

## 📞 Support

For issues or questions:
- Open an issue in this repository's Issues tab
- Include browser/device information for bug reports
- Provide steps to reproduce any issues
- Check existing issues before creating new ones

## 🎯 Roadmap

### Near Term
- [ ] Complete pattern images for all algorithms
- [ ] Add move animation transitions
- [ ] Implement algorithm practice timer
- [ ] Add user preferences persistence

### Long Term
- [ ] User accounts with progress tracking
- [ ] Custom algorithm creation
- [ ] Social sharing and collaboration
- [ ] Multi-language support
- [ ] Advanced pattern recognition training
- [ ] Competition timer integration

## 🙏 Acknowledgments

- Algorithm database curated from speedcubing community resources
- Move images designed for clarity and learning
- Special thanks to the speedcubing community for notation standards

---

**Built with ❤️ by Bo and Hailey Nam**

*Making Rubik's Cube algorithms accessible to visual learners worldwide*