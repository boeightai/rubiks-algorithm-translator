# Rubik's Cube Algorithm Translator

A modern web application for learning and practicing Rubik's Cube algorithms with visual notation translation. Convert algorithm notation to step-by-step visual move sequences.

## 🚀 Features

- **Tutorial Mode**: Interactive carousel with 8 fundamental algorithms
- **Visual Sequence**: Step-by-step visual representation of cube moves
- **Mobile Optimized**: Responsive design with touch-friendly controls
- **Offline Support**: Progressive Web App (PWA) with service worker
- **Cross-Platform**: Works on desktop, tablet, and mobile devices
- **Search & Filter**: Find algorithms by category, difficulty, and favorites
- **Visual Learning**: Move-by-move visual sequences with move images

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **Styling**: CSS-in-JS with design system
- **Build Tool**: Vite
- **PWA**: Service Worker for offline functionality
- **Analytics**: Vercel Analytics integration

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd rubiks-translator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Production Deployment

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Build Settings**: 
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Environment Variables**: No additional environment variables required
4. **Deploy**: Vercel will automatically deploy on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# The dist folder contains the production build
# Deploy the contents of dist/ to your web server
```

## 📱 PWA Features

- **Offline Support**: Service worker caches critical resources
- **App Installation**: Users can install as a native app
- **Background Sync**: Handles offline data synchronization
- **Push Notifications**: Ready for future notification features

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality.

### Build Configuration

The application uses Vite for building. Key configurations:

- **Target**: ES2015 for broad browser support
- **Minification**: Terser for optimal bundle size
- **Asset Optimization**: Automatic image optimization
- **Security Headers**: CSP and security headers included

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build and test production build
npm run build
npm run preview
```

## 📊 Performance

- **Bundle Size**: ~309KB (gzipped: ~82KB)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- **Content Security Policy**: Strict CSP headers
- **XSS Protection**: Enabled
- **Frame Options**: DENY
- **Content Type Options**: nosniff
- **Referrer Policy**: strict-origin-when-cross-origin

## 📝 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
- Check the [Issues](https://github.com/your-repo/issues) page
- Create a new issue with detailed information
- Include browser/device information for mobile-specific issues

## 🎯 Roadmap

- [ ] Additional algorithm categories
- [ ] User progress tracking
- [ ] Advanced pattern recognition
- [ ] Social sharing features
- [ ] Multi-language support

---

**Built with ❤️ by Bo Nam**