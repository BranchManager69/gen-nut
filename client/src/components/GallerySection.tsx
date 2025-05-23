import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    {
      src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Healthy meal preparation",
    },
    {
      src: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Nutrition consultation session",
    },
    {
      src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Balanced healthy meal",
    },
    {
      src: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Fresh healthy ingredients",
    },
    {
      src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Nutritional assessment session",
    },
    {
      src: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Healthy food composition",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
            Snapshots
          </h2>
          <p className="text-lg text-neutral-800">
            A glimpse into balanced nutrition and wellness approaches.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-all"
              variants={item}
              onClick={() => setSelectedImage(image.src)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover" 
              />
            </motion.div>
          ))}
        </motion.div>
        
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-transparent border-none">
            <DialogClose className="absolute right-4 top-4 rounded-full p-2 bg-white text-gray-800 hover:bg-gray-200 z-10">
              <X className="h-6 w-6" />
            </DialogClose>
            <img 
              src={selectedImage || ""} 
              alt="Gallery image enlarged" 
              className="max-h-[80vh] object-contain bg-black/90 rounded-lg" 
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
