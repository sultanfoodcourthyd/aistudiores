import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroScene } from './components/3d/HeroScene';
import { Menu } from './components/Menu';
import { DishViewer } from './components/DishViewer';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { DeliveryTracker } from './components/DeliveryTracker';
import { OrderConfirmation } from './components/OrderConfirmation';
import { PizzaCustomizer } from './components/PizzaCustomizer';
import { Dish } from './data/menu';
import { ShoppingCart, Menu as MenuIcon, X, ChevronDown, UtensilsCrossed, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function App() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-span', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.4')
      .from('.hero-p', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero-btns', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  }, { scope: heroRef });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (dish: Dish) => {
    setCartCount(prev => prev + 1);
    setSelectedDish(null);
    setIsCustomizing(false);
    setIsOrderConfirmed(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="text-gold w-8 h-8" />
            <span className="text-2xl font-serif tracking-tighter">LUXEDINE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12 text-sm font-mono uppercase tracking-widest">
            <a href="#hero" className="hover:text-gold transition-colors">Home</a>
            <a href="#menu" className="hover:text-gold transition-colors">Menu</a>
            <a href="#about" className="hover:text-gold transition-colors">Experience</a>
            <a href="#reservation" className="hover:text-gold transition-colors">Reserve</a>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 glass rounded-full hover:bg-white/10 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button className="md:hidden p-2 glass rounded-full">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative h-[130vh] flex flex-col items-center justify-center pt-32 overflow-hidden">
        <div className="relative z-10 text-center px-6 max-w-4xl mb-12">
          <span className="hero-span inline-block text-gold font-mono text-sm uppercase tracking-[0.5em] mb-6">
            Est. 2026 • Michelin Starred
          </span>
          
          <h1 className="hero-title text-6xl md:text-9xl font-serif leading-none mb-8">
            A Symphony <br /> 
            <span className="italic text-gradient-gold">of Flavors</span>
          </h1>
          
          <p className="hero-p text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Experience the future of dining where culinary artistry meets immersive 3D technology. 
            Every dish tells a story, every bite is a masterpiece.
          </p>
          
          {/* Buttons removed as per user request */}
        </div>

        <div className="relative w-full h-[600px] z-10">
          <HeroScene onBurgerClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} />
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Featured Carousel */}
      <FeaturedCarousel />

      {/* Menu Section */}
      <Menu onSelectDish={setSelectedDish} />

      {/* About / Experience Section */}
      <section id="about" className="py-24 px-6 bg-premium-gray">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square glass rounded-3xl overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/restaurant/800/800" 
                alt="Restaurant Interior" 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-premium-gray to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-8 glass p-8 rounded-3xl border border-gold/20 hidden md:block">
              <div className="text-4xl font-serif text-gold mb-1">12</div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/40">Signature <br /> Courses</div>
            </div>
          </div>
          
          <div className="space-y-8">
            <span className="text-gold font-mono text-sm uppercase tracking-[0.4em]">The Experience</span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">Where Art <br /> Meets Taste</h2>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              Our kitchen is a laboratory of flavor, led by world-renowned chefs who push the boundaries of traditional gastronomy. 
              We use only the finest seasonal ingredients, sourced from local artisans and our private organic gardens.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <h4 className="text-gold font-serif text-2xl mb-2">Sustainable</h4>
                <p className="text-sm text-white/40 font-light">Zero-waste kitchen philosophy and eco-friendly sourcing.</p>
              </div>
              <div>
                <h4 className="text-gold font-serif text-2xl mb-2">Immersive</h4>
                <p className="text-sm text-white/40 font-light">Interactive 3D table projections and sensory dining.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <UtensilsCrossed className="text-gold w-8 h-8" />
              <span className="text-2xl font-serif tracking-tighter">LUXEDINE</span>
            </div>
            <p className="text-white/40 font-light max-w-md mb-8">
              Redefining the culinary landscape through innovation, artistry, and a passion for perfection. 
              Join us for an unforgettable journey.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Facebook'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm opacity-50" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-mono uppercase tracking-widest text-sm mb-8">Contact</h4>
            <ul className="space-y-4 text-white/40 font-light">
              <li>123 Luxury Ave, <br /> New York, NY 10001</li>
              <li>+1 (212) 555-0123</li>
              <li>reservations@luxedine.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono uppercase tracking-widest text-sm mb-8">Hours</h4>
            <ul className="space-y-4 text-white/40 font-light">
              <li>Mon - Thu: 5pm - 11pm</li>
              <li>Fri - Sat: 5pm - 1am</li>
              <li>Sunday: 11am - 10pm</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/20">
          <span>© 2026 LuxeDine Restaurant Group</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedDish && (
          <DishViewer 
            dish={selectedDish} 
            onClose={() => setSelectedDish(null)} 
            onAddToCart={handleAddToCart}
          />
        )}
        {isCustomizing && (
          <PizzaCustomizer onClose={() => setIsCustomizing(false)} />
        )}
        {isOrderConfirmed && (
          <OrderConfirmation 
            onClose={() => {
              setIsOrderConfirmed(false);
              setIsTracking(true);
            }} 
          />
        )}
        {isTracking && (
          <DeliveryTracker onClose={() => setIsTracking(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
