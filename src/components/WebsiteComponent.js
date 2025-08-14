import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import { Edit2, X, Save, Copy } from 'lucide-react';

const WebsiteComponent = ({ component, isSelected }) => {
  const { updateComponent, deleteComponent, duplicateComponent } = useWebsiteBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const startEditing = () => {
    setEditData({ ...component });
    setIsEditing(true);
  };

  const saveChanges = () => {
    updateComponent(component.id, editData);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'hero':
        return (
          <section 
            className="hero-section relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${component.background || '#667eea'} 0%, ${component.backgroundSecondary || '#764ba2'} 100%)`,
              padding: '80px 20px',
              textAlign: 'center',
              color: 'white'
            }}
          >
            <div className="container mx-auto max-w-4xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="Hero Title"
                  />
                  <input
                    type="text"
                    value={editData.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="input-field text-center text-xl bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="Hero Subtitle"
                  />
                  <input
                    type="text"
                    value={editData.buttonText || ''}
                    onChange={(e) => handleInputChange('buttonText', e.target.value)}
                    className="input-field text-center bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="Button Text"
                  />
                  <div className="flex justify-center space-x-4">
                    <input
                      type="color"
                      value={editData.background || '#667eea'}
                      onChange={(e) => handleInputChange('background', e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="color"
                      value={editData.backgroundSecondary || '#764ba2'}
                      onChange={(e) => handleInputChange('backgroundSecondary', e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    {component.title || 'Welcome to Our Website'}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {component.subtitle || 'Create something amazing with our website builder'}
                  </p>
                  <button className="bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                    {component.buttonText || 'Get Started'}
                  </button>
                </>
              )}
            </div>
          </section>
        );

      case 'hero-video':
        return (
          <section className="hero-section relative overflow-hidden h-screen flex items-center justify-center">
            <video
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover"
              src={component.videoUrl}
            />
            <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-4xl font-bold bg-black/30 border-white/30 text-white placeholder-white/70"
                    placeholder="Video Hero Title"
                  />
                  <input
                    type="text"
                    value={editData.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="input-field text-center text-xl bg-black/30 border-white/30 text-white placeholder-white/70"
                    placeholder="Video Hero Subtitle"
                  />
                  <input
                    type="text"
                    value={editData.buttonText || ''}
                    onChange={(e) => handleInputChange('buttonText', e.target.value)}
                    className="input-field text-center bg-black/30 border-white/30 text-white placeholder-white/70"
                    placeholder="Button Text"
                  />
                  <input
                    type="text"
                    value={editData.videoUrl || ''}
                    onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                    className="input-field text-center bg-black/30 border-white/30 text-white placeholder-white/70"
                    placeholder="Video URL"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    {component.title || 'Amazing Video Background'}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {component.subtitle || 'Create stunning visual impact'}
                  </p>
                  <button className="bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                    {component.buttonText || 'Watch More'}
                  </button>
                </>
              )}
            </div>
          </section>
        );

      case 'hero-split':
        return (
          <section className="hero-section relative overflow-hidden min-h-screen flex items-center">
            <div className="container mx-auto px-4">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${component.imagePosition === 'left' ? 'md:grid-flow-col-dense' : ''}`}>
                {component.imagePosition === 'left' && (
                  <div className="order-2 md:order-1">
                    <img 
                      src={component.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center'} 
                      alt="Hero"
                      className="w-full h-auto rounded-lg shadow-strong"
                    />
                  </div>
                )}
                <div className={`order-1 ${component.imagePosition === 'left' ? 'md:order-2' : ''}`}>
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="input-field text-4xl font-bold"
                        placeholder="Split Hero Title"
                      />
                      <input
                        type="text"
                        value={editData.subtitle || ''}
                        onChange={(e) => handleInputChange('subtitle', e.target.value)}
                        className="input-field text-xl"
                        placeholder="Split Hero Subtitle"
                      />
                      <input
                        type="text"
                        value={editData.buttonText || ''}
                        onChange={(e) => handleInputChange('buttonText', e.target.value)}
                        className="input-field"
                        placeholder="Button Text"
                      />
                      <input
                        type="text"
                        value={editData.imageUrl || ''}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        className="input-field"
                        placeholder="Image URL"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                        {component.title || 'Split Layout Hero'}
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
                        {component.subtitle || 'Content on one side, image on the other'}
                      </p>
                      <button className="btn-primary text-lg px-8 py-4">
                        {component.buttonText || 'Learn More'}
                      </button>
                    </>
                  )}
                </div>
                {component.imagePosition !== 'left' && (
                  <div className="order-3">
                    <img 
                      src={component.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center'} 
                      alt="Hero"
                      className="w-full h-auto rounded-lg shadow-strong"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'text':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-4xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-2xl font-bold"
                    placeholder="Section Title"
                  />
                  <textarea
                    value={editData.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Section content goes here..."
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    {component.title || 'Section Title'}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {component.content || 'Your content goes here. This is a sample text block that you can customize with your own content.'}
                  </p>
                </>
              )}
            </div>
          </section>
        );

      case 'text-two-column':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-2xl font-bold"
                    placeholder="Two Column Title"
                  />
                  <div className="grid md:grid-cols-2 gap-8">
                    <textarea
                      value={editData.leftContent || ''}
                      onChange={(e) => handleInputChange('leftContent', e.target.value)}
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Left column content..."
                    />
                    <textarea
                      value={editData.rightContent || ''}
                      onChange={(e) => handleInputChange('rightContent', e.target.value)}
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Right column content..."
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Two Column Layout'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {component.leftContent || 'Left column content goes here...'}
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {component.rightContent || 'Right column content goes here...'}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'text-with-image':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-2xl font-bold"
                    placeholder="Text with Image Title"
                  />
                  <textarea
                    value={editData.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Content goes here..."
                  />
                  <input
                    type="text"
                    value={editData.imageUrl || ''}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    className="input-field"
                    placeholder="Image URL"
                  />
                </div>
              ) : (
                <div className={`grid md:grid-cols-2 gap-12 items-center ${component.imagePosition === 'left' ? 'md:grid-flow-col-dense' : ''}`}>
                  {component.imagePosition === 'left' && (
                    <div className="order-2 md:order-1">
                      <img 
                        src={component.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop&crop=center'} 
                        alt="Content"
                        className="w-full h-auto rounded-lg shadow-medium"
                      />
                    </div>
                  )}
                  <div className={`order-1 ${component.imagePosition === 'left' ? 'md:order-2' : ''}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                      {component.title || 'Text with Image'}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {component.content || 'Your content with an image alongside it.'}
                    </p>
                  </div>
                  {component.imagePosition !== 'left' && (
                    <div className="order-3">
                      <img 
                        src={component.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop&crop=center'} 
                        alt="Content"
                        className="w-full h-auto rounded-lg shadow-medium"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );

      case 'grid':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Grid Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.features?.[index]?.title || ''}
                          onChange={(e) => {
                            const newFeatures = [...(editData.features || [])];
                            if (!newFeatures[index]) newFeatures[index] = {};
                            newFeatures[index].title = e.target.value;
                            handleInputChange('features', newFeatures);
                          }}
                          className="input-field text-sm"
                          placeholder="Feature Title"
                        />
                        <textarea
                          value={editData.features?.[index]?.description || ''}
                          onChange={(e) => {
                            const newFeatures = [...(editData.features || [])];
                            if (!newFeatures[index]) newFeatures[index] = {};
                            newFeatures[index].description = e.target.value;
                            handleInputChange('features', newFeatures);
                          }}
                          rows={3}
                          className="input-field text-sm resize-none"
                          placeholder="Feature Description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Our Features'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(component.features || []).map((feature, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-medium text-center">
                        {feature.icon && (
                          <div className="text-4xl mb-4">{feature.icon}</div>
                        )}
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                          {feature.title || 'Feature Title'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description || 'Feature description goes here.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'gallery':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Gallery Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.images?.[index]?.url || ''}
                          onChange={(e) => {
                            const newImages = [...(editData.images || [])];
                            if (!newImages[index]) newImages[index] = {};
                            newImages[index].url = e.target.value;
                            handleInputChange('images', newImages);
                          }}
                          className="input-field text-sm"
                          placeholder="Image URL"
                        />
                        <input
                          type="text"
                          value={editData.images?.[index]?.title || ''}
                          onChange={(e) => {
                            const newImages = [...(editData.images || [])];
                            if (!newImages[index]) newImages[index] = {};
                            newImages[index].title = e.target.value;
                            handleInputChange('images', newImages);
                          }}
                          className="input-field text-sm"
                          placeholder="Image Title"
                        />
                        <input
                          type="text"
                          value={editData.images?.[index]?.description || ''}
                          onChange={(e) => {
                            const newImages = [...(editData.images || [])];
                            if (!newImages[index]) newImages[index] = {};
                            newImages[index].description = e.target.value;
                            handleInputChange('images', newImages);
                          }}
                          className="input-field text-sm"
                          placeholder="Image Description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Image Gallery'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(component.images || []).map((img, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-medium">
                        <img 
                          src={img.url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center'} 
                          alt={img.alt || img.title || 'Gallery Image'}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {img.title || 'Image Title'}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {img.description || 'Image description goes here.'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'contact':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-2xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Contact Form Title"
                  />
                  <input
                    type="text"
                    value={editData.buttonText || ''}
                    onChange={(e) => handleInputChange('buttonText', e.target.value)}
                    className="input-field text-center"
                    placeholder="Submit Button Text"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Contact Us'}
                  </h2>
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="input-field"
                      disabled
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="input-field"
                      disabled
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      className="input-field resize-none"
                      disabled
                    />
                    <button
                      type="submit"
                      className="btn-primary w-full py-4 text-lg"
                      disabled
                    >
                      {component.buttonText || 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </section>
        );

      case 'newsletter':
        return (
          <section className="py-16 px-4 bg-primary-50 dark:bg-primary-900/20">
            <div className="container mx-auto max-w-2xl text-center">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Newsletter Title"
                  />
                  <input
                    type="text"
                    value={editData.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="input-field text-center"
                    placeholder="Newsletter Subtitle"
                  />
                  <input
                    type="text"
                    value={editData.buttonText || ''}
                    onChange={(e) => handleInputChange('buttonText', e.target.value)}
                    className="input-field text-center"
                    placeholder="Button Text"
                  />
                  <input
                    type="text"
                    value={editData.placeholder || ''}
                    onChange={(e) => handleInputChange('placeholder', e.target.value)}
                    className="input-field text-center"
                    placeholder="Input Placeholder"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    {component.title || 'Stay Updated'}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    {component.subtitle || 'Subscribe to our newsletter for the latest updates'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder={component.placeholder || 'Enter your email'}
                      className="input-field flex-1"
                      disabled
                    />
                    <button className="btn-primary whitespace-nowrap">
                      {component.buttonText || 'Subscribe'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Testimonials Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[0, 1].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.testimonials?.[index]?.name || ''}
                          onChange={(e) => {
                            const newTestimonials = [...(editData.testimonials || [])];
                            if (!newTestimonials[index]) newTestimonials[index] = {};
                            newTestimonials[index].name = e.target.value;
                            handleInputChange('testimonials', newTestimonials);
                          }}
                          className="input-field text-sm"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={editData.testimonials?.[index]?.role || ''}
                          onChange={(e) => {
                            const newTestimonials = [...(editData.testimonials || [])];
                            if (!newTestimonials[index]) newTestimonials[index] = {};
                            newTestimonials[index].role = e.target.value;
                            handleInputChange('testimonials', newTestimonials);
                          }}
                          className="input-field text-sm"
                          placeholder="Role"
                        />
                        <input
                          type="text"
                          value={editData.testimonials?.[index]?.company || ''}
                          onChange={(e) => {
                            const newTestimonials = [...(editData.testimonials || [])];
                            if (!newTestimonials[index]) newTestimonials[index] = {};
                            newTestimonials[index].company = e.target.value;
                            handleInputChange('testimonials', newTestimonials);
                          }}
                          className="input-field text-sm"
                          placeholder="Company"
                        />
                        <textarea
                          value={editData.testimonials?.[index]?.content || ''}
                          onChange={(e) => {
                            const newTestimonials = [...(editData.testimonials || [])];
                            if (!newTestimonials[index]) newTestimonials[index] = {};
                            newTestimonials[index].content = e.target.value;
                            handleInputChange('testimonials', newTestimonials);
                          }}
                          rows={3}
                          className="input-field text-sm resize-none"
                          placeholder="Testimonial Content"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'What Our Clients Say'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(component.testimonials || []).map((testimonial, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-medium">
                        <div className="text-4xl text-primary-500 mb-4">"</div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic">
                          {testimonial.content || 'Amazing service and results!'}
                        </p>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name || 'John Doe'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role || 'CEO'}, {testimonial.company || 'Tech Corp'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'pricing':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Pricing Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.plans?.[index]?.name || ''}
                          onChange={(e) => {
                            const newPlans = [...(editData.plans || [])];
                            if (!newPlans[index]) newPlans[index] = {};
                            newPlans[index].name = e.target.value;
                            handleInputChange('plans', newPlans);
                          }}
                          className="input-field text-sm"
                          placeholder="Plan Name"
                        />
                        <input
                          type="text"
                          value={editData.plans?.[index]?.price || ''}
                          onChange={(e) => {
                            const newPlans = [...(editData.plans || [])];
                            if (!newPlans[index]) newPlans[index] = {};
                            newPlans[index].price = e.target.value;
                            handleInputChange('plans', newPlans);
                          }}
                          className="input-field text-sm"
                          placeholder="Price"
                        />
                        <textarea
                          value={editData.plans?.[index]?.features?.join('\n') || ''}
                          onChange={(e) => {
                            const newPlans = [...(editData.plans || [])];
                            if (!newPlans[index]) newPlans[index] = {};
                            newPlans[index].features = e.target.value.split('\n').filter(f => f.trim());
                            handleInputChange('plans', newPlans);
                          }}
                          rows={4}
                          className="input-field text-sm resize-none"
                          placeholder="Features (one per line)"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Choose Your Plan'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(component.plans || []).map((plan, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-medium text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {plan.name || 'Plan Name'}
                        </h3>
                        <div className="text-4xl font-bold text-primary-600 mb-6">
                          {plan.price || '$29'}
                        </div>
                        <ul className="space-y-3 mb-8">
                          {(plan.features || []).map((feature, fIndex) => (
                            <li key={fIndex} className="text-gray-600 dark:text-gray-400">
                              ✓ {feature}
                            </li>
                          ))}
                        </ul>
                        <button className="btn-primary w-full">
                          Get Started
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'grid-4':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="4-Column Grid Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.features?.[index]?.title || ''}
                          onChange={(e) => {
                            const newFeatures = [...(editData.features || [])];
                            if (!newFeatures[index]) newFeatures[index] = {};
                            newFeatures[index].title = e.target.value;
                            handleInputChange('features', newFeatures);
                          }}
                          className="input-field text-sm"
                          placeholder="Feature Title"
                        />
                        <textarea
                          value={editData.features?.[index]?.description || ''}
                          onChange={(e) => {
                            const newFeatures = [...(editData.features || [])];
                            if (!newFeatures[index]) newFeatures[index] = {};
                            newFeatures[index].description = e.target.value;
                            handleInputChange('features', newFeatures);
                          }}
                          rows={3}
                          className="input-field text-sm resize-none"
                          placeholder="Feature Description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Four Column Features'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {(component.features || []).map((feature, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-medium text-center">
                        {feature.icon && (
                          <div className="text-4xl mb-4">{feature.icon}</div>
                        )}
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                          {feature.title || 'Feature Title'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {feature.description || 'Feature description goes here.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'gallery-masonry':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Masonry Gallery Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.images?.[index]?.url || ''}
                          onChange={(e) => {
                            const newImages = [...(editData.images || [])];
                            if (!newImages[index]) newImages[index] = {};
                            newImages[index].url = e.target.value;
                            handleInputChange('images', newImages);
                          }}
                          className="input-field text-sm"
                          placeholder="Image URL"
                        />
                        <input
                          type="text"
                          value={editData.images?.[index]?.title || ''}
                          onChange={(e) => {
                            const newImages = [...(editData.images || [])];
                            if (!newImages[index]) newImages[index] = {};
                            newImages[index].title = e.target.value;
                            handleInputChange('images', newImages);
                          }}
                          className="input-field text-sm"
                          placeholder="Image Title"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Masonry Gallery'}
                  </h2>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {(component.images || []).map((img, index) => (
                      <div key={index} className="break-inside-avoid bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-medium">
                        <img 
                          src={img.url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center'} 
                          alt={img.title || 'Gallery Image'}
                          className="w-full h-auto"
                        />
                        {img.title && (
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {img.title}
                            </h3>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'gallery-carousel':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Carousel Gallery Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.images?.[index]?.url || ''}
                          onChange={(e) => {
                            const newImages = [...(editData.images || [])];
                            if (!newImages[index]) newImages[index] = {};
                            newImages[index].url = e.target.value;
                            handleInputChange('images', newImages);
                          }}
                          className="input-field text-sm"
                          placeholder="Image URL"
                        />
                        <input
                          type="text"
                          value={editData.images?.[index]?.title || ''}
                          onChange={(e) => {
                            const newImages = [...(editData.images || [])];
                            if (!newImages[index]) newImages[index] = {};
                            newImages[index].title = e.target.value;
                            handleInputChange('images', newImages);
                          }}
                          className="input-field text-sm"
                          placeholder="Image Title"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Carousel Gallery'}
                  </h2>
                  <div className="relative overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-in-out">
                      {(component.images || []).map((img, index) => (
                        <div key={index} className="flex-shrink-0 w-full md:w-1/3 px-2">
                          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-medium">
                            <img 
                              src={img.url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center'} 
                              alt={img.title || 'Gallery Image'}
                              className="w-full h-48 object-cover"
                            />
                            {img.title && (
                              <div className="p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {img.title}
                                </h3>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'navbar':
        return (
          <nav className="bg-white dark:bg-gray-800 shadow-medium">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                {isEditing ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editData.logo || ''}
                      onChange={(e) => handleInputChange('logo', e.target.value)}
                      className="input-field text-lg font-bold"
                      placeholder="Logo/Brand Name"
                    />
                    <div className="flex space-x-4">
                      {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
                        <input
                          key={index}
                          type="text"
                          value={editData.menuItems?.[index] || item}
                          onChange={(e) => {
                            const newMenuItems = [...(editData.menuItems || [])];
                            newMenuItems[index] = e.target.value;
                            handleInputChange('menuItems', newMenuItems);
                          }}
                          className="input-field text-sm"
                          placeholder="Menu Item"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {component.logo || 'Your Brand'}
                    </div>
                    <div className="hidden md:flex space-x-8">
                      {(component.menuItems || ['Home', 'About', 'Services', 'Contact']).map((item, index) => (
                        <a key={index} href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                          {item}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </nav>
        );

      case 'accordion':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-4xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Accordion Title"
                  />
                  <div className="space-y-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.items?.[index]?.question || ''}
                          onChange={(e) => {
                            const newItems = [...(editData.items || [])];
                            if (!newItems[index]) newItems[index] = {};
                            newItems[index].question = e.target.value;
                            handleInputChange('items', newItems);
                          }}
                          className="input-field text-sm"
                          placeholder="Question"
                        />
                        <textarea
                          value={editData.items?.[index]?.answer || ''}
                          onChange={(e) => {
                            const newItems = [...(editData.items || [])];
                            if (!newItems[index]) newItems[index] = {};
                            newItems[index].answer = e.target.value;
                            handleInputChange('items', newItems);
                          }}
                          rows={3}
                          className="input-field text-sm resize-none"
                          placeholder="Answer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Frequently Asked Questions'}
                  </h2>
                  <div className="space-y-4">
                    {(component.items || []).map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          {item.question || 'Question goes here?'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.answer || 'Answer goes here...'}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'tabs':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-4xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Tabs Title"
                  />
                  <div className="space-y-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.tabs?.[index]?.title || ''}
                          onChange={(e) => {
                            const newTabs = [...(editData.tabs || [])];
                            if (!newTabs[index]) newTabs[index] = {};
                            newTabs[index].title = e.target.value;
                            handleInputChange('tabs', newTabs);
                          }}
                          className="input-field text-sm"
                          placeholder="Tab Title"
                        />
                        <textarea
                          value={editData.tabs?.[index]?.content || ''}
                          onChange={(e) => {
                            const newTabs = [...(editData.tabs || [])];
                            if (!newTabs[index]) newTabs[index] = {};
                            newTabs[index].content = e.target.value;
                            handleInputChange('tabs', newTabs);
                          }}
                          rows={4}
                          className="input-field text-sm resize-none"
                          placeholder="Tab Content"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Tabbed Content'}
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
                      {(component.tabs || []).map((tab, index) => (
                        <button
                          key={index}
                          className="px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
                        >
                          {tab.title || 'Tab Title'}
                        </button>
                      ))}
                    </div>
                    <div className="min-h-[200px]">
                      {(component.tabs || []).map((tab, index) => (
                        <div key={index} className="text-gray-600 dark:text-gray-300">
                          {tab.content || 'Tab content goes here...'}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'timeline':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-4xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Timeline Title"
                  />
                  <div className="space-y-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.items?.[index]?.year || ''}
                          onChange={(e) => {
                            const newItems = [...(editData.items || [])];
                            if (!newItems[index]) newItems[index] = {};
                            newItems[index].year = e.target.value;
                            handleInputChange('items', newItems);
                          }}
                          className="input-field text-sm"
                          placeholder="Year"
                        />
                        <input
                          type="text"
                          value={editData.items?.[index]?.title || ''}
                          onChange={(e) => {
                            const newItems = [...(editData.items || [])];
                            if (!newItems[index]) newItems[index] = {};
                            newItems[index].title = e.target.value;
                            handleInputChange('items', newItems);
                          }}
                          className="input-field text-sm"
                          placeholder="Event Title"
                        />
                        <textarea
                          value={editData.items?.[index]?.description || ''}
                          onChange={(e) => {
                            const newItems = [...(editData.items || [])];
                            if (!newItems[index]) newItems[index] = {};
                            newItems[index].description = e.target.value;
                            handleInputChange('items', newItems);
                          }}
                          rows={3}
                          className="input-field text-sm resize-none"
                          placeholder="Event Description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Our Timeline'}
                  </h2>
                  <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>
                    <div className="space-y-8">
                      {(component.items || []).map((item, index) => (
                        <div key={index} className="relative flex items-start">
                          <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full -translate-x-2"></div>
                          <div className="ml-16 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-medium">
                            <div className="text-sm text-primary-600 font-semibold mb-2">
                              {item.year || '2024'}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {item.title || 'Event Title'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {item.description || 'Event description goes here...'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'team':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Team Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.members?.[index]?.name || ''}
                          onChange={(e) => {
                            const newMembers = [...(editData.members || [])];
                            if (!newMembers[index]) newMembers[index] = {};
                            newMembers[index].name = e.target.value;
                            handleInputChange('members', newMembers);
                          }}
                          className="input-field text-sm"
                          placeholder="Member Name"
                        />
                        <input
                          type="text"
                          value={editData.members?.[index]?.role || ''}
                          onChange={(e) => {
                            const newMembers = [...(editData.members || [])];
                            if (!newMembers[index]) newMembers[index] = {};
                            newMembers[index].role = e.target.value;
                            handleInputChange('members', newMembers);
                          }}
                          className="input-field text-sm"
                          placeholder="Role"
                        />
                        <textarea
                          value={editData.members?.[index]?.bio || ''}
                          onChange={(e) => {
                            const newMembers = [...(editData.members || [])];
                            if (!newMembers[index]) newMembers[index] = {};
                            newMembers[index].bio = e.target.value;
                            handleInputChange('members', newMembers);
                          }}
                          rows={3}
                          className="input-field text-sm resize-none"
                          placeholder="Bio"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Meet Our Team'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(component.members || []).map((member, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-medium text-center">
                        <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl text-primary-600 font-bold">
                            {(member.name || 'Member').charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {member.name || 'Team Member'}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 mb-3">
                          {member.role || 'Role'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {member.bio || 'Team member bio goes here...'}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'clients':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Clients Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.items?.[index]?.name || ''}
                          onChange={(e) => {
                            const newItems = [...(editData.items || [])];
                            if (!newItems[index]) newItems[index] = {};
                            newItems[index].name = e.target.value;
                            handleInputChange('items', newItems);
                          }}
                          className="input-field text-sm"
                          placeholder="Client Name"
                        />
                        <input
                          type="text"
                          value={editData.items?.[index]?.logo || ''}
                          onChange={(e) => {
                            const newItems = [...(editData.items || [])];
                            if (!newItems[index]) newItems[index] = {};
                            newItems[index].logo = e.target.value;
                            handleInputChange('items', newItems);
                          }}
                          className="input-field text-sm"
                          placeholder="Logo URL"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Our Clients'}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {(component.items || []).map((item, index) => (
                      <div key={index} className="text-center">
                        {item.logo ? (
                          <img 
                            src={item.logo} 
                            alt={item.name || 'Client Logo'}
                            className="h-12 mx-auto opacity-60 hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400 font-semibold">
                              {item.name || 'Client'}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'product-grid':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Products Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.products?.[index]?.name || ''}
                          onChange={(e) => {
                            const newProducts = [...(editData.products || [])];
                            if (!newProducts[index]) newProducts[index] = {};
                            newProducts[index].name = e.target.value;
                            handleInputChange('products', newProducts);
                          }}
                          className="input-field text-sm"
                          placeholder="Product Name"
                        />
                        <input
                          type="text"
                          value={editData.products?.[index]?.price || ''}
                          onChange={(e) => {
                            const newProducts = [...(editData.products || [])];
                            if (!newProducts[index]) newProducts[index] = {};
                            newProducts[index].price = e.target.value;
                            handleInputChange('products', newProducts);
                          }}
                          className="input-field text-sm"
                          placeholder="Price"
                        />
                        <input
                          type="text"
                          value={editData.products?.[index]?.image || ''}
                          onChange={(e) => {
                            const newProducts = [...(editData.products || [])];
                            if (!newProducts[index]) newProducts[index] = {};
                            newProducts[index].image = e.target.value;
                            handleInputChange('products', newProducts);
                          }}
                          className="input-field text-sm"
                          placeholder="Image URL"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Our Products'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(component.products || []).map((product, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-medium">
                        <img 
                          src={product.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center'} 
                          alt={product.name || 'Product'}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {product.name || 'Product Name'}
                          </h3>
                          <div className="text-2xl font-bold text-primary-600 mb-4">
                            {product.price || '$99'}
                          </div>
                          <button className="btn-primary w-full">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'social-feed':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-4xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Social Feed Title"
                  />
                  <div className="space-y-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.posts?.[index]?.platform || ''}
                          onChange={(e) => {
                            const newPosts = [...(editData.posts || [])];
                            if (!newPosts[index]) newPosts[index] = {};
                            newPosts[index].platform = e.target.value;
                            handleInputChange('posts', newPosts);
                          }}
                          className="input-field text-sm"
                          placeholder="Platform (e.g., Twitter, Instagram)"
                        />
                        <textarea
                          value={editData.posts?.[index]?.content || ''}
                          onChange={(e) => {
                            const newPosts = [...(editData.posts || [])];
                            if (!newPosts[index]) newPosts[index] = {};
                            newPosts[index].content = e.target.value;
                            handleInputChange('posts', newPosts);
                          }}
                          rows={3}
                          className="input-field text-sm resize-none"
                          placeholder="Post Content"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Social Media Feed'}
                  </h2>
                  <div className="space-y-6">
                    {(component.posts || []).map((post, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-medium">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-bold">
                                {post.platform?.charAt(0) || 'S'}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {post.platform || 'Social Platform'}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Just now
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {post.content || 'Social media post content goes here...'}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'breadcrumbs':
        return (
          <nav className="py-4 px-4 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editData.items?.join(' > ') || ''}
                    onChange={(e) => {
                      const newItems = e.target.value.split(' > ').filter(item => item.trim());
                      handleInputChange('items', newItems);
                    }}
                    className="input-field text-sm"
                    placeholder="Breadcrumbs (separate with > )"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  {(component.items || ['Home', 'About', 'Current Page']).map((item, index) => (
                    <div key={index} className="flex items-center">
                      {index > 0 && <span className="mx-2">/</span>}
                      <a href="#" className="hover:text-primary-600 transition-colors">
                        {item}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>
        );

      case 'pagination':
        return (
          <section className="py-8 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-md">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editData.currentPage || ''}
                    onChange={(e) => handleInputChange('currentPage', e.target.value)}
                    className="input-field text-sm"
                    placeholder="Current Page"
                  />
                  <input
                    type="text"
                    value={editData.totalPages || ''}
                    onChange={(e) => handleInputChange('totalPages', e.target.value)}
                    className="input-field text-sm"
                    placeholder="Total Pages"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center space-x-2">
                  <button className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">
                    Previous
                  </button>
                  {Array.from({ length: parseInt(component.totalPages) || 5 }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`px-3 py-2 rounded ${
                        (i + 1) === parseInt(component.currentPage) || 1
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'
                      } transition-colors`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors">
                    Next
                  </button>
                </div>
              )}
            </div>
          </section>
        );

      case 'contact-advanced':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-4xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Advanced Contact Title"
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.fields?.[0] || ''}
                        onChange={(e) => {
                          const newFields = [...(editData.fields || [])];
                          newFields[0] = e.target.value;
                          handleInputChange('fields', newFields);
                        }}
                        className="input-field text-sm"
                        placeholder="Field 1 Label"
                      />
                      <input
                        type="text"
                        value={editData.fields?.[1] || ''}
                        onChange={(e) => {
                          const newFields = [...(editData.fields || [])];
                          newFields[1] = e.target.value;
                          handleInputChange('fields', newFields);
                        }}
                        className="input-field text-sm"
                        placeholder="Field 2 Label"
                      />
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.fields?.[2] || ''}
                        onChange={(e) => {
                          const newFields = [...(editData.fields || [])];
                          newFields[2] = e.target.value;
                          handleInputChange('fields', newFields);
                        }}
                        className="input-field text-sm"
                        placeholder="Field 3 Label"
                      />
                      <input
                        type="text"
                        value={editData.fields?.[4] || ''}
                        onChange={(e) => {
                          const newFields = [...(editData.fields || [])];
                          newFields[4] = e.target.value;
                          handleInputChange('fields', newFields);
                        }}
                        className="input-field text-sm"
                        placeholder="Field 4 Label"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Get In Touch'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-3 text-gray-600 dark:text-gray-400">
                        <p>📍 123 Business Street, City, Country</p>
                        <p>📧 info@company.com</p>
                        <p>📞 +1 (555) 123-4567</p>
                      </div>
                    </div>
                    <form className="space-y-4">
                      {(component.fields || ['Name', 'Email', 'Phone', 'Message']).map((field, index) => (
                        <div key={index}>
                          {index === 3 ? (
                            <textarea
                              placeholder={field}
                              rows={4}
                              className="input-field w-full resize-none"
                              disabled
                            />
                          ) : (
                            <input
                              type={index === 1 ? 'email' : 'text'}
                              placeholder={field}
                              className="input-field w-full"
                              disabled
                            />
                          )}
                        </div>
                      ))}
                      <button
                        type="submit"
                        className="btn-primary w-full py-3"
                        disabled
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'stats':
        return (
          <section className="py-16 px-4 bg-primary-50 dark:bg-primary-900/20">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Stats Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <input
                          type="text"
                          value={editData.stats?.[index]?.number || ''}
                          onChange={(e) => {
                            const newStats = [...(editData.stats || [])];
                            if (!newStats[index]) newStats[index] = {};
                            newStats[index].number = e.target.value;
                            handleInputChange('stats', newStats);
                          }}
                          className="input-field text-sm"
                          placeholder="Stat Number"
                        />
                        <input
                          type="text"
                          value={editData.stats?.[index]?.label || ''}
                          onChange={(e) => {
                            const newStats = [...(editData.stats || [])];
                            if (!newStats[index]) newStats[index] = {};
                            newStats[index].label = e.target.value;
                            handleInputChange('stats', newStats);
                          }}
                          className="input-field text-sm"
                          placeholder="Stat Label"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    {component.title || 'Our Numbers'}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {(component.stats || []).map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                          {stat.number || '1000+'}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {stat.label || 'Happy Customers'}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'video-section':
        return (
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-4xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Video Section Title"
                  />
                  <textarea
                    value={editData.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Video description..."
                  />
                  <input
                    type="text"
                    value={editData.videoUrl || ''}
                    onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                    className="input-field"
                    placeholder="Video URL (YouTube, Vimeo, etc.)"
                  />
                  <input
                    type="text"
                    value={editData.thumbnailUrl || ''}
                    onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                    className="input-field"
                    placeholder="Thumbnail Image URL"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                    {component.title || 'Watch Our Story'}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                    {component.content || 'Learn more about our company and mission through this video.'}
                  </p>
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    {component.videoUrl ? (
                      <iframe
                        src={component.videoUrl}
                        title="Video"
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🎥</div>
                          <p className="text-gray-500 dark:text-gray-400">Video will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        );

      case 'image-text-overlay':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-center text-3xl font-bold"
                    placeholder="Overlay Title"
                  />
                  <textarea
                    value={editData.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Overlay content..."
                  />
                  <input
                    type="text"
                    value={editData.imageUrl || ''}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    className="input-field"
                    placeholder="Background Image URL"
                  />
                  <input
                    type="text"
                    value={editData.overlayColor || ''}
                    onChange={(e) => handleInputChange('overlayColor', e.target.value)}
                    className="input-field"
                    placeholder="Overlay Color (e.g., rgba(0,0,0,0.5))"
                  />
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={component.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop&crop=center'}
                    alt="Background"
                    className="w-full h-96 object-cover"
                  />
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundColor: component.overlayColor || 'rgba(0,0,0,0.5)'
                    }}
                  >
                    <div className="text-center text-white px-8">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {component.title || 'Image with Text Overlay'}
                      </h2>
                      <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                        {component.content || 'This is a beautiful overlay effect with your content on top of an image.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      case 'product-detail':
        return (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-6xl">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field text-2xl font-bold"
                    placeholder="Product Name"
                  />
                  <input
                    type="text"
                    value={editData.price || ''}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="input-field"
                    placeholder="Price"
                  />
                  <textarea
                    value={editData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Product description..."
                  />
                  <input
                    type="text"
                    value={editData.imageUrl || ''}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    className="input-field"
                    placeholder="Product Image URL"
                  />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <img
                      src={component.imageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&crop=center'}
                      alt={component.title || 'Product'}
                      className="w-full h-auto rounded-lg shadow-medium"
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {component.title || 'Product Name'}
                    </h1>
                    <div className="text-3xl font-bold text-primary-600 mb-6">
                      {component.price || '$99.99'}
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      {component.description || 'This is a detailed product description that explains the features and benefits of the product.'}
                    </p>
                    <div className="space-y-4">
                      <button className="btn-primary w-full py-4 text-lg">
                        Add to Cart
                      </button>
                      <button className="btn-secondary w-full py-4 text-lg">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      default:
        return (
          <div className="p-8 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Unknown component type: {component.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Component Content */}
      {renderComponent()}

      {/* Component Controls */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex space-x-2 z-20"
        >
          {isEditing ? (
            <>
              <button
                onClick={saveChanges}
                className="p-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-colors duration-200"
                title="Save Changes"
              >
                <Save size={16} />
              </button>
              <button
                onClick={cancelEditing}
                className="p-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white transition-colors duration-200"
                title="Cancel Editing"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={startEditing}
                className="p-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white transition-colors duration-200"
                title="Edit Component"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => duplicateComponent(component.id)}
                className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors duration-200"
                title="Duplicate Component"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={() => deleteComponent(component.id)}
                className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-colors duration-200"
                title="Delete Component"
              >
                <X size={16} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default WebsiteComponent; 