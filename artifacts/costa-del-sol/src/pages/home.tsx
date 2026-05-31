import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white p-6 flex justify-between items-center">
        <div className="font-serif text-2xl tracking-widest uppercase">ALMA DEL SUR</div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
          <a href="#vision" className="hover:opacity-70 transition-opacity">Visión</a>
          <a href="#residencias" className="hover:opacity-70 transition-opacity">Residencias</a>
          <a href="#contacto" className="hover:opacity-70 transition-opacity">Contacto</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[100dvh] overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img 
            src="/hero.png" 
            alt="Alma del Sur Coast" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.2, 0.6, 0.2, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6"
          >
            Donde el mar<br/>te pertenece.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-lg md:text-xl font-light tracking-widest uppercase"
          >
            Marbella · Costa del Sol
          </motion.p>
        </div>
      </section>

      {/* Vision / Intro */}
      <section id="vision" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative z-30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-12 text-foreground">
              Una colección exclusiva de villas donde la arquitectura andaluza abraza el minimalismo contemporáneo.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
              Alma del Sur no es solo un destino, es una declaración de intenciones. 
              Situado en el punto más elevado de la bahía de Estepona, cada residencia 
              está orientada para capturar la luz dorada del Mediterráneo. Aquí, el tiempo 
              se detiene, los espacios se expanden y la frontera entre el interior y 
              la naturaleza desaparece.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Imagery Split Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img 
              src="/facade.png" 
              alt="Villa Facade" 
              className="w-full aspect-[4/3] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="text-sm tracking-widest uppercase text-muted-foreground mb-6 block">Arquitectura</span>
            <h3 className="text-4xl md:text-5xl mb-8">Piedra cálida y luz natural</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Inspiradas en los pueblos blancos, las fachadas de Alma del Sur 
              reflejan el sol andaluz mientras protegen interiores de proporciones majestuosas. 
              Materiales nobles, texturas orgánicas y una paleta cromática que emula 
              la arena y el olivo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interior Parallax */}
      <section className="py-24 relative overflow-hidden h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/interior.png" 
            alt="Interior view" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6 max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl mb-6">El refugio perfecto</h2>
          <p className="text-xl font-light">Interiores pensados para el bienestar absoluto.</p>
        </motion.div>
      </section>

      {/* Amenities / Lifestyle */}
      <section id="residencias" className="py-32 px-6 md:px-12 lg:px-24 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl mb-6">Exclusividad sin artificios</h2>
            <p className="text-muted-foreground text-lg uppercase tracking-widest">Las amenidades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="overflow-hidden mb-6 aspect-[3/4]">
                <img 
                  src="/pool.png" 
                  alt="Infinity Pool" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <h4 className="text-2xl mb-3">Piscinas Infinitas</h4>
              <p className="text-muted-foreground">Agua que se funde con el horizonte del Mediterráneo en la privacidad de tu terraza.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group md:mt-24"
            >
              <div className="overflow-hidden mb-6 aspect-[3/4]">
                <img 
                  src="/lifestyle.png" 
                  alt="Lifestyle" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <h4 className="text-2xl mb-3">Vida al aire libre</h4>
              <p className="text-muted-foreground">Más de 300 días de sol al año exigen espacios exteriores diseñados para ser vividos.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl mb-6">Registro de Interés</h2>
            <p className="text-primary-foreground/80 text-lg">
              Descubra más sobre Alma del Sur. Precios desde €1.2M.
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                <label className="text-xs uppercase tracking-widest text-primary-foreground/70">Nombre completo</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg placeholder:text-primary-foreground/30"
                  placeholder="Su nombre"
                />
              </div>
              <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                <label className="text-xs uppercase tracking-widest text-primary-foreground/70">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg placeholder:text-primary-foreground/30"
                  placeholder="Su correo electrónico"
                />
              </div>
            </div>
            
            <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
              <label className="text-xs uppercase tracking-widest text-primary-foreground/70">Teléfono</label>
              <input 
                type="tel" 
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg placeholder:text-primary-foreground/30"
                placeholder="+34 600 000 000"
              />
            </div>

            <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
              <label className="text-xs uppercase tracking-widest text-primary-foreground/70">Mensaje (Opcional)</label>
              <textarea 
                className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg placeholder:text-primary-foreground/30 resize-none"
                rows={3}
                placeholder="¿En qué le podemos ayudar?"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-background text-foreground hover:bg-background/90 text-lg h-14 rounded-none font-light tracking-wide uppercase mt-8"
            >
              Solicitar Información
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-foreground py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif text-2xl tracking-widest uppercase">Alma del Sur</div>
          <div className="flex gap-6 text-sm text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">Aviso Legal</a>
            <a href="#" className="hover:text-foreground">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
