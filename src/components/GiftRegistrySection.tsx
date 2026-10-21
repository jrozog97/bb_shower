import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  ShoppingBag,
  ExternalLink,
  Search,
  Copy,
  Check,
  FileText,
  ArrowUpDown,
  Tag,
  Sparkles,
  X,
  ChevronDown,
  Download,
  Eye,
  Shirt,
  Baby,
  Milk,
  Bath,
  Moon,
  Car,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Menu,
  DollarSign,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { PEPE_GANGA_REGISTRY_INFO, PEPE_GANGA_GIFT_ITEMS, GiftRegistryItem } from '../data/pepeGangaGiftList';

interface GiftRegistrySectionProps {
  giftNote?: string;
}

type CategoryFilter = 'todos' | 'ropa' | 'alimentacion' | 'aseo' | 'habitacion' | 'paseo' | 'juguetes' | 'bonos';
type PriceFilter = 'all' | 'under50' | '50to100' | '100to250' | 'over250';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

export const GiftRegistrySection: React.FC<GiftRegistrySectionProps> = ({ giftNote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('todos');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [activePdfPage, setActivePdfPage] = useState<1 | 2>(1);
  const [itemsToShowCount, setItemsToShowCount] = useState<number>(12);

  const categories = [
    { key: 'todos' as CategoryFilter, label: 'Todas las Categorías', icon: Gift, count: PEPE_GANGA_GIFT_ITEMS.length },
    { key: 'ropa' as CategoryFilter, label: 'Ropita y Accesorios', icon: Shirt, count: PEPE_GANGA_GIFT_ITEMS.filter((i: GiftRegistryItem) => i.categoria === 'ropa').length },
    { key: 'alimentacion' as CategoryFilter, label: 'Alimentación y Lactancia', icon: Milk, count: PEPE_GANGA_GIFT_ITEMS.filter((i: GiftRegistryItem) => i.categoria === 'alimentacion').length },
    { key: 'aseo' as CategoryFilter, label: 'Aseo y Cuidado', icon: Bath, count: PEPE_GANGA_GIFT_ITEMS.filter((i: GiftRegistryItem) => i.categoria === 'aseo').length },
    { key: 'habitacion' as CategoryFilter, label: 'Habitación y Descanso', icon: Moon, count: PEPE_GANGA_GIFT_ITEMS.filter((i: GiftRegistryItem) => i.categoria === 'habitacion').length },
    { key: 'paseo' as CategoryFilter, label: 'Paseo y Transporte', icon: Car, count: PEPE_GANGA_GIFT_ITEMS.filter((i: GiftRegistryItem) => i.categoria === 'paseo').length },
    { key: 'juguetes' as CategoryFilter, label: 'Juguetes y Estimulación', icon: Baby, count: PEPE_GANGA_GIFT_ITEMS.filter((i: GiftRegistryItem) => i.categoria === 'juguetes').length },
    { key: 'bonos' as CategoryFilter, label: 'Bonos de Regalo', icon: CreditCard, count: PEPE_GANGA_GIFT_ITEMS.filter((i: GiftRegistryItem) => i.categoria === 'bonos').length },
  ];

  const priceOptions = [
    { key: 'all' as PriceFilter, label: 'Todos los Precios' },
    { key: 'under50' as PriceFilter, label: 'Menos de $50.000' },
    { key: '50to100' as PriceFilter, label: '$50.000 - $100.000' },
    { key: '100to250' as PriceFilter, label: '$100.000 - $250.000' },
    { key: 'over250' as PriceFilter, label: 'Más de $250.000' },
  ];

  const currentCategoryObj = categories.find(c => c.key === categoryFilter) || categories[0];

  const handleCopyCode = (codigo: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(codigo);
    setCopiedCode(codigo);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const filteredItems = useMemo(() => {
    let result = [...PEPE_GANGA_GIFT_ITEMS];

    // Category
    if (categoryFilter !== 'todos') {
      result = result.filter(item => item.categoria === categoryFilter);
    }

    // Price
    if (priceFilter === 'under50') {
      result = result.filter(item => item.precio < 50000);
    } else if (priceFilter === '50to100') {
      result = result.filter(item => item.precio >= 50000 && item.precio <= 100000);
    } else if (priceFilter === '100to250') {
      result = result.filter(item => item.precio > 100000 && item.precio <= 250000);
    } else if (priceFilter === 'over250') {
      result = result.filter(item => item.precio > 250000);
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(item =>
        item.codigo.toLowerCase().includes(q) ||
        item.descripcion.toLowerCase().includes(q) ||
        item.nombreLegible.toLowerCase().includes(q) ||
        item.proveedor.toLowerCase().includes(q) ||
        item.categoriaLabel.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.precio - b.precio);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.precio - a.precio);
    } else if (sortOption === 'name-asc') {
      result.sort((a, b) => a.nombreLegible.localeCompare(b.nombreLegible));
    }

    return result;
  }, [categoryFilter, priceFilter, searchTerm, sortOption]);

  const displayedItems = filteredItems.slice(0, itemsToShowCount);
  const hasMore = filteredItems.length > itemsToShowCount;

  const resetAllFilters = () => {
    setCategoryFilter('todos');
    setPriceFilter('all');
    setSearchTerm('');
    setSortOption('default');
    setItemsToShowCount(12);
  };

  return (
    <section className="py-6 px-3 sm:px-6 text-center w-full max-w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto rounded-3xl bg-white border border-[#C6A67A]/40 shadow-xl overflow-hidden mb-8"
      >
        {/* =========================================================================
            ENCABEZADO DECORATIVO DE LA LISTA
        ========================================================================== */}
        <div className="p-5 sm:p-7 bg-gradient-to-b from-[#FAF4ED] via-white to-white border-b border-[#C6A67A]/20">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#C6A67A] mx-auto flex items-center justify-center shadow-sm border border-[#C6A67A]/30 mb-2.5 animate-gentle-float">
            <Gift className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <h3 className="font-script text-3xl sm:text-5xl text-[#555A4F] mb-1">
            Lista de Regalos
          </h3>

          <p className="text-xs sm:text-sm text-[#555A4F] font-sans-clean leading-relaxed mt-1.5 max-w-lg mx-auto px-2">
            {giftNote || 'Te compartimos nuestra lista de regalos para nuestro bebé. En ella encontrarás los regalitos que elegimos con mucho amor; solo debes escoger uno y adquirirlo en cualquier punto físico o tienda online de Pepe Ganga.'}
          </p>

          {/* Tarjeta de Información Oficial Continente / Pepe Ganga */}
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#C6A67A]/40 text-left shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2 mb-2">
              <div>
                <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#8c6738] font-bold block">
                  Continente / Pepe Ganga
                </span>
                <div className="text-base sm:text-lg font-mono font-bold text-[#555A4F] flex items-center gap-2">
                  <span>No. Lista: {PEPE_GANGA_REGISTRY_INFO.numeroLista}</span>
                  <button
                    onClick={(e) => handleCopyCode(PEPE_GANGA_REGISTRY_INFO.numeroLista, e)}
                    className="text-[10px] sm:text-[11px] font-sans-clean font-semibold px-2 py-0.5 rounded-md bg-[#FAF4ED] text-[#8c6738] hover:bg-[#f3e8dc] border border-[#C6A67A]/40 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    title="Copiar número de lista"
                  >
                    {copiedCode === PEPE_GANGA_REGISTRY_INFO.numeroLista ? (
                      <>
                        <Check className="w-3 h-3 text-[#25D366]" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#8c6738]" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full bg-[#EBF3EC] text-[#555A4F] border border-[#8A9A83]/30 text-[10px] sm:text-[11px] font-semibold">
                Baby Shower Benjamín
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans-clean text-[#555A4F]">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Titular:</span>
                <span className="font-semibold text-stone-700">{PEPE_GANGA_REGISTRY_INFO.titular}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Almacén Origen:</span>
                <span className="font-semibold text-stone-700">Sucursal No. {PEPE_GANGA_REGISTRY_INFO.almacenOrigen}</span>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-amber-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Nota en caja: <strong>{PEPE_GANGA_REGISTRY_INFO.notas}</strong></span>
            </div>
          </div>

          {/* Botones de Acción Directa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            <a
              href={PEPE_GANGA_REGISTRY_INFO.pepeGangaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#8A9A83] hover:bg-[#788871] text-white font-sans-clean font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Tienda Pepe Ganga</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#FAF4ED] hover:bg-[#F2E8DC] text-[#8c6738] border border-[#C6A67A]/60 font-sans-clean font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#C6A67A] shrink-0" />
              <span>Ver PDF Original ({PEPE_GANGA_GIFT_ITEMS.length})</span>
              <Eye className="w-3.5 h-3.5 text-[#C6A67A] shrink-0" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            BARRA DE BÚSQUEDA Y MENÚ HAMBURGUESA DE CATEGORÍAS + FILTRO DE VALORES
        ========================================================================== */}
        <div className="p-3.5 sm:p-5 bg-stone-50/80 border-b border-stone-200">
          {/* Buscador de Texto */}
          <div className="relative mb-2.5">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setItemsToShowCount(12);
              }}
              placeholder="Buscar por artículo, código (ej. 115873403) o marca..."
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:border-[#8A9A83] focus:ring-2 focus:ring-[#8A9A83]/20 transition-all font-sans-clean text-[#555A4F] placeholder:text-stone-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 rounded-full cursor-pointer"
                title="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Fila de Controles: Menú Hamburguesa de Categorías + Filtro de Valores (Precios) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {/* 1. Botón Menú Hamburguesa de Categorías */}
            <button
              onClick={() => setIsCategoryMenuOpen(true)}
              className={`w-full py-2 px-2.5 rounded-xl border text-xs font-sans-clean font-semibold flex items-center justify-between gap-1.5 transition-all cursor-pointer active:scale-95 ${
                categoryFilter !== 'todos'
                  ? 'bg-[#8A9A83] text-white border-[#75866f] shadow-xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Menu className={`w-3.5 h-3.5 shrink-0 ${categoryFilter !== 'todos' ? 'text-white' : 'text-stone-500'}`} />
                <span className="truncate">
                  {categoryFilter === 'todos' ? 'Categorías' : currentCategoryObj.label}
                </span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                categoryFilter !== 'todos' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {currentCategoryObj.count}
              </span>
            </button>

            {/* 2. Filtro de Valores (Presupuesto) */}
            <div className="relative w-full">
              <select
                value={priceFilter}
                onChange={(e) => {
                  setPriceFilter(e.target.value as PriceFilter);
                  setItemsToShowCount(12);
                }}
                aria-label="Filtrar por rango de precio o valor"
                className={`w-full py-2 pl-2.5 pr-7 rounded-xl border text-xs font-sans-clean font-semibold appearance-none transition-all cursor-pointer focus:outline-hidden ${
                  priceFilter !== 'all'
                    ? 'bg-[#FAF4ED] text-[#8c6738] border-[#C6A67A] font-bold'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {priceOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <DollarSign className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* 3. Ordenar (en móvil ocupa 2 cols o se acomoda limpio) */}
            <div className="relative col-span-2 sm:col-span-1">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Ordenar regalos"
                className="w-full py-2 pl-2.5 pr-7 rounded-xl border border-stone-300 bg-white text-stone-700 text-xs font-sans-clean font-semibold appearance-none transition-all cursor-pointer focus:outline-hidden hover:bg-stone-50"
              >
                <option value="default">Recomendados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: A - Z</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Chips de Filtros Activos con eliminación rápida */}
          {(categoryFilter !== 'todos' || priceFilter !== 'all' || searchTerm) && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-stone-200/60 text-xs">
              <span className="text-[10px] uppercase font-bold text-stone-400">Filtros:</span>

              {categoryFilter !== 'todos' && (
                <button
                  onClick={() => setCategoryFilter('todos')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EBF3EC] border border-[#8A9A83]/40 text-[#555A4F] text-[11px] font-semibold cursor-pointer"
                >
                  <span>{currentCategoryObj.label}</span>
                  <X className="w-3 h-3 text-[#555A4F]" />
                </button>
              )}

              {priceFilter !== 'all' && (
                <button
                  onClick={() => setPriceFilter('all')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF4ED] border border-[#C6A67A]/50 text-[#8c6738] text-[11px] font-semibold cursor-pointer"
                >
                  <span>{priceOptions.find(p => p.key === priceFilter)?.label}</span>
                  <X className="w-3 h-3 text-[#8c6738]" />
                </button>
              )}

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 text-[11px] font-semibold cursor-pointer"
                >
                  <span>&ldquo;{searchTerm}&rdquo;</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              <button
                onClick={resetAllFilters}
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-sans-clean font-bold text-[#8A9A83] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            </div>
          )}
        </div>

        {/* =========================================================================
            LISTADO DE ARTÍCULOS - PRIORIZADO PARA MOBILE Y SIN OVERFLOW
            (Elemento objetivo: div:nth-of-type(3))
        ========================================================================== */}
        <div className="p-3 sm:p-5 w-full max-w-full overflow-hidden">
          {/* Contador de resultados */}
          <div className="flex items-center justify-between text-xs text-stone-500 font-sans-clean mb-2.5 px-0.5">
            <span>
              Mostrando <strong className="text-stone-800">{displayedItems.length}</strong> de <strong className="text-stone-800">{filteredItems.length}</strong> artículos
            </span>
            <span className="text-[11px] text-[#8A9A83] font-medium hidden sm:inline">
              Lista No. 11349
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-10 px-3 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200">
              <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-500 mx-auto flex items-center justify-center mb-2">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-700 font-sans-clean">
                No hay artículos con estos filtros
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5 font-sans-clean">
                Prueba cambiando la categoría o rango de valor
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-3 px-3.5 py-1.5 rounded-xl bg-[#8A9A83] text-white text-xs font-semibold cursor-pointer"
              >
                Ver todos los 80 artículos
              </button>
            </div>
          ) : (
            /* Grid Responsive Móvil: En pantallas pequeñas cada tarjeta tiene 100% de ancho con márgenes limpios y sin desborde */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-left w-full max-w-full">
              {displayedItems.map((item) => {
                const isCopied = copiedCode === item.codigo;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-[#C6A67A] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden max-w-full box-border"
                  >
                    {/* Parte Superior: Categoría y Disponibilidad */}
                    <div className="w-full min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1.5 w-full">
                        <span className="inline-flex items-center gap-1 text-[10px] font-sans-clean font-bold uppercase tracking-wider text-[#8c6738] bg-[#FAF4ED] px-2 py-0.5 rounded-md truncate max-w-[65%]">
                          <Tag className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">{item.categoriaLabel}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 text-[10px] font-sans-clean font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>{item.estado}</span>
                        </span>
                      </div>

                      {/* Nombre Principal del Artículo */}
                      <h4 className="font-sans-clean font-bold text-xs sm:text-sm text-[#555A4F] leading-snug line-clamp-2 break-words">
                        {item.nombreLegible}
                      </h4>

                      {/* Proveedor / Marca */}
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded font-sans-clean truncate max-w-full">
                          {item.proveedor}
                        </span>
                      </div>
                    </div>

                    {/* Parte Inferior: Precio y Barra Táctil del Código (100% Adaptada a Móvil) */}
                    <div className="mt-3 pt-2 border-t border-stone-100 w-full min-w-0">
                      {/* Fila del Precio */}
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-[10px] uppercase font-semibold text-stone-400 font-sans-clean">
                          Precio de lista:
                        </span>
                        <span className="font-mono font-bold text-sm sm:text-base text-[#8c6738]">
                          {item.precioFormateado}
                        </span>
                      </div>

                      {/* Botón táctil interactivo para copiar el código en mobile sin desbordarse */}
                      <button
                        onClick={(e) => handleCopyCode(item.codigo, e)}
                        className={`w-full py-2 px-3 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer select-none active:scale-[0.98] ${
                          isCopied
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                            : 'bg-[#FAF4ED] hover:bg-[#F2E8DC] text-[#555A4F] border-[#C6A67A]/50'
                        }`}
                        title="Toca para copiar código de Pepe Ganga"
                      >
                        <div className="flex items-center gap-1.5 min-w-0 truncate">
                          <Tag className={`w-3.5 h-3.5 shrink-0 ${isCopied ? 'text-white' : 'text-[#C6A67A]'}`} />
                          <span className="text-[11px] font-sans-clean font-medium shrink-0">Cód:</span>
                          <span className="font-mono font-bold text-xs tracking-wider truncate">{item.codigo}</span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-sans-clean font-semibold shrink-0 ml-1">
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white shrink-0" />
                              <span>¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#8c6738] shrink-0" />
                              <span className="text-[#8c6738]">Copiar</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Botón Cargar Más */}
          {hasMore && (
            <div className="mt-5 text-center">
              <button
                onClick={() => setItemsToShowCount(prev => prev + 16)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white border border-[#8A9A83] text-[#6E8168] hover:bg-[#EBF3EC] font-sans-clean font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
              >
                <span>Cargar más artículos ({filteredItems.length - displayedItems.length} restantes)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

          {displayedItems.length === filteredItems.length && filteredItems.length > 12 && (
            <div className="mt-5 text-center text-xs text-stone-400 font-sans-clean flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A83]" />
              <span>Has visto los {filteredItems.length} artículos</span>
            </div>
          )}
        </div>

        {/* Tarjeta Explicativa Sobre Compra en Punto Físico */}
        <div className="p-3.5 sm:p-5 bg-[#FAF4ED] border-t border-[#C6A67A]/40 text-left">
          <div className="flex items-center gap-2 font-sans-clean font-bold text-xs text-[#8c6738]">
            <Sparkles className="w-4 h-4 text-[#C6A67A] shrink-0" />
            <span>¿Cómo comprar en Pepe Ganga?</span>
          </div>
          <p className="text-[11px] text-[#555A4F] mt-1.5 leading-relaxed font-sans-clean">
            Puedes acercarte a cualquier punto físico de <strong>Pepe Ganga</strong> a nivel nacional y dictar el <strong>No. de Lista: 11349</strong> a nombre de <strong>Alejandra Velandia Romero</strong>, o indicar el código específico del regalo que elijas. Recuerda siempre reclamar el <em>ticket de cambio</em>.
          </p>
        </div>
      </motion.div>

      {/* =========================================================================
          MENÚ HAMBURGUESA DE CATEGORÍAS (DRAWER / MODAL MOBILE-FIRST)
      ========================================================================== */}
      <AnimatePresence>
        {isCategoryMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col text-left"
            >
              {/* Header Menú */}
              <div className="p-4 bg-[#FAF4ED] border-b border-[#C6A67A]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white text-[#8c6738] flex items-center justify-center border border-[#C6A67A]/40">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans-clean font-bold text-sm text-[#555A4F]">
                      Categorías de Regalos
                    </h3>
                    <p className="text-[11px] text-stone-500 font-sans-clean">
                      Selecciona una sección para ver los productos
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCategoryMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center border border-stone-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lista de Categorías */}
              <div className="p-3 overflow-y-auto space-y-1.5 max-h-[55vh]">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = categoryFilter === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setCategoryFilter(cat.key);
                        setItemsToShowCount(12);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full p-3 rounded-2xl flex items-center justify-between gap-3 transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-[#8A9A83] text-white shadow-xs font-bold'
                          : 'bg-stone-50 hover:bg-[#FAF4ED] text-[#555A4F] border border-stone-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#8c6738] border border-stone-200'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-sans-clean block">
                            {cat.label}
                          </span>
                          <span className={`text-[10px] block ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                            {cat.count} artículos disponibles
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-white text-[#8A9A83] flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer Menú */}
              <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    setCategoryFilter('todos');
                    setItemsToShowCount(12);
                    setIsCategoryMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-[#8c6738] hover:underline cursor-pointer"
                >
                  Ver todas las categorías
                </button>

                <button
                  onClick={() => setIsCategoryMenuOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#8A9A83] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Listo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#8c6738] flex items-center justify-center shadow-2xs border border-[#C6A67A]/30 shrink-0">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-sans-clean font-bold text-xs sm:text-sm text-[#555A4F]">
                      Lista Oficial de Regalo #11349
                    </h3>
                    <p className="text-[10px] text-stone-500 font-sans-clean">
                      Continente / Pepe Ganga &bull; Baby Shower Benjamín
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-500 hover:text-stone-800 flex items-center justify-center border border-stone-200 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Selector de Página */}
              <div className="px-3 py-2 sm:px-5 sm:py-2.5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-500 font-medium text-[11px]">Página:</span>
                  <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5">
                    <button
                      onClick={() => setActivePdfPage(1)}
                      className={`px-2.5 py-1 rounded-md font-sans-clean font-bold text-[11px] sm:text-xs transition-colors cursor-pointer ${
                        activePdfPage === 1 ? 'bg-[#8A9A83] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Pág. 1 (36)
                    </button>
                    <button
                      onClick={() => setActivePdfPage(2)}
                      className={`px-2.5 py-1 rounded-md font-sans-clean font-bold text-[11px] sm:text-xs transition-colors cursor-pointer ${
                        activePdfPage === 2 ? 'bg-[#8A9A83] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Pág. 2 (44)
                    </button>
                  </div>
                </div>

                <a
                  href="/assets/lista-regalos-11349.pdf"
                  download="Lista_Regalos_11349_Benjamin.pdf"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF4ED] text-[#8c6738] border border-[#C6A67A]/50 font-sans-clean font-bold text-[11px] hover:bg-[#f2e7db] transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3" />
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
              <div className="px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-sans-clean text-[11px]">
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
