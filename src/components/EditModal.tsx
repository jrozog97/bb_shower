import React, { useState } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import { InvitationConfig } from '../types/invitation';
import { defaultInvitationConfig } from '../data/defaultInvitation';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InvitationConfig;
  onSave: (newConfig: InvitationConfig) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<InvitationConfig>(config);

  if (!isOpen) return null;

  const handleChange = (field: keyof InvitationConfig, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restaurar los valores iniciales (Santiago David, Martha y David)?')) {
      setFormData(defaultInvitationConfig);
      onSave(defaultInvitationConfig);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col border border-stone-200">
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-[#F9F6F0]">
          <div>
            <h3 className="font-script text-2xl text-[#555A4F]">Personalizar Invitación</h3>
            <p className="text-[11px] text-stone-500 font-sans-clean">Modifica los datos del Baby Shower</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 flex items-center justify-center text-stone-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3.5 text-xs font-sans-clean text-stone-700">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
              Nombre del Bebé
            </label>
            <input
              type="text"
              value={formData.babyName}
              onChange={(e) => handleChange('babyName', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-script text-[#555A4F] focus:outline-none focus:ring-1 focus:ring-[#8A9A83]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
              Nombres de los Padres
            </label>
            <input
              type="text"
              value={formData.parentsNames}
              onChange={(e) => handleChange('parentsNames', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#8A9A83]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
                Día (Número)
              </label>
              <input
                type="text"
                value={formData.dayNumber}
                onChange={(e) => handleChange('dayNumber', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs text-center font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
                Mes (Nombre)
              </label>
              <input
                type="text"
                value={formData.monthName}
                onChange={(e) => handleChange('monthName', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs text-center"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
                Hora
              </label>
              <input
                type="text"
                value={formData.timeString}
                onChange={(e) => handleChange('timeString', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs text-center"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
              Salón / Lugar
            </label>
            <input
              type="text"
              value={formData.venueName}
              onChange={(e) => handleChange('venueName', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={formData.venueAddress}
              onChange={(e) => handleChange('venueAddress', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
              Teléfono WhatsApp para Confirmaciones
            </label>
            <input
              type="text"
              value={formData.hostPhone}
              onChange={(e) => handleChange('hostPhone', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[10px] text-stone-500 mb-1">
              Nota de Regalos
            </label>
            <textarea
              rows={2}
              value={formData.giftNote}
              onChange={(e) => handleChange('giftNote', e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs"
            />
          </div>
        </div>

        <div className="px-5 py-3 border-t border-stone-200 bg-[#F9F6F0] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restaurar</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-xl bg-[#8A9A83] hover:bg-[#788871] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
