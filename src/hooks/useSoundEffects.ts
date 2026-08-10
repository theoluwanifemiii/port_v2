import { useCallback, useEffect, useRef } from 'react';

interface SoundEffects {
  playStartup: () => void;
  playClick: () => void;
  playMinimize: () => void;
  playMaximize: () => void;
  playError: () => void;
  playKeystroke: () => void;
}

export const useSoundEffects = (enabled: boolean = true): SoundEffects => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (enabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      audioContextRef.current?.close();
    };
  }, [enabled]);

  const playTone = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    if (!enabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    // Browsers create AudioContext in a "suspended" state until a user
    // gesture unlocks it. The context is constructed in an effect (not
    // itself a gesture), so without this the very first sound after
    // mount can silently no-op. Resuming is safe to call every time.
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [enabled]);

  const playStartup = useCallback(() => {
    playTone(523.25, 0.1);
    setTimeout(() => playTone(659.25, 0.1), 100);
    setTimeout(() => playTone(783.99, 0.1), 200);
    setTimeout(() => playTone(1046.50, 0.3), 300);
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(800, 0.05, 0.05);
  }, [playTone]);

  const playMinimize = useCallback(() => {
    playTone(600, 0.1);
    setTimeout(() => playTone(400, 0.1), 50);
  }, [playTone]);

  const playMaximize = useCallback(() => {
    playTone(400, 0.1);
    setTimeout(() => playTone(600, 0.1), 50);
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(200, 0.2);
  }, [playTone]);

  // Deliberately quieter and shorter than playClick, with a touch of pitch
  // variance — this fires once per typed character, so it needs to sit in
  // the background rather than announce itself.
  const playKeystroke = useCallback(() => {
    playTone(1150 + Math.random() * 200, 0.02, 0.025);
  }, [playTone]);

  return {
    playStartup,
    playClick,
    playMinimize,
    playMaximize,
    playError,
    playKeystroke,
  };
};
