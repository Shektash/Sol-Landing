import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [formState, setFormState] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "b05535ab-902c-4817-8d89-8e73c5d045a8",
          subject: "Nueva solicitud de información — Alma del Sur",
          from_name: "Alma del Sur Lendingpage",
          nombre: formState.nombre,
          email: formState.email,
          telefono: formState.telefono,
          mensaje: formState.mensaje,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormState({ nombre: "", email: "", telefono: "", mensaje: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

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

          {formStatus === "success" ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-2xl font-serif tracking-wide">Gracias por su interés.</p>
              <p className="text-primary-foreground/70 tracking-widest uppercase text-sm">Le contactaremos en breve.</p>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit} data-testid="form-contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                  <label className="text-xs uppercase tracking-widest text-primary-foreground/70">Nombre completo</label>
                  <input
                    required
                    type="text"
                    data-testid="input-nombre"
                    value={formState.nombre}
                    onChange={e => setFormState(s => ({ ...s, nombre: e.target.value }))}
                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg placeholder:text-primary-foreground/30"
                    placeholder="Su nombre"
                  />
                </div>
                <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                  <label className="text-xs uppercase tracking-widest text-primary-foreground/70">Email</label>
                  <input
                    required
                    type="email"
                    data-testid="input-email"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg placeholder:text-primary-foreground/30"
                    placeholder="Su correo electrónico"
                  />
                </div>
              </div>

              <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                <label className="text-xs uppercase tracking-widest text-primary-foreground/70">Teléfono</label>
                <input
                  required
                  type="tel"
                  data-testid="input-telefono"
                  value={formState.telefono}
                  onChange={e => setFormState(s => ({ ...s, telefono: e.target.value }))}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg placeholder:text-primary-foreground/30"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                <label className="text-xs uppercase tracking-widest text-primary-foreground/70">Mensaje (Opcional)</label>
                <textarea
                  data-testid="input-mensaje"
                  value={formState.mensaje}
                  onChange={e => setFormState(s => ({ ...s, mensaje: e.target.value }))}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg placeholder:text-primary-foreground/30 resize-none"
                  rows={3}
                  placeholder="¿En qué le podemos ayudar?"
                />
              </div>

              {formStatus === "error" && (
                <p className="text-red-400 text-sm tracking-wide">Ha ocurrido un error. Por favor inténtelo de nuevo.</p>
              )}

              <Button
                type="submit"
                disabled={formStatus === "sending"}
                data-testid="button-submit"
                className="w-full bg-background text-foreground hover:bg-background/90 text-lg h-14 rounded-none font-light tracking-wide uppercase mt-8 disabled:opacity-50"
              >
                {formStatus === "sending" ? "Enviando..." : "Solicitar Información"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* WhatsApp Widget */}
      <a
        href="https://wa.me/34654918910?text=Hola%2C%20me%20interesa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Alma%20del%20Sur"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-whatsapp-widget"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.78L.5 31.5l7.93-2.07A15.45 15.45 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.18a13.6 13.6 0 01-6.93-1.9l-.5-.3-5.17 1.35 1.37-5.02-.33-.52A13.6 13.6 0 012.32 16C2.32 8.98 8.98 2.32 16 2.32S29.68 8.98 29.68 16 23.02 28.68 16 28.68zm7.47-10.2c-.41-.2-2.42-1.2-2.8-1.33-.37-.14-.64-.2-.91.2-.27.41-1.05 1.33-1.29 1.6-.24.28-.47.31-.88.1-.41-.2-1.72-.63-3.27-2.01-1.21-1.08-2.02-2.4-2.26-2.81-.24-.41-.03-.63.18-.84.18-.18.41-.47.61-.7.2-.24.27-.41.41-.68.14-.27.07-.51-.03-.7-.1-.2-.91-2.2-1.25-3.01-.33-.8-.67-.69-.91-.7h-.77c-.27 0-.71.1-1.08.51-.37.41-1.42 1.38-1.42 3.37s1.45 3.91 1.65 4.18c.2.27 2.86 4.37 6.93 6.13.97.42 1.72.67 2.31.86.97.3 1.85.26 2.55.16.78-.12 2.42-.99 2.76-1.94.34-.96.34-1.78.24-1.95-.1-.17-.37-.27-.78-.47z"/>
        </svg>
      </a>

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
