import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  ShoppingBag,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Download,
  Eye,
  Sparkles,
  X,
  AlertCircle
} from 'lucide-react';
import { PEPE_GANGA_REGISTRY_INFO, PEPE_GANGA_GIFT_ITEMS } from '../data/pepeGangaGiftList';

interface GiftRegistrySectionProps {
  giftNote?: string;
}

export const GiftRegistrySection: React.FC<GiftRegistrySectionProps> = ({ giftNote }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [activePdfPage, setActivePdfPage] = useState<1 | 2>(1);

  const handleCopyCode = (codigo: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(codigo);
    setCopiedCode(codigo);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section className="py-6 px-3 sm:px-6 text-center w-full max-w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto rounded-3xl bg-white border border-[#C6A67A]/40 shadow-xl overflow-hidden mb-4"
      >
        {/* =========================================================================
            ENCABEZADO DECORATIVO DE LA LISTA
        ========================================================================== */}
        <div className="p-5 sm:p-7 bg-gradient-to-b from-[#FAF4ED] via-white to-white">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#C6A67A] mx-auto flex items-center justify-center shadow-sm border border-[#C6A67A]/30 mb-2.5 animate-gentle-float">
            <Gift className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <h3 className="font-script text-3xl sm:text-5xl text-[#555A4F] mb-1">
            Lista de Regalos
          </h3>

          <p className="text-xs sm:text-sm text-[#555A4F] font-sans-clean leading-relaxed mt-1.5 max-w-lg mx-auto px-2">
            {giftNote || 'Te compartimos nuestra lista de regalos para nuestro bebé Benjamín. En ella encontrarás los regalitos que elegimos con mucho amor; puedes escoger el que desees y adquirirlo en cualquier punto físico o tienda online de Pepe Ganga.'}
          </p>

          {/* Tarjeta de Información Oficial Continente / Pepe Ganga */}
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#C6A67A]/40 text-left shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C6A67A]/20 pb-2.5 mb-2.5">
              <div>
                <span className="text-xs font-sans-clean uppercase tracking-wider text-[#8c6738] font-bold block">
                  Continente / Pepe Ganga
                </span>
                <div className="text-lg sm:text-xl font-mono font-bold text-[#555A4F] flex items-center gap-2 mt-0.5">
                  <span>No. Lista: {PEPE_GANGA_REGISTRY_INFO.numeroLista}</span>
                  <button
                    onClick={(e) => handleCopyCode(PEPE_GANGA_REGISTRY_INFO.numeroLista, e)}
                    className="text-xs font-sans-clean font-semibold px-2.5 py-1 rounded-md bg-white text-[#8c6738] hover:bg-[#f3e8dc] border border-[#C6A67A]/40 transition-colors inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="Copiar número de lista"
                  >
                    {copiedCode === PEPE_GANGA_REGISTRY_INFO.numeroLista ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8c6738]" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#EBF3EC] text-[#555A4F] border border-[#8A9A83]/30 text-xs font-semibold">
                Baby Shower Benjamín
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans-clean text-[#555A4F]">
              <div>
                <span className="text-stone-400 block text-xs uppercase font-medium">Titulares:</span>
                <span className="font-bold text-stone-700">{PEPE_GANGA_REGISTRY_INFO.titular}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-xs uppercase font-medium">Almacén Origen:</span>
                <span className="font-semibold text-stone-700">Sucursal No. {PEPE_GANGA_REGISTRY_INFO.almacenOrigen}</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#C6A67A]/20 flex items-center gap-2 text-xs sm:text-sm text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
              <span>Nota en caja: <strong>{PEPE_GANGA_REGISTRY_INFO.notas}</strong></span>
            </div>
          </div>

          {/* Botones de Acción Directa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-[#8A9A83] hover:bg-[#788871] text-white font-sans-clean font-bold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4 text-white shrink-0" />
              <span>Ver Lista en PDF ({PEPE_GANGA_GIFT_ITEMS.length})</span>
              <Eye className="w-4 h-4 text-white shrink-0" />
            </button>

            <a
              href={PEPE_GANGA_REGISTRY_INFO.pepeGangaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#FAF4ED] hover:bg-[#F2E8DC] text-[#8c6738] border border-[#C6A67A]/60 font-sans-clean font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Tienda Pepe Ganga</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>

        {/* Tarjeta Explicativa Paso a Paso: ¿Cómo comprar en Pepe Ganga? */}
        <div className="p-4 sm:p-5 bg-[#FAF4ED] border-t border-[#C6A67A]/40 text-left">
          <div className="flex items-center gap-2 font-sans-clean font-bold text-xs sm:text-sm text-[#8c6738] mb-2">
            <Sparkles className="w-4 h-4 text-[#C6A67A] shrink-0" />
            <span>¿Cómo comprar el regalo en Pepe Ganga?</span>
          </div>
          <ol className="text-xs sm:text-sm text-[#555A4F] space-y-1.5 font-sans-clean list-decimal list-inside leading-relaxed">
            <li>
              Acércate a cualquier punto físico de <strong>Pepe Ganga</strong> a nivel nacional o ingresa a su tienda online.
            </li>
            <li>
              En el área de cajas o servicio al cliente, indica el <strong>No. de Lista: 11349</strong> a nombre de <strong>Andrés y Alejandra</strong>.
            </li>
            <li>
              Elige el regalito que más te guste para Benjamín.
            </li>
            <li>
              Recuerda siempre solicitar el <em>ticket de cambio</em> para adjuntarlo con tu regalo.
            </li>
          </ol>
        </div>
      </motion.div>

      {/* =========================================================================
          MODAL CON DOCUMENTO PDF ORIGINAL DIGITALIZADO (PÁGINAS 1 Y 2)
      ========================================================================== */}
      <AnimatePresence>
        {isPdfModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            >
              {/* Header Modal */}
              <div className="px-4 py-3 sm:px-5 sm:py-4 bg-[#FAF4ED] border-b border-[#C6A67A]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white text-[#8c6738] flex items-center justify-center shadow-2xs border border-[#C6A67A]/30 shrink-0">
                    <FileText className="w-4 h-4 text-[#C6A67A]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-sans-clean font-bold text-xs sm:text-sm text-[#555A4F]">
                      Lista Oficial de Regalo #11349
                    </h3>
                    <p className="text-xs text-stone-500 font-sans-clean">
                      Continente / Pepe Ganga &bull; Baby Shower Benjamín
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center border border-stone-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Selector de Página */}
              <div className="px-3 py-2 sm:px-5 sm:py-2.5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-500 font-medium text-xs">Página:</span>
                  <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5">
                    <button
                      onClick={() => setActivePdfPage(1)}
                      className={`px-3 py-1 rounded-md font-sans-clean font-bold text-xs transition-colors cursor-pointer ${
                        activePdfPage === 1 ? 'bg-[#8A9A83] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Pág. 1 (36 artículos)
                    </button>
                    <button
                      onClick={() => setActivePdfPage(2)}
                      className={`px-3 py-1 rounded-md font-sans-clean font-bold text-xs transition-colors cursor-pointer ${
                        activePdfPage === 2 ? 'bg-[#8A9A83] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Pág. 2 (44 artículos)
                    </button>
                  </div>
                </div>

                <a
                  href="/assets/lista-regalos-11349.pdf"
                  download="Lista_Regalos_11349_Benjamin.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF4ED] text-[#8c6738] border border-[#C6A67A]/50 font-sans-clean font-bold text-xs hover:bg-[#f2e7db] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar PDF</span>
                </a>
              </div>

              {/* Visor de Imagen Digitalizada del PDF Oficial */}
              <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-stone-100 flex items-center justify-center">
                <div className="max-w-xl w-full bg-white rounded-xl shadow-md overflow-hidden border border-stone-300">
                  <img
                    src={activePdfPage === 1 ? '/assets/page_1.jpg' : '/assets/page_2.jpg'}
                    alt={`Página ${activePdfPage} de la Lista de Regalos Continente 11349`}
                    className="w-full h-auto object-contain block"
                  />
                </div>
              </div>

              {/* Footer Modal */}
              <div className="px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-t border-stone-200 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-stone-500 font-sans-clean text-xs">
                  Total: <strong>80 artículos</strong>
                </span>

                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-[#8A9A83] text-white font-sans-clean font-bold text-xs uppercase tracking-wider hover:bg-[#788871] transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
