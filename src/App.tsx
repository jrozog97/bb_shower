import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Settings, Mail } from 'lucide-react';
import { InvitationConfig } from './types/invitation';
import { defaultInvitationConfig } from './data/defaultInvitation';
import { audioPlayer } from './utils/audioPlayer';

// Components
import { EnvelopeCover } from './components/EnvelopeCover';
import { InvitationMainView } from './components/InvitationMainView';
import { EditModal } from './components/EditModal';

export default function App() {
  const [config, setConfig] = useState<InvitationConfig>(() => {
    const saved = localStorage.getItem('santiago_david_invitation');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultInvitationConfig;
      }
    }
    return defaultInvitationConfig;
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Start music on user interaction
    audioPlayer.play(config.musicUrl);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
  };

  const handleSaveConfig = (newConfig: InvitationConfig) => {
    setConfig(newConfig);
    localStorage.setItem('santiago_david_invitation', JSON.stringify(newConfig));
  };

  return (
    <div className="min-h-screen bg-[#353D37] flex flex-col justify-center items-center relative overflow-x-hidden selection:bg-[#9EB299]/30">
      {/* Ambient backdrop for desktop view */}
      <div className="fixed inset-0 pointer-events-none opacity-25 blur-3xl bg-[radial-gradient(circle_at_center,_#9EB299_0%,_transparent_70%)]" />

      {/* Floating Host Quick Controls (Top Right) */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {isEnvelopeOpen && (
          <button
            onClick={handleReopenEnvelope}
            className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#8A9A83]/30 text-[#555A4F] text-[11px] font-sans-clean font-semibold shadow-md hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Cerrar y volver a ver el sobre"
          >
            <Mail className="w-3.5 h-3.5 text-[#8A9A83]" />
            <span className="hidden sm:inline">Ver Sobre</span>
          </button>
        )}

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-[#8A9A83]/30 text-[#8A9A83] hover:text-[#555A4F] hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer"
          title="Editar datos de la invitación"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* State 1: Envelope Cover (Animated Screen 1) */}
      <AnimatePresence>
        {!isEnvelopeOpen && (
          <EnvelopeCover
            onOpen={handleOpenEnvelope}
            babyName={config.babyName}
          />
        )}
      </AnimatePresence>

      {/* State 2: Main Invitation (Scrollable View Container, mobile-first max-w-md) */}
      <main className="w-full max-w-md mx-auto shadow-2xl relative z-10">
        <InvitationMainView
          config={config}
          onEditRequested={() => setIsEditModalOpen(true)}
        />
      </main>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
