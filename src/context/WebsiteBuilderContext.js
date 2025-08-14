import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WebsiteBuilderContext = createContext();

export const useWebsiteBuilder = () => {
  const context = useContext(WebsiteBuilderContext);
  if (!context) {
    throw new Error('useWebsiteBuilder must be used within a WebsiteBuilderProvider');
  }
  return context;
};

export const WebsiteBuilderProvider = ({ children }) => {
  // Helper function to clean components for serialization
  const cleanComponentsForStorage = useCallback((comps) => {
    return comps.map(comp => ({
      id: comp.id,
      type: comp.type,
      title: comp.title,
      subtitle: comp.subtitle,
      content: comp.content,
      buttonText: comp.buttonText,
      background: comp.background,
      backgroundSecondary: comp.backgroundSecondary,
      imageUrl: comp.imageUrl,
      imagePosition: comp.imagePosition,
      videoUrl: comp.videoUrl,
      thumbnailUrl: comp.thumbnailUrl,
      overlayColor: comp.overlayColor,
      leftContent: comp.leftContent,
      rightContent: comp.rightContent,
      images: comp.images,
      features: comp.features,
      stats: comp.stats,
      testimonials: comp.testimonials,
      plans: comp.plans,
      members: comp.members,
      products: comp.products,
      tabs: comp.tabs,
      events: comp.events,
      fields: comp.fields,
      placeholder: comp.placeholder,
      logo: comp.logo,
      menuItems: comp.menuItems,
      ctaButton: comp.ctaButton,
      items: comp.items,
      currentPage: comp.currentPage,
      totalPages: comp.totalPages,
      question: comp.question,
      answer: comp.answer,
      year: comp.year,
      company: comp.company,
      role: comp.role,
      bio: comp.bio,
      platform: comp.platform,
      posts: comp.posts,
      caption: comp.caption,
      likes: comp.likes,
      height: comp.height,
      description: comp.description
    }));
  }, []);

  const [components, setComponents] = useState(() => {
    const saved = localStorage.getItem('websiteComponents');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDirty, setIsDirty] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (components.length > 0) {
      localStorage.setItem('websiteComponents', JSON.stringify(cleanComponentsForStorage(components)));
      setIsDirty(false);
    }
  }, [components, cleanComponentsForStorage]);

  // History management
  const addToHistory = useCallback((newComponents) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.stringify(cleanComponentsForStorage(newComponents)));
    
    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, cleanComponentsForStorage]);

  const updateComponents = useCallback((newComponents) => {
    console.log('🔄 updateComponents called with:', newComponents);
    setComponents(newComponents);
    addToHistory(newComponents);
    setIsDirty(true);
  }, [addToHistory]);

  const addComponent = useCallback((component) => {
    console.log('🔧 addComponent called with:', component);
    console.log('📊 Current components state:', components);
    const newComponents = [...components, { ...component, id: component.id || Date.now().toString() }];
    console.log('📝 New components array:', newComponents);
    updateComponents(newComponents);
  }, [components, updateComponents]);

  const updateComponent = useCallback((id, updates) => {
    const newComponents = components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    );
    updateComponents(newComponents);
  }, [components, updateComponents]);

  const deleteComponent = useCallback((id) => {
    const newComponents = components.filter(comp => comp.id !== id);
    updateComponents(newComponents);
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  }, [components, updateComponents, selectedComponent]);

  const duplicateComponent = useCallback((id) => {
    const component = components.find(comp => comp.id === id);
    if (component) {
      const duplicated = { ...component, id: Date.now().toString() };
      const index = components.findIndex(comp => comp.id === id);
      const newComponents = [...components];
      newComponents.splice(index + 1, 0, duplicated);
      updateComponents(newComponents);
    }
  }, [components, updateComponents]);

  const moveComponent = useCallback((fromIndex, toIndex) => {
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(fromIndex, 1);
    newComponents.splice(toIndex, 0, movedComponent);
    updateComponents(newComponents);
  }, [components, updateComponents]);

  // Undo/Redo functionality
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setComponents(JSON.parse(history[newIndex]));
      setIsDirty(false);
    }
  }, [canUndo, historyIndex, history]);

  const redo = useCallback(() => {
    if (canRedo) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setComponents(JSON.parse(history[newIndex]));
      setIsDirty(false);
    }
  }, [canRedo, historyIndex, history]);

  // Clear website
  const clearWebsite = useCallback(() => {
    setComponents([]);
    setSelectedComponent(null);
    setHistory([]);
    setHistoryIndex(-1);
    setIsDirty(false);
    localStorage.removeItem('websiteComponents');
  }, []);

  // Export functionality
  const exportWebsite = useCallback(() => {
    const html = generateHTML(components);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [components]);

  // Helper function to convert Tailwind gradient classes to CSS
  const convertTailwindToCSS = (tailwindClass) => {
    if (!tailwindClass) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    // Handle common Tailwind gradients
    if (tailwindClass.includes('bg-gradient-to-r')) {
      if (tailwindClass.includes('from-blue-600') && tailwindClass.includes('to-purple-600')) {
        return 'linear-gradient(to right, #2563eb, #9333ea)';
      } else if (tailwindClass.includes('from-green-600') && tailwindClass.includes('to-blue-600')) {
        return 'linear-gradient(to right, #16a34a, #2563eb)';
      } else if (tailwindClass.includes('from-purple-600') && tailwindClass.includes('to-pink-600')) {
        return 'linear-gradient(to right, #9333ea, #db2777)';
      } else if (tailwindClass.includes('from-red-600') && tailwindClass.includes('to-orange-600')) {
        return 'linear-gradient(to right, #dc2626, #ea580c)';
      } else if (tailwindClass.includes('from-indigo-600') && tailwindClass.includes('to-purple-600')) {
        return 'linear-gradient(to right, #4f46e5, #9333ea)';
      }
    } else if (tailwindClass.includes('bg-gradient-to-br')) {
      if (tailwindClass.includes('from-blue-600') && tailwindClass.includes('to-purple-600')) {
        return 'linear-gradient(to bottom right, #2563eb, #9333ea)';
      }
    } else if (tailwindClass.includes('bg-gradient-to-t')) {
      if (tailwindClass.includes('from-blue-600') && tailwindClass.includes('to-purple-600')) {
        return 'linear-gradient(to top, #2563eb, #9333ea)';
      }
    }
    
    // If it's already a CSS gradient, return as is
    if (tailwindClass.includes('linear-gradient') || tailwindClass.includes('radial-gradient')) {
      return tailwindClass;
    }
    
    // If it's a solid color class, convert to hex
    if (tailwindClass.includes('bg-blue-')) {
      return '#2563eb';
    } else if (tailwindClass.includes('bg-purple-')) {
      return '#9333ea';
    } else if (tailwindClass.includes('bg-green-')) {
      return '#16a34a';
    } else if (tailwindClass.includes('bg-red-')) {
      return '#dc2626';
    } else if (tailwindClass.includes('bg-gray-')) {
      return '#6b7280';
    }
    
    // Default fallback
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  const generateHTML = (comps) => {
    const componentHTML = comps.map(comp => {
      switch (comp.type) {
        case 'hero':
          return `
            <section class="hero-section" style="background: ${convertTailwindToCSS(comp.background)}; padding: 80px 20px; text-align: center; color: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: bold;">${comp.title || 'Welcome to Our Website'}</h1>
                <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">${comp.subtitle || 'Create something amazing with our website builder'}</p>
                <button style="background: white; color: #333; padding: 12px 24px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer;">${comp.buttonText || 'Get Started'}</button>
              </div>
            </section>
          `;
        case 'text':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 800px; margin: 0 auto;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.title || 'Section Title'}</h2>
                <p style="font-size: 1.1rem; line-height: 1.6; color: #666;">${comp.content || 'Your content goes here.'}</p>
              </div>
            </section>
          `;
        case 'grid':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Features'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                  ${comp.features && comp.features.length > 0 ? comp.features.map(feature => `
                    <div style="background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">${feature.icon || '✨'}</div>
                      <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">${feature.title || 'Feature'}</h3>
                      <p style="color: #666; line-height: 1.6;">${feature.description || 'Feature description'}</p>
                    </div>
                  `).join('') : '<p style="text-align: center; color: #666;">No features added yet</p>'}
                </div>
              </div>
            </section>
          `;
        case 'gallery':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Image Gallery'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                  ${comp.images && comp.images.length > 0 ? comp.images.map(img => `
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                              <img src="${typeof img === 'string' ? img : (img.url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center')}" alt="Gallery Image" style="width: 100%; height: 250px; object-fit: cover;">
                    </div>
                  `).join('') : '<p style="text-align: center; color: #666;">No images added yet</p>'}
                </div>
              </div>
            </section>
          `;
        case 'testimonials':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Testimonials'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                  ${comp.testimonials && comp.testimonials.length > 0 ? comp.testimonials.map(testimonial => `
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; text-align: center;">
                      <p style="font-style: italic; margin-bottom: 1rem; color: #666; line-height: 1.6;">"${testimonial.content || 'Amazing service!'}"</p>
                      <div style="font-weight: 600; color: #333;">${testimonial.name || 'Client Name'}</div>
                      <div style="color: #666; font-size: 0.9rem;">${testimonial.role || ''} ${testimonial.company ? `at ${testimonial.company}` : ''}</div>
                    </div>
                  `).join('') : '<p style="text-align: center; color: #666;">No testimonials added yet</p>'}
                </div>
              </div>
            </section>
          `;
        case 'contact':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 600px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.title || 'Contact Us'}</h2>
                ${comp.subtitle ? `<p style="text-align: center; font-size: 1.1rem; margin-bottom: 3rem; color: #666;">${comp.subtitle}</p>` : ''}
                <form style="display: flex; flex-direction: column; gap: 20px;">
                  ${comp.fields && comp.fields.length > 0 ? comp.fields.map(field => {
                    if (field.type === 'textarea') {
                      return `<textarea placeholder="${field.placeholder || field.label}" rows="5" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>`;
                    } else {
                      return `<input type="${field.type || 'text'}" placeholder="${field.placeholder || field.label}" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem;">`;
                    }
                  }).join('') : `
                    <input type="text" placeholder="Your Name" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem;">
                    <input type="email" placeholder="Your Email" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem;">
                    <textarea placeholder="Your Message" rows="5" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>
                  `}
                  <button type="submit" style="background: #0ea5e9; color: white; padding: 15px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer;">Send Message</button>
                </form>
              </div>
            </section>
          `;
        case 'newsletter':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 600px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.title || 'Stay Updated'}</h2>
                ${comp.subtitle ? `<p style="font-size: 1.1rem; margin-bottom: 2rem; color: #666;">${comp.subtitle}</p>` : ''}
                <div style="display: flex; gap: 10px; max-width: 400px; margin: 0 auto;">
                  <input type="email" placeholder="${comp.placeholder || 'Enter your email'}" style="flex: 1; padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem;">
                  <button style="background: #0ea5e9; color: white; padding: 15px 24px; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">Subscribe</button>
                </div>
              </div>
            </section>
          `;
        case 'product-grid':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Products'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
                  ${comp.products && comp.products.length > 0 ? comp.products.map(product => `
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e1e5e9;">
                                             <img src="${product.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center'}" alt="${product.name}" style="width: 100%; height: 250px; object-fit: cover;">
                      <div style="padding: 20px;">
                        <h3 style="margin: 0 0 10px 0; color: #333; font-size: 1.3rem;">${product.name || 'Product Name'}</h3>
                        <p style="margin: 0 0 15px 0; color: #666;">${product.description || 'Product description'}</p>
                        <div style="font-size: 1.5rem; font-weight: 600; color: #0ea5e9;">${product.price || '$99'}</div>
                      </div>
                    </div>
                  `).join('') : '<p style="text-align: center; color: #666;">No products added yet</p>'}
                </div>
              </div>
            </section>
          `;
        case 'team':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Our Team'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                  ${comp.members && comp.members.length > 0 ? comp.members.map(member => `
                    <div style="background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                             <img src="${member.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=center'}" alt="${member.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem;">
                      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #333;">${member.name || 'Team Member'}</h3>
                      <div style="color: #0ea5e9; font-weight: 600; margin-bottom: 0.5rem;">${member.role || 'Role'}</div>
                      <p style="color: #666; line-height: 1.6;">${member.bio || 'Team member bio'}</p>
                    </div>
                  `).join('') : '<p style="text-align: center; color: #666;">No team members added yet</p>'}
                </div>
              </div>
            </section>
          `;
        case 'social-feed':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Social Feed'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                  ${comp.posts && comp.posts.length > 0 ? comp.posts.map(post => `
                    <div style="background: #f8f9fa; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                             <img src="${post.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center'}" alt="Social post" style="width: 100%; height: 250px; object-fit: cover;">
                      <div style="padding: 20px;">
                        <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">${post.caption || 'Post caption'}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; color: #999; font-size: 0.9rem;">
                          <span>❤️ ${post.likes || '0'}</span>
                          <span>${comp.platform || 'Social Media'}</span>
                        </div>
                      </div>
                    </div>
                  `).join('') : '<p style="text-align: center; color: #666;">No posts added yet</p>'}
                </div>
              </div>
            </section>
          `;
        case 'stats':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Statistics'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
                  ${comp.stats && comp.stats.length > 0 ? comp.stats.map(stat => `
                    <div style="background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <div style="font-size: 3rem; font-weight: bold; color: #0ea5e9; margin-bottom: 0.5rem;">${stat.value || '100'}</div>
                      <div style="color: #666; font-size: 1.1rem;">${stat.label || 'Stat Label'}</div>
                    </div>
                  `).join('') : '<p style="text-align: center; color: #666;">No stats added yet</p>'}
                </div>
              </div>
            </section>
          `;
        case 'video-section':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: #333;">${comp.title || 'Video Section'}</h2>
                ${comp.subtitle ? `<p style="font-size: 1.1rem; margin-bottom: 2rem; color: #666;">${comp.subtitle}</p>` : ''}
                <div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto;">
                  <video controls style="width: 100%; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);">
                    <source src="${comp.videoUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center'}" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </section>
          `;
        case 'image-text-overlay':
          return `
            <section style="padding: 0; position: relative; height: ${comp.height || '500px'}; overflow: hidden;">
                                <img src="${comp.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=500&fit=crop&crop=center'}" alt="Background" style="width: 100%; height: 100%; object-fit: cover;">
              <div style="position: absolute; inset: 0; background: ${comp.overlayColor || 'rgba(0,0,0,0.5)'}; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center; color: white; padding: 40px;">
                  <h2 style="font-size: 3rem; margin-bottom: 1rem; font-weight: bold;">${comp.title || 'Overlay Title'}</h2>
                  <p style="font-size: 1.25rem; opacity: 0.9;">${comp.subtitle || 'Overlay subtitle'}</p>
                </div>
              </div>
            </section>
          `;
        case 'product-detail':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;">
                  <div>
                                         <img src="${comp.imageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop&crop=center'}" alt="${comp.name || 'Product'}" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  </div>
                  <div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.name || 'Product Name'}</h1>
                    <div style="font-size: 2rem; font-weight: bold; color: #0ea5e9; margin-bottom: 2rem;">${comp.price || '$199'}</div>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #666; margin-bottom: 2rem;">${comp.description || 'Product description'}</p>
                    <div style="margin-bottom: 2rem;">
                      <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: #333;">Features:</h3>
                      <ul style="list-style: none; padding: 0;">
                        ${comp.features && comp.features.length > 0 ? comp.features.map(feature => `
                          <li style="padding: 8px 0; color: #666;">✅ ${feature}</li>
                        `).join('') : '<li style="padding: 8px 0; color: #666;">✅ Feature 1</li>'}
                      </ul>
                    </div>
                    <button style="background: #0ea5e9; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer;">Add to Cart</button>
                  </div>
                </div>
              </div>
            </section>
          `;
        case 'navbar':
          return `
            <nav style="background: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;">
              <div class="container" style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #333;">${comp.logo || 'Your Logo'}</div>
                <div style="display: flex; gap: 30px;">
                  ${comp.menuItems && comp.menuItems.length > 0 ? comp.menuItems.map(item => `
                    <a href="#" style="text-decoration: none; color: #666; font-weight: 500; transition: color 0.2s;">${item}</a>
                  `).join('') : `
                    <a href="#" style="text-decoration: none; color: #666; font-weight: 500;">Home</a>
                    <a href="#" style="text-decoration: none; color: #666; font-weight: 500;">About</a>
                    <a href="#" style="text-decoration: none; color: #666; font-weight: 500;">Services</a>
                    <a href="#" style="text-decoration: none; color: #666; font-weight: 500;">Contact</a>
                  `}
                </div>
              </div>
            </nav>
          `;
        case 'accordion':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 800px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'FAQ'}</h2>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                  ${comp.items && comp.items.length > 0 ? comp.items.map(item => `
                    <div style="border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden;">
                      <div style="padding: 20px; background: #f8f9fa; font-weight: 600; color: #333; cursor: pointer;">${item.question || 'Question?'}</div>
                      <div style="padding: 20px; color: #666; line-height: 1.6;">${item.answer || 'Answer goes here.'}</div>
                    </div>
                  `).join('') : `
                    <div style="border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden;">
                      <div style="padding: 20px; background: #f8f9fa; font-weight: 600; color: #333;">Frequently Asked Question?</div>
                      <div style="padding: 20px; color: #666; line-height: 1.6;">This is the answer to the frequently asked question.</div>
                    </div>
                  `}
                </div>
              </div>
            </section>
          `;
        case 'tabs':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 800px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Tabs Section'}</h2>
                <div style="display: flex; flex-direction: column; gap: 20px;">
                  ${comp.tabs && comp.tabs.length > 0 ? comp.tabs.map(tab => `
                    <div style="border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden;">
                      <div style="padding: 20px; background: #f8f9fa; font-weight: 600; color: #333;">${tab.title || 'Tab Title'}</div>
                      <div style="padding: 20px; color: #666; line-height: 1.6;">${tab.content || 'Tab content goes here.'}</div>
                    </div>
                  `).join('') : `
                    <div style="border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden;">
                      <div style="padding: 20px; background: #f8f9fa; font-weight: 600; color: #333;">Tab 1</div>
                      <div style="padding: 20px; color: #666; line-height: 1.6;">Content for tab 1.</div>
                    </div>
                  `}
                </div>
              </div>
            </section>
          `;
        case 'timeline':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 800px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Timeline'}</h2>
                <div style="position: relative;">
                  ${comp.events && comp.events.length > 0 ? comp.events.map((event, index) => `
                    <div style="display: flex; margin-bottom: 30px; position: relative;">
                      <div style="width: 60px; height: 60px; background: #0ea5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 20px; flex-shrink: 0;">${event.year || '2024'}</div>
                      <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex: 1;">
                        <h3 style="margin: 0 0 10px 0; color: #333;">${event.title || 'Event Title'}</h3>
                        <p style="margin: 0; color: #666; line-height: 1.6;">${event.description || 'Event description'}</p>
                      </div>
                    </div>
                  `).join('') : `
                    <div style="display: flex; margin-bottom: 30px;">
                      <div style="width: 60px; height: 60px; background: #0ea5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 20px;">2024</div>
                      <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex: 1;">
                        <h3 style="margin: 0 0 10px 0; color: #333;">Sample Event</h3>
                        <p style="margin: 0; color: #666;">Sample event description.</p>
                      </div>
                    </div>
                  `}
                </div>
              </div>
            </section>
          `;
        case 'clients':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Our Clients'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; align-items: center;">
                  ${comp.items && comp.items.length > 0 ? comp.items.map(item => `
                    <div style="text-align: center; padding: 20px;">
                                             <img src="${item.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=80&fit=crop&crop=center'}" alt="${item.name || 'Client'}" style="max-width: 150px; height: auto; filter: grayscale(100%); opacity: 0.7;">
                    </div>
                  `).join('') : `
                    <div style="text-align: center; padding: 20px;">
                      <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=80&fit=crop&crop=center" alt="Client 1" style="max-width: 150px; height: auto; filter: grayscale(100%); opacity: 0.7;">
                    </div>
                  `}
                </div>
              </div>
            </section>
          `;
        case 'breadcrumbs':
          return `
            <section style="padding: 20px; background: #f8f9fa; border-bottom: 1px solid #e1e5e9;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <nav style="display: flex; gap: 10px; align-items: center; font-size: 0.9rem;">
                  ${comp.items && comp.items.length > 0 ? comp.items.map((item, index) => `
                    <span style="color: #666;">
                      ${index > 0 ? ' / ' : ''}
                      <a href="#" style="color: #0ea5e9; text-decoration: none;">${item}</a>
                    </span>
                  `).join('') : `
                    <a href="#" style="color: #0ea5e9; text-decoration: none;">Home</a>
                    <span style="color: #666;"> / </span>
                    <span style="color: #666;">Current Page</span>
                  `}
                </nav>
              </div>
            </section>
          `;
        case 'pagination':
          return `
            <section style="padding: 40px 20px; background: white;">
              <div class="container" style="max-width: 600px; margin: 0 auto;">
                <div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
                  <button style="padding: 10px 15px; border: 1px solid #e1e5e9; background: white; color: #666; border-radius: 6px; cursor: pointer;">Previous</button>
                  <span style="padding: 10px 15px; background: #0ea5e9; color: white; border-radius: 6px;">${comp.currentPage || 1}</span>
                  <span style="padding: 10px 15px; color: #666;">of ${comp.totalPages || 5}</span>
                  <button style="padding: 10px 15px; border: 1px solid #e1e5e9; background: white; color: #666; border-radius: 6px; cursor: pointer;">Next</button>
                </div>
              </div>
            </section>
          `;
        case 'contact-advanced':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;">
                  <div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.title || 'Get In Touch'}</h2>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #666; margin-bottom: 2rem;">${comp.subtitle || 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'}</p>
                    <div style="margin-bottom: 2rem;">
                      <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: #333;">Contact Information</h3>
                      <p style="color: #666; margin-bottom: 0.5rem;">📧 info@example.com</p>
                      <p style="color: #666; margin-bottom: 0.5rem;">📞 +1 (555) 123-4567</p>
                      <p style="color: #666;">📍 123 Main St, City, State 12345</p>
                    </div>
                  </div>
                  <div>
                    <form style="display: flex; flex-direction: column; gap: 20px;">
                      ${comp.fields && comp.fields.length > 0 ? comp.fields.map(field => {
                        if (field.type === 'textarea') {
                          return `<textarea placeholder="${field.placeholder || field.label}" rows="5" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>`;
                        } else {
                          return `<input type="${field.type || 'text'}" placeholder="${field.placeholder || field.label}" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem;">`;
                        }
                      }).join('') : `
                        <input type="text" placeholder="Your Name" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem;">
                        <input type="email" placeholder="Your Email" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem;">
                        <input type="text" placeholder="Subject" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem;">
                        <textarea placeholder="Your Message" rows="5" style="padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>
                      `}
                      <button type="submit" style="background: #0ea5e9; color: white; padding: 15px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer;">Send Message</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          `;
        case 'pricing':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Pricing Plans'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                  ${comp.plans && comp.plans.length > 0 ? comp.plans.map(plan => `
                    <div style="background: white; padding: 40px; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(0,0,0,0.1); border: 2px solid ${plan.featured ? '#0ea5e9' : '#e1e5e9'}; position: relative;">
                      ${plan.featured ? '<div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #0ea5e9; color: white; padding: 8px 20px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Most Popular</div>' : ''}
                      <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: #333;">${plan.name || 'Plan Name'}</h3>
                      <div style="font-size: 3rem; font-weight: bold; color: #0ea5e9; margin-bottom: 1rem;">${plan.price || '$29'}</div>
                      <p style="color: #666; margin-bottom: 2rem;">${plan.description || 'Plan description'}</p>
                      <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                        ${plan.features && plan.features.length > 0 ? plan.features.map(feature => `
                          <li style="padding: 8px 0; color: #666;">✅ ${feature}</li>
                        `).join('') : `
                          <li style="padding: 8px 0; color: #666;">✅ Feature 1</li>
                          <li style="padding: 8px 0; color: #666;">✅ Feature 2</li>
                          <li style="padding: 8px 0; color: #666;">✅ Feature 3</li>
                        `}
                      </ul>
                      <button style="background: ${plan.featured ? '#0ea5e9' : 'white'}; color: ${plan.featured ? 'white' : '#0ea5e9'}; padding: 15px 30px; border: 2px solid #0ea5e9; border-radius: 8px; font-size: 1.1rem; cursor: pointer; width: 100%;">Get Started</button>
                    </div>
                  `).join('') : `
                    <div style="background: white; padding: 40px; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
                      <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: #333;">Basic Plan</h3>
                      <div style="font-size: 3rem; font-weight: bold; color: #0ea5e9; margin-bottom: 1rem;">$29</div>
                      <p style="color: #666; margin-bottom: 2rem;">Perfect for getting started</p>
                      <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                        <li style="padding: 8px 0; color: #666;">✅ Basic Feature 1</li>
                        <li style="padding: 8px 0; color: #666;">✅ Basic Feature 2</li>
                        <li style="padding: 8px 0; color: #666;">✅ Basic Feature 3</li>
                      </ul>
                      <button style="background: white; color: #0ea5e9; padding: 15px 30px; border: 2px solid #0ea5e9; border-radius: 8px; font-size: 1.1rem; cursor: pointer; width: 100%;">Get Started</button>
                    </div>
                  `}
                </div>
              </div>
            </section>
          `;
        case 'hero-video':
          return `
            <section style="padding: 0; position: relative; height: 600px; overflow: hidden;">
              <video autoplay muted loop style="width: 100%; height: 100%; object-fit: cover;">
                <source src="${comp.videoUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop&crop=center'}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <div style="position: absolute; inset: 0; background: ${comp.overlayColor || 'rgba(0,0,0,0.5)'}; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center; color: white; padding: 40px;">
                  <h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-weight: bold;">${comp.title || 'Video Hero'}</h1>
                  <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">${comp.subtitle || 'Amazing video background'}</p>
                  <button style="background: white; color: #333; padding: 12px 24px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer;">${comp.buttonText || 'Get Started'}</button>
                </div>
              </div>
            </section>
          `;
        case 'hero-split':
          return `
            <section style="padding: 80px 0; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
                  <div>
                    <h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-weight: bold; color: #333;">${comp.title || 'Split Hero'}</h1>
                    <p style="font-size: 1.25rem; margin-bottom: 2rem; color: #666; line-height: 1.6;">${comp.subtitle || 'Left side content'}</p>
                    <button style="background: #0ea5e9; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer;">${comp.buttonText || 'Learn More'}</button>
                  </div>
                  <div>
                    <img src="${comp.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center'}" alt="Hero Image" style="width: 100%; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);">
                  </div>
                </div>
              </div>
            </section>
          `;
        case 'text-two-column':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;">
                  <div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.leftContent?.title || 'Left Column'}</h2>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #666;">${comp.leftContent?.content || 'Left column content goes here.'}</p>
                  </div>
                  <div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.rightContent?.title || 'Right Column'}</h2>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #666;">${comp.rightContent?.content || 'Right column content goes here.'}</p>
                  </div>
                </div>
              </div>
            </section>
          `;
        case 'text-with-image':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
                  <div style="order: ${comp.imagePosition === 'left' ? '1' : '2'}">
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.title || 'Text with Image'}</h2>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #666;">${comp.content || 'Content goes here with an image alongside.'}</p>
                  </div>
                  <div style="order: ${comp.imagePosition === 'left' ? '2' : '1'}">
                                         <img src="${comp.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center'}" alt="Content Image" style="width: 100%; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);">
                  </div>
                </div>
              </div>
            </section>
          `;
        case 'grid-4':
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || '4-Column Grid'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                  ${comp.features && comp.features.length > 0 ? comp.features.map(feature => `
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; text-align: center;">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">${feature.icon || '✨'}</div>
                      <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">${feature.title || 'Feature'}</h3>
                      <p style="color: #666; line-height: 1.6;">${feature.description || 'Feature description'}</p>
                    </div>
                  `).join('') : `
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; text-align: center;">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
                      <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Feature 1</h3>
                      <p style="color: #666; line-height: 1.6;">Feature description</p>
                    </div>
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; text-align: center;">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                      <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Feature 2</h3>
                      <p style="color: #666; line-height: 1.6;">Feature description</p>
                    </div>
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; text-align: center;">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">💡</div>
                      <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Feature 3</h3>
                      <p style="color: #666; line-height: 1.6;">Feature description</p>
                    </div>
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; text-align: center;">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                      <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Feature 4</h3>
                      <p style="color: #666; line-height: 1.6;">Feature description</p>
                    </div>
                  `}
                </div>
              </div>
            </section>
          `;
        case 'gallery-masonry':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Masonry Gallery'}</h2>
                <div style="columns: 3; column-gap: 20px;">
                  ${comp.images && comp.images.length > 0 ? comp.images.map((img, index) => `
                    <div style="break-inside: avoid; margin-bottom: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <img src="${typeof img === 'string' ? img : (img.url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center')}" alt="Gallery Image ${index + 1}" style="width: 100%; height: auto; display: block;">
                    </div>
                  `).join('') : `
                    <div style="break-inside: avoid; margin-bottom: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center" alt="Gallery Image 1" style="width: 100%; height: auto; display: block;">
                    </div>
                    <div style="break-inside: avoid; margin-bottom: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center" alt="Gallery Image 2" style="width: 100%; height: auto; display: block;">
                    </div>
                    <div style="break-inside: avoid; margin-bottom: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=500&fit=crop&crop=center" alt="Gallery Image 3" style="width: 100%; height: auto; display: block;">
                    </div>
                  `}
                </div>
              </div>
            </section>
          `;
        case 'gallery-carousel':
          return `
            <section style="padding: 60px 20px; background: #f8f9fa;">
              <div class="container" style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">${comp.title || 'Carousel Gallery'}</h2>
                <div style="display: flex; gap: 20px; overflow-x: auto; padding: 20px 0;">
                  ${comp.images && comp.images.length > 0 ? comp.images.map((img, index) => `
                    <div style="flex-shrink: 0; width: 300px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <img src="${typeof img === 'string' ? img : (img.url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center')}" alt="Gallery Image ${index + 1}" style="width: 100%; height: 200px; object-fit: cover;">
                    </div>
                  `).join('') : `
                    <div style="flex-shrink: 0; width: 300px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center" alt="Gallery Image 1" style="width: 100%; height: 200px; object-fit: cover;">
                    </div>
                    <div style="flex-shrink: 0; width: 300px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center" alt="Gallery Image 2" style="width: 100%; height: 200px; object-fit: cover;">
                    </div>
                    <div style="flex-shrink: 0; width: 300px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop&crop=center" alt="Gallery Image 3" style="width: 100%; height: 200px; object-fit: cover;">
                    </div>
                  `}
                </div>
              </div>
            </section>
          `;
        default:
          return `
            <section style="padding: 60px 20px; background: white;">
              <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #333;">${comp.title || 'Section'}</h2>
                <p style="color: #666;">Component type: ${comp.type}</p>
              </div>
            </section>
          `;
      }
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        button { cursor: pointer; transition: all 0.2s ease; }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        input, textarea { transition: border-color 0.2s ease; }
        input:focus, textarea:focus { outline: none; border-color: #0ea5e9 !important; }
        img { max-width: 100%; height: auto; }
        @media (max-width: 768px) {
            h1 { font-size: 2rem !important; }
            h2 { font-size: 2rem !important; }
            .hero-section { padding: 40px 20px !important; }
            .container { padding: 0 15px; }
            .grid { grid-template-columns: 1fr !important; }
        }
    </style>
</head>
<body>
    ${componentHTML}
</body>
</html>`;
  };

  const value = {
    components,
    selectedComponent,
    setSelectedComponent,
    addComponent,
    updateComponent,
    deleteComponent,
    duplicateComponent,
    moveComponent,
    updateComponents,
    clearWebsite,
    exportWebsite,
    undo,
    redo,
    canUndo,
    canRedo,
    isDirty,
  };

  return (
    <WebsiteBuilderContext.Provider value={value}>
      {children}
    </WebsiteBuilderContext.Provider>
  );
}; 