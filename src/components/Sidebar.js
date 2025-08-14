import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Image, 
  Type, 
  Mail, 
  Star,
  ChevronDown,
  ChevronRight,
  FileText,
  Grid3X3
} from 'lucide-react';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import ComponentBlock from './ComponentBlock';

const Sidebar = () => {
  const { addComponent, clearWebsite, components, updateComponents } = useWebsiteBuilder();
  const [activeTab, setActiveTab] = useState('components');
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    media: true,
    forms: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const componentTemplates = {
    basic: [
      {
        type: 'hero',
        name: 'Hero Section',
        icon: <Star size={20} />,
        description: 'Eye-catching header with title and call-to-action',
        defaultData: {
          title: 'Welcome to Our Website',
          subtitle: 'Create something amazing with our website builder',
          buttonText: 'Get Started',
          background: '#667eea',
          backgroundSecondary: '#764ba2'
        }
      },
      {
        type: 'hero-video',
        name: 'Video Hero',
        icon: <Star size={20} />,
        description: 'Hero section with background video',
        defaultData: {
          title: 'Amazing Video Background',
          subtitle: 'Create stunning visual impact',
          buttonText: 'Watch More',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        }
      },
      {
        type: 'hero-split',
        name: 'Split Hero',
        icon: <Star size={20} />,
        description: 'Hero with split content and image',
        defaultData: {
          title: 'Split Layout Hero',
          subtitle: 'Content on one side, image on the other',
          buttonText: 'Learn More',
                      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center',
          imagePosition: 'right'
        }
      },
      {
        type: 'text',
        name: 'Text Block',
        icon: <Type size={20} />,
        description: 'Simple text content with title and body',
        defaultData: {
          title: 'Section Title',
          content: 'Your content goes here. This is a sample text block that you can customize with your own content.'
        }
      },
      {
        type: 'text-two-column',
        name: 'Two Column Text',
        icon: <Type size={20} />,
        description: 'Text content in two columns',
        defaultData: {
          title: 'Two Column Layout',
          leftContent: 'Left column content goes here...',
          rightContent: 'Right column content goes here...'
        }
      },
      {
        type: 'text-with-image',
        name: 'Text with Image',
        icon: <Type size={20} />,
        description: 'Text content with accompanying image',
        defaultData: {
          title: 'Text with Image',
          content: 'Your content with an image alongside it.',
                      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center',
          imagePosition: 'right'
        }
      },
      {
        type: 'grid',
        name: 'Feature Grid',
        icon: <Grid3X3 size={20} />,
        description: 'Grid layout for features or services',
        defaultData: {
          title: 'Our Features',
          features: [
            { title: 'Feature 1', description: 'Description of feature 1', icon: '🚀' },
            { title: 'Feature 2', description: 'Description of feature 2', icon: '⚡' },
            { title: 'Feature 3', description: 'Description of feature 3', icon: '💡' }
          ]
        }
      },
      {
        type: 'grid-4',
        name: '4-Column Grid',
        icon: <Grid3X3 size={20} />,
        description: 'Four column feature grid',
        defaultData: {
          title: 'Four Column Features',
          features: [
            { title: 'Feature 1', description: 'Description 1', icon: '🎯' },
            { title: 'Feature 2', description: 'Description 2', icon: '🚀' },
            { title: 'Feature 3', description: 'Description 3', icon: '⚡' },
            { title: 'Feature 4', description: 'Description 4', icon: '💡' }
          ]
        }
      },
      {
        type: 'stats',
        name: 'Statistics',
        icon: <Grid3X3 size={20} />,
        description: 'Display key statistics or numbers',
        defaultData: {
          title: 'Our Numbers',
          stats: [
            { number: '1000+', label: 'Happy Clients' },
            { number: '500+', label: 'Projects Completed' },
            { number: '99%', label: 'Satisfaction Rate' }
          ]
        }
      },
      {
        type: 'testimonials',
        name: 'Testimonials',
        icon: <Grid3X3 size={20} />,
        description: 'Customer reviews and testimonials',
        defaultData: {
          title: 'What Our Clients Say',
          testimonials: [
            { name: 'John Doe', role: 'CEO', company: 'Tech Corp', content: 'Amazing service and results!' },
            { name: 'Jane Smith', role: 'Founder', company: 'Startup Inc', content: 'Exceeded all expectations!' }
          ]
        }
      }
    ],
    media: [
      {
        type: 'gallery',
        name: 'Image Gallery',
        icon: <Image size={20} />,
        description: 'Grid of images with titles and descriptions',
        defaultData: {
          title: 'Image Gallery',
          images: [
            { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center', title: 'Image 1', description: 'Description for image 1' },
            { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center', title: 'Image 2', description: 'Description for image 2' }
          ]
        }
      },
      {
        type: 'gallery-masonry',
        name: 'Masonry Gallery',
        icon: <Image size={20} />,
        description: 'Pinterest-style masonry layout',
        defaultData: {
          title: 'Masonry Gallery',
          images: [
            { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center', title: 'Image 1', height: '300' },
            { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center', title: 'Image 2', height: '400' },
            { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&crop=center', title: 'Image 3', height: '250' }
          ]
        }
      },
      {
        type: 'gallery-carousel',
        name: 'Carousel Gallery',
        icon: <Image size={20} />,
        description: 'Sliding image carousel',
        defaultData: {
          title: 'Image Carousel',
          images: [
            { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop&crop=center', title: 'Slide 1' },
            { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&crop=center', title: 'Slide 2' },
            { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&crop=center', title: 'Slide 3' }
          ]
        }
      },
      {
        type: 'video-section',
        name: 'Video Section',
        icon: <Image size={20} />,
        description: 'Video content with description',
        defaultData: {
          title: 'Watch Our Video',
          description: 'Learn more about our services',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                      thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop&crop=center'
        }
      },
      {
        type: 'image-text-overlay',
        name: 'Image with Text Overlay',
        icon: <Image size={20} />,
        description: 'Image with text overlay',
        defaultData: {
          title: 'Overlay Title',
          subtitle: 'Overlay subtitle text',
                      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&crop=center',
          overlayColor: 'rgba(0,0,0,0.5)'
        }
      }
    ],
    forms: [
      {
        type: 'contact',
        name: 'Contact Form',
        icon: <Mail size={20} />,
        description: 'Contact form with name, email, and message fields',
        defaultData: {
          title: 'Contact Us',
          buttonText: 'Send Message'
        }
      },
      {
        type: 'newsletter',
        name: 'Newsletter Signup',
        icon: <Mail size={20} />,
        description: 'Email newsletter subscription form',
        defaultData: {
          title: 'Stay Updated',
          subtitle: 'Subscribe to our newsletter for the latest updates',
          buttonText: 'Subscribe',
          placeholder: 'Enter your email'
        }
      },
      {
        type: 'contact-advanced',
        name: 'Advanced Contact',
        icon: <Mail size={20} />,
        description: 'Full contact form with multiple fields',
        defaultData: {
          title: 'Get In Touch',
          subtitle: 'We\'d love to hear from you',
          buttonText: 'Send Message',
          fields: ['name', 'email', 'phone', 'company', 'message']
        }
      }
    ],
    navigation: [
      {
        type: 'navbar',
        name: 'Navigation Bar',
        icon: <Layers size={20} />,
        description: 'Main navigation menu',
        defaultData: {
          logo: 'Your Logo',
          menuItems: ['Home', 'About', 'Services', 'Contact'],
          ctaButton: 'Get Started'
        }
      },
      {
        type: 'breadcrumbs',
        name: 'Breadcrumbs',
        icon: <Layers size={20} />,
        description: 'Navigation breadcrumbs',
        defaultData: {
          items: ['Home', 'Products', 'Category', 'Current Page']
        }
      },
      {
        type: 'pagination',
        name: 'Pagination',
        icon: <Layers size={20} />,
        description: 'Page navigation numbers',
        defaultData: {
          currentPage: 1,
          totalPages: 10
        }
      }
    ],
    interactive: [
      {
        type: 'accordion',
        name: 'Accordion',
        icon: <Layers size={20} />,
        description: 'Collapsible content sections',
        defaultData: {
          title: 'Frequently Asked Questions',
          items: [
            { question: 'Question 1?', answer: 'Answer to question 1' },
            { question: 'Question 2?', answer: 'Answer to question 2' },
            { question: 'Question 3?', answer: 'Answer to question 3' }
          ]
        }
      },
      {
        type: 'tabs',
        name: 'Tabs',
        icon: <Layers size={20} />,
        description: 'Tabbed content interface',
        defaultData: {
          tabs: [
            { title: 'Tab 1', content: 'Content for tab 1' },
            { title: 'Tab 2', content: 'Content for tab 2' },
            { title: 'Tab 3', content: 'Content for tab 3' }
          ]
        }
      },
      {
        type: 'timeline',
        name: 'Timeline',
        icon: <Layers size={20} />,
        description: 'Vertical timeline layout',
        defaultData: {
          title: 'Our Journey',
          events: [
            { year: '2020', title: 'Company Founded', description: 'Started our journey' },
            { year: '2021', title: 'First Product', description: 'Launched our first product' },
            { year: '2022', title: 'Expansion', description: 'Grew to 50 employees' }
          ]
        }
      }
    ],
    business: [
      {
        type: 'pricing',
        name: 'Pricing Tables',
        icon: <Grid3X3 size={20} />,
        description: 'Service pricing comparison',
        defaultData: {
          title: 'Choose Your Plan',
          plans: [
            { name: 'Basic', price: '$29', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
            { name: 'Pro', price: '$79', features: ['All Basic', 'Feature 4', 'Feature 5'] },
            { name: 'Enterprise', price: '$199', features: ['All Pro', 'Feature 6', 'Feature 7'] }
          ]
        }
      },
      {
        type: 'team',
        name: 'Team Section',
        icon: <Grid3X3 size={20} />,
        description: 'Team member profiles',
        defaultData: {
          title: 'Meet Our Team',
          members: [
            { name: 'John Doe', role: 'CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=center', bio: 'Company leader' },
            { name: 'Jane Smith', role: 'CTO', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=center', bio: 'Tech expert' }
          ]
        }
      },
      {
        type: 'clients',
        name: 'Client Logos',
        icon: <Grid3X3 size={20} />,
        description: 'Client company logos',
        defaultData: {
          title: 'Trusted By',
          logos: [
            { name: 'Client 1', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=80&fit=crop&crop=center' },
            { name: 'Client 2', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=80&fit=crop&crop=center' },
            { name: 'Client 3', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=80&fit=crop&crop=center' }
          ]
        }
      }
    ],
    ecommerce: [
      {
        type: 'product-grid',
        name: 'Product Grid',
        icon: <Grid3X3 size={20} />,
        description: 'Product catalog display',
        defaultData: {
          title: 'Our Products',
          products: [
            { name: 'Product 1', price: '$99', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center', description: 'Product description' },
            { name: 'Product 2', price: '$149', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center', description: 'Product description' }
          ]
        }
      },
      {
        type: 'product-detail',
        name: 'Product Detail',
        icon: <Grid3X3 size={20} />,
        description: 'Detailed product view',
        defaultData: {
          name: 'Product Name',
          price: '$199',
          description: 'Detailed product description goes here...',
                      images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop&crop=center', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center'],
          features: ['Feature 1', 'Feature 2', 'Feature 3']
        }
      }
    ],
    social: [
      {
        type: 'social-feed',
        name: 'Social Feed',
        icon: <Grid3X3 size={20} />,
        description: 'Social media content feed',
        defaultData: {
          title: 'Follow Us',
          platform: 'Instagram',
          posts: [
            { image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=300&fit=crop&crop=center', caption: 'Amazing post!', likes: '1.2k' },
            { image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center', caption: 'Another great post!', likes: '856' }
          ]
        }
      }
    ]
  };

  const starterTemplates = [
    {
      name: 'Business Landing',
      description: 'Professional business website template',
      components: [
        { 
          type: 'hero', 
          title: 'Welcome to Our Business', 
          subtitle: 'We provide innovative solutions for your needs',
          buttonText: 'Get Started',
          background: 'bg-gradient-to-r from-blue-600 to-purple-600',
          imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center'
        },
        { 
          type: 'text', 
          title: 'About Us', 
          content: 'We are a leading company in our industry with years of experience and a proven track record of delivering exceptional results for our clients.' 
        },
        { 
          type: 'grid', 
          title: 'Our Services', 
          features: [
            { title: 'Web Development', description: 'Custom websites and web applications', icon: '💻' },
            { title: 'Mobile Apps', description: 'iOS and Android development', icon: '📱' },
            { title: 'Digital Marketing', description: 'SEO, PPC, and social media', icon: '📈' },
            { title: 'Consulting', description: 'Strategic digital guidance', icon: '🎯' }
          ] 
        },
        { 
          type: 'testimonials', 
          title: 'What Our Clients Say', 
          testimonials: [
            { name: 'John Smith', role: 'CEO', company: 'TechCorp', content: 'Amazing service and results!', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center' },
            { name: 'Sarah Johnson', role: 'Marketing Director', company: 'InnovateCo', content: 'Exceeded our expectations completely.', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center' }
          ] 
        },
        { 
          type: 'contact', 
          title: 'Get In Touch',
          subtitle: 'Ready to start your project?',
          fields: [
            { type: 'text', label: 'Name', placeholder: 'Your name' },
            { type: 'email', label: 'Email', placeholder: 'your@email.com' },
            { type: 'textarea', label: 'Message', placeholder: 'Tell us about your project' }
          ]
        }
      ]
    },
    {
      name: 'Portfolio Showcase',
      description: 'Showcase your work with style',
      components: [
        { 
          type: 'hero', 
          title: 'Creative Portfolio', 
          subtitle: 'Showcasing amazing work and projects',
          buttonText: 'View My Work',
          background: 'bg-gradient-to-r from-purple-600 to-pink-600',
          imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center'
        },
        { 
          type: 'gallery', 
          title: 'My Work', 
          images: [
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center'
          ] 
        },
        { 
          type: 'text', 
          title: 'About Me', 
          content: 'I\'m a passionate creator with over 5 years of experience in design and development. I love turning ideas into beautiful, functional digital experiences.' 
        },
        { 
          type: 'contact', 
          title: 'Let\'s Work Together',
          subtitle: 'Interested in collaborating?',
          fields: [
            { type: 'text', label: 'Name', placeholder: 'Your name' },
            { type: 'email', label: 'Email', placeholder: 'your@email.com' },
            { type: 'textarea', label: 'Project Details', placeholder: 'Tell me about your project' }
          ]
        }
      ]
    },
    {
      name: 'Simple Blog',
      description: 'Clean and minimal blog layout',
      components: [
        { type: 'hero', title: 'My Blog', subtitle: 'Thoughts, ideas, and stories' },
        { type: 'text', title: 'Latest Post', content: 'This is where your blog content would go...' }
      ]
    },
    {
      name: 'E-commerce Store',
      description: 'Complete online store template',
      components: [
        { 
          type: 'hero', 
          title: 'Shop Our Products', 
          subtitle: 'Discover amazing products at great prices',
          buttonText: 'Shop Now',
          background: 'bg-gradient-to-r from-green-600 to-blue-600',
          imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center'
        },
        { 
          type: 'product-grid', 
          title: 'Featured Products', 
          products: [
            { name: 'Premium Product 1', price: '$99', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center', description: 'High-quality product description' },
            { name: 'Premium Product 2', price: '$149', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center', description: 'Another amazing product' },
            { name: 'Premium Product 3', price: '$199', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center', description: 'Top-tier quality product' },
            { name: 'Premium Product 4', price: '$79', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center', description: 'Great value product' }
          ] 
        },
        { 
          type: 'grid', 
          title: 'Why Choose Us', 
          features: [
            { title: 'Free Shipping', description: 'On orders over $50', icon: '🚚' },
            { title: 'Quality Guarantee', description: '30-day money back', icon: '✅' },
            { title: '24/7 Support', description: 'Always here to help', icon: '💬' },
            { title: 'Secure Payment', description: '100% secure checkout', icon: '🔒' }
          ] 
        },
        { 
          type: 'newsletter', 
          title: 'Stay Updated', 
          subtitle: 'Get notified about new products and sales',
          placeholder: 'Enter your email address'
        },
        { 
          type: 'contact', 
          title: 'Customer Support',
          subtitle: 'Need help? We\'re here for you',
          fields: [
            { type: 'text', label: 'Name', placeholder: 'Your name' },
            { type: 'email', label: 'Email', placeholder: 'your@email.com' },
            { type: 'textarea', label: 'Message', placeholder: 'How can we help?' }
          ]
        }
      ]
    },
    {
      name: 'Restaurant & Food',
      description: 'Delicious restaurant website template',
      components: [
        { type: 'hero', title: 'Welcome to Our Restaurant', subtitle: 'Experience the finest dining in town' },
        { type: 'gallery', title: 'Our Dishes', images: [] },
        { type: 'text', title: 'Our Story', content: 'We started with a simple dream...' },
        { type: 'grid', title: 'Special Features', features: [] },
        { type: 'contact', title: 'Make a Reservation' }
      ]
    },
    {
      name: 'Creative Agency',
      description: 'Modern agency website template',
      components: [
        { type: 'hero', title: 'We Create Digital Magic', subtitle: 'Transforming ideas into digital experiences' },
        { type: 'grid', title: 'Our Services', features: [] },
        { type: 'gallery', title: 'Recent Work', images: [] },
        { type: 'team', title: 'Meet Our Team', members: [] },
        { type: 'testimonials', title: 'Client Success Stories', testimonials: [] },
        { type: 'contact', title: 'Start Your Project' }
      ]
    },
    {
      name: 'Personal Brand',
      description: 'Personal branding and resume template',
      components: [
        { type: 'hero', title: 'Hi, I\'m [Your Name]', subtitle: 'Professional, creative, and passionate' },
        { type: 'text', title: 'About Me', content: 'I\'m a professional with expertise in...' },
        { type: 'grid', title: 'Skills & Expertise', features: [] },
        { type: 'timeline', title: 'My Experience', events: [] },
        { type: 'gallery', title: 'My Work', images: [] },
        { type: 'contact', title: 'Get In Touch' }
      ]
    },
    {
      name: 'Event & Conference',
      description: 'Event planning and conference website',
      components: [
        { type: 'hero', title: 'Join Us at [Event Name]', subtitle: 'The biggest event of the year' },
        { type: 'text', title: 'Event Details', content: 'Learn about what to expect...' },
        { type: 'grid', title: 'Event Highlights', features: [] },
        { type: 'team', title: 'Speakers', members: [] },
        { type: 'timeline', title: 'Event Schedule', events: [] },
        { type: 'contact', title: 'Register Now' }
      ]
    },
    {
      name: 'Real Estate',
      description: 'Property listing and real estate template',
      components: [
        { type: 'hero', title: 'Find Your Dream Home', subtitle: 'Discover amazing properties in prime locations' },
        { type: 'gallery', title: 'Featured Properties', images: [] },
        { type: 'grid', title: 'Why Choose Us', features: [] },
        { type: 'team', title: 'Our Agents', members: [] },
        { type: 'testimonials', title: 'Happy Homeowners', testimonials: [] },
        { type: 'contact', title: 'Contact an Agent' }
      ]
    },
    {
      name: 'Fitness & Wellness',
      description: 'Gym, yoga, and wellness website template',
      components: [
        { type: 'hero', title: 'Transform Your Life', subtitle: 'Join our fitness community today' },
        { type: 'grid', title: 'Our Programs', features: [] },
        { type: 'gallery', title: 'Facilities', images: [] },
        { type: 'team', title: 'Our Trainers', members: [] },
        { type: 'pricing', title: 'Membership Plans', plans: [] },
        { type: 'contact', title: 'Start Your Journey' }
      ]
    },
    {
      name: 'Technology Startup',
      description: 'Modern tech startup website template',
      components: [
        { type: 'hero', title: 'Innovation Starts Here', subtitle: 'Building the future, one line of code at a time' },
        { type: 'text', title: 'Our Mission', content: 'We\'re on a mission to...' },
        { type: 'grid', title: 'Our Technology', features: [] },
        { type: 'stats', title: 'By the Numbers', stats: [] },
        { type: 'team', title: 'The Team', members: [] },
        { type: 'contact', title: 'Join Our Mission' }
      ]
    },
    {
      name: 'Photography Studio',
      description: 'Professional photography website template',
      components: [
        { type: 'hero', title: 'Capturing Life\'s Moments', subtitle: 'Professional photography services' },
        { type: 'gallery-masonry', title: 'Portfolio', images: [] },
        { type: 'text', title: 'About My Style', content: 'I specialize in...' },
        { type: 'grid', title: 'Services Offered', features: [] },
        { type: 'pricing', title: 'Packages', plans: [] },
        { type: 'contact', title: 'Book a Session' }
      ]
    },
    {
      name: 'Educational Institute',
      description: 'School, college, or training center template',
      components: [
        { type: 'hero', title: 'Empowering Minds', subtitle: 'Quality education for a brighter future' },
        { type: 'grid', title: 'Our Programs', features: [] },
        { type: 'team', title: 'Faculty', members: [] },
        { type: 'gallery', title: 'Campus Life', images: [] },
        { type: 'testimonials', title: 'Student Success Stories', testimonials: [] },
        { type: 'contact', title: 'Apply Now' }
      ]
    },
    {
      name: 'Healthcare & Medical',
      description: 'Medical practice and healthcare template',
      components: [
        { type: 'hero', title: 'Your Health, Our Priority', subtitle: 'Professional healthcare services' },
        { type: 'grid', title: 'Our Services', features: [] },
        { type: 'team', title: 'Our Doctors', members: [] },
        { type: 'gallery', title: 'Facility', images: [] },
        { type: 'testimonials', title: 'Patient Reviews', testimonials: [] },
        { type: 'contact', title: 'Book Appointment' }
      ]
    },
    {
      name: 'Travel & Tourism',
      description: 'Travel agency and tourism website template',
      components: [
        { type: 'hero', title: 'Explore the World', subtitle: 'Discover amazing destinations and experiences' },
        { type: 'gallery', title: 'Destinations', images: [] },
        { type: 'grid', title: 'Travel Services', features: [] },
        { type: 'testimonials', title: 'Traveler Stories', testimonials: [] },
        { type: 'newsletter', title: 'Travel Updates', subtitle: 'Get the latest travel deals and tips' },
        { type: 'contact', title: 'Plan Your Trip' }
      ]
    },
    {
      name: 'Non-Profit Organization',
      description: 'Charity and non-profit website template',
      components: [
        { type: 'hero', title: 'Making a Difference', subtitle: 'Join us in our mission to help others' },
        { type: 'text', title: 'Our Cause', content: 'We\'re dedicated to...' },
        { type: 'grid', title: 'How We Help', features: [] },
        { type: 'stats', title: 'Our Impact', stats: [] },
        { type: 'team', title: 'Our Team', members: [] },
        { type: 'contact', title: 'Get Involved' }
      ]
    },
    {
      name: 'Wedding & Events',
      description: 'Wedding planning and special events template',
      components: [
        { type: 'hero', title: 'Your Special Day', subtitle: 'Making your dreams come true' },
        { type: 'gallery', title: 'Wedding Gallery', images: [] },
        { type: 'grid', title: 'Our Services', features: [] },
        { type: 'team', title: 'Our Planners', members: [] },
        { type: 'testimonials', title: 'Happy Couples', testimonials: [] },
        { type: 'contact', title: 'Start Planning' }
      ]
    },
    {
      name: 'Music & Entertainment',
      description: 'Musician, band, or entertainment website template',
      components: [
        { type: 'hero', title: 'The Sound of Innovation', subtitle: 'Experience music like never before' },
        { type: 'gallery', title: 'Live Performances', images: [] },
        { type: 'text', title: 'About the Music', content: 'Our sound is inspired by...' },
        { type: 'grid', title: 'Upcoming Shows', features: [] },
        { type: 'newsletter', title: 'Stay Connected', subtitle: 'Get updates about new music and shows' },
        { type: 'contact', title: 'Book Us' }
      ]
    },
    {
      name: 'Automotive & Cars',
      description: 'Car dealership and automotive services template',
      components: [
        { type: 'hero', title: 'Drive Your Dreams', subtitle: 'Quality vehicles and exceptional service' },
        { type: 'gallery', title: 'Featured Vehicles', images: [] },
        { type: 'grid', title: 'Our Services', features: [] },
        { type: 'team', title: 'Our Staff', members: [] },
        { type: 'testimonials', title: 'Customer Reviews', testimonials: [] },
        { type: 'contact', title: 'Visit Our Dealership' }
      ]
    },
    {
      name: 'Fashion & Beauty',
      description: 'Fashion brand and beauty services template',
      components: [
        { type: 'hero', title: 'Style Redefined', subtitle: 'Discover the latest trends and beauty secrets' },
        { type: 'gallery', title: 'Latest Collection', images: [] },
        { type: 'grid', title: 'Our Products', features: [] },
        { type: 'team', title: 'Our Stylists', members: [] },
        { type: 'newsletter', title: 'Style Updates', subtitle: 'Get the latest fashion trends and beauty tips' },
        { type: 'contact', title: 'Book Consultation' }
      ]
    }
  ];

  const handleAddComponent = (template) => {
    addComponent({
      ...template,
      id: Date.now().toString(),
      ...template.defaultData
    });
  };

  const loadTemplate = (template) => {
    console.log('🚀 Loading template:', template.name);
    console.log('📋 Template components:', template.components);
    
    // Clear website first
    clearWebsite();
    
    // Add all components at once after a short delay
    setTimeout(() => {
      console.log('✅ Adding all template components at once...');
      
      // Prepare all components first
      const allComponents = template.components.map((comp, index) => {
        console.log(`📦 Processing component ${index + 1}:`, comp);
        
        // Create a proper component object with all required properties
        return {
          ...comp, // Spread the original component properties first
          id: Date.now().toString() + index + Math.random(),
          // Ensure we have all the required properties for the component type
          title: comp.title || 'Untitled',
          subtitle: comp.subtitle || '',
          content: comp.content || '',
          buttonText: comp.buttonText || 'Learn More',
          background: comp.background || 'bg-white dark:bg-gray-900',
          backgroundSecondary: comp.backgroundSecondary || 'bg-gray-50 dark:bg-gray-800',
                      imageUrl: comp.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center',
          images: comp.images || [],
          features: comp.features || [],
          stats: comp.stats || [],
          testimonials: comp.testimonials || [],
          plans: comp.plans || [],
          members: comp.members || [],
          products: comp.products || [],
          tabs: comp.tabs || [],
          events: comp.events || [],
          fields: comp.fields || [],
          placeholder: comp.placeholder || '',
          logo: comp.logo || '',
          menuItems: comp.menuItems || [],
          ctaButton: comp.ctaButton || {},
          items: comp.items || [],
          currentPage: comp.currentPage || 1,
          totalPages: comp.totalPages || 1,
          question: comp.question || '',
          answer: comp.answer || '',
          year: comp.year || '',
          company: comp.company || '',
          role: comp.role || '',
          bio: comp.bio || '',
          platform: comp.platform || '',
          posts: comp.posts || [],
          caption: comp.caption || '',
          likes: comp.likes || '',
          height: comp.height || 'auto',
          description: comp.description || ''
        };
      });
      
      // Add all components at once using updateComponents directly
      console.log('📝 Adding all components:', allComponents);
      updateComponents(allComponents);
    }, 200);
  };

  return (
    <div className="h-full sidebar-panel overflow-y-auto scrollbar-hide">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('components')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'components'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <Layers size={16} className="inline mr-2" />
          Components
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'templates'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <FileText size={16} className="inline mr-2" />
          Templates
        </button>
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'components' && (
            <motion.div
              key="components"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                {Object.entries(componentTemplates).map(([sectionKey, sectionComponents]) => (
                  <div key={sectionKey} className="space-y-2">
                    <button
                      onClick={() => toggleSection(sectionKey)}
                      className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      <span className="capitalize">{sectionKey}</span>
                      {expandedSections[sectionKey] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections[sectionKey] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-2 pl-4"
                        >
                          {sectionComponents.map((template, index) => (
                            <ComponentBlock
                              key={index}
                              template={template}
                              onAdd={() => handleAddComponent(template)}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Choose a starter template to get started quickly
                </div>
                
                {starterTemplates.map((template, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="card p-4 cursor-pointer hover:shadow-medium transition-shadow duration-200"
                    onClick={() => loadTemplate(template)}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Layers size={14} className="mr-1" />
                      {template.components.length} components
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar; 