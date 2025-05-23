import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold font-heading mb-2">Generational Nutrition LLC</h3>
            <p className="text-gray-400">Transforming health through medical nutrition therapy</p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-accent transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-2xl hover:text-accent transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-2xl hover:text-accent transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Generational Nutrition LLC. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors mb-2 md:mb-0">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors mb-2 md:mb-0">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors mb-2 md:mb-0">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
