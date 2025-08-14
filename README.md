# Website Builder - Modern Drag & Drop Website Creator

A beautiful, intuitive website builder inspired by Wix, built with React, Tailwind CSS, and Framer Motion. Create stunning websites with drag-and-drop functionality, live editing, and professional templates.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Minimalist Design**: Clean, spacious layout with soft shadows and rounded corners
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Color Palettes**: Choose from 5 beautiful color schemes (Blue, Purple, Green, Red, Orange)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🧩 **Component Library**
- **Hero Sections**: Eye-catching headers with customizable gradients and CTAs
- **Text Blocks**: Clean content sections with editable titles and body text
- **Image Galleries**: Grid layouts for showcasing images with descriptions
- **Contact Forms**: Professional contact forms with customizable fields
- **Feature Grids**: Organized layouts for services or features

### 🎯 **Core Functionality**
- **Drag & Drop**: Intuitive component reordering and placement
- **Live Editing**: Click any component to edit text, colors, and content
- **Undo/Redo**: Full history management with keyboard shortcuts
- **Auto-Save**: Changes are automatically saved to local storage
- **Component Actions**: Duplicate, delete, and customize components

### 🚀 **Advanced Features**
- **Starter Templates**: Pre-built layouts for quick start
- **Export HTML**: Download your website as a complete HTML file
- **Responsive Preview**: Test your site on different device sizes
- **Keyboard Navigation**: Full accessibility support
- **Smooth Animations**: Beautiful transitions powered by Framer Motion

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Drag & Drop**: React Beautiful DnD
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Poppins)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📖 How to Use

### 1. **Getting Started**
- Choose a starter template or start from scratch
- Use the sidebar to browse available components
- Drag components onto the canvas to build your website

### 2. **Adding Components**
- **From Sidebar**: Click any component to add it to your site
- **Templates**: Load complete starter layouts for inspiration
- **Customization**: Each component comes with sensible defaults

### 3. **Editing Components**
- **Click to Select**: Click any component to select it
- **Live Editing**: Use the edit button to modify content inline
- **Color Picker**: Customize backgrounds and accents
- **Text Editing**: Update titles, descriptions, and button text

### 4. **Managing Your Site**
- **Drag & Drop**: Reorder components by dragging them
- **Undo/Redo**: Use the toolbar buttons or keyboard shortcuts
- **Auto-Save**: All changes are automatically saved
- **Export**: Download your complete website as HTML

### 5. **Customization**
- **Theme Toggle**: Switch between light and dark modes
- **Color Palettes**: Choose from 5 beautiful color schemes
- **Responsive Preview**: Test mobile, tablet, and desktop views

## 🎨 Component Types

### Hero Section
- Customizable title and subtitle
- Call-to-action button
- Gradient background with color picker
- Responsive typography

### Text Block
- Editable section title
- Rich content area
- Clean typography
- Flexible layout options

### Image Gallery
- Grid layout for images
- Customizable image URLs
- Title and description fields
- Responsive grid system

### Contact Form
- Professional form layout
- Customizable title
- Submit button text
- Form validation ready

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + Z**: Undo
- **Ctrl/Cmd + Y**: Redo
- **Delete**: Remove selected component
- **Escape**: Cancel editing mode

## 🔧 Customization

### Adding New Components
1. Extend the `componentTemplates` object in `Sidebar.js`
2. Add the component type to `WebsiteComponent.js`
3. Update the HTML export function in the context

### Styling
- Modify `tailwind.config.js` for custom colors and animations
- Update component styles in `WebsiteComponent.js`
- Customize the design system in `index.css`

### Themes
- Add new color palettes in `ThemeContext.js`
- Extend the theme system for more customization options

## 📱 Responsive Design

The website builder is fully responsive and includes:
- **Mobile Preview**: 320px width simulation
- **Tablet Preview**: 768px width simulation  
- **Desktop Preview**: Full width layout
- **Responsive Components**: All components adapt to screen sizes

## 🚀 Deployment

### Build and Deploy
```bash
npm run build
```

The `build` folder contains your production-ready application.

### Hosting Options
- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Pages**: Deploy directly from your repository
- **Any Static Host**: Upload the build folder to any web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Wix** for inspiration on the user experience
- **Tailwind CSS** for the beautiful design system
- **Framer Motion** for smooth animations
- **React Beautiful DnD** for drag and drop functionality

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Happy Building! 🎉**

Create amazing websites with ease using our modern, intuitive website builder. 