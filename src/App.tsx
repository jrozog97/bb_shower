import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { InvitationConfig } from './types/invitation';
import { defaultInvitationConfig } from './data/defaultInvitation';
import { audioPlayer } from './utils/audioPlayer';

// Components
import { EnvelopeCover } from './components/EnvelopeCover';
import { InvitationMainView } from './components/InvitationMainView';

export default function App() {
  const [config] = useState<InvitationConfig>(defaultInvitationConfig);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = () => {
    // Start gentle music synchronously on user interaction (critical for mobile iOS/Android)
    audioPlayer.play(config.musicUrl);
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#2c332e] flex flex-col justify-center items-center relative overflow-x-hidden selection:bg-[#9EB299]/30">
      {/* Ambient backdrop for desktop view */}
      <div className="fixed inset-0 pointer-events-none opacity-20 blur-3xl bg-[radial-gradient(circle_at_center,_#9EB299_0%,_transparent_75%)]" />

      {/* State 1: Envelope Cover (Animated Screen 1, 100vh) */}
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
        <InvitationMainView config={config} />
      </main>
    </div>
  );
}
