import { FC, useEffect, useRef, useState } from 'react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Flipper {
  x: number;
  y: number;
  width: number;
  angle: number;
  isLeft: boolean;
}

interface Bumper {
  x: number;
  y: number;
  radius: number;
}

export const PinballGame: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameStateRef = useRef({
    ball: { x: 250, y: 100, vx: 2, vy: 0, radius: 8 } as Ball,
    leftFlipper: { x: 150, y: 520, width: 60, angle: -0.4, isLeft: true } as Flipper,
    rightFlipper: { x: 350, y: 520, width: 60, angle: 0.4, isLeft: false } as Flipper,
    bumpers: [
      { x: 250, y: 200, radius: 25 },
      { x: 180, y: 280, radius: 25 },
      { x: 320, y: 280, radius: 25 },
      { x: 250, y: 360, radius: 25 },
    ] as Bumper[],
    leftFlipperActive: false,
    rightFlipperActive: false,
    gravity: 0.3,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        state.leftFlipperActive = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        state.rightFlipperActive = true;
      }
      if (e.key === ' ' && gameOver) {
        resetGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        state.leftFlipperActive = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        state.rightFlipperActive = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const resetGame = () => {
      state.ball = { x: 250, y: 100, vx: 2, vy: 0, radius: 8 };
      setScore(0);
      setGameOver(false);
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff6b6b';
      ctx.fill();
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawFlipper = (flipper: Flipper) => {
      ctx.save();
      ctx.translate(flipper.x, flipper.y);

      const targetAngle = flipper.isLeft
        ? (state.leftFlipperActive ? 0.4 : -0.4)
        : (state.rightFlipperActive ? -0.4 : 0.4);

      flipper.angle += (targetAngle - flipper.angle) * 0.3;
      ctx.rotate(flipper.angle);

      ctx.fillStyle = '#ffd700';
      ctx.fillRect(-10, -5, flipper.width, 10);
      ctx.strokeStyle = '#ffaa00';
      ctx.lineWidth = 2;
      ctx.strokeRect(-10, -5, flipper.width, 10);

      ctx.restore();
    };

    const drawBumper = (bumper: Bumper) => {
      ctx.beginPath();
      ctx.arc(bumper.x, bumper.y, bumper.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#4ecdc4';
      ctx.fill();
      ctx.strokeStyle = '#45b7aa';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bumper.x, bumper.y, bumper.radius - 8, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const updateBall = () => {
      state.ball.vy += state.gravity;
      state.ball.x += state.ball.vx;
      state.ball.y += state.ball.vy;

      if (state.ball.x - state.ball.radius < 0 || state.ball.x + state.ball.radius > canvas.width) {
        state.ball.vx = -state.ball.vx;
        state.ball.x = Math.max(state.ball.radius, Math.min(canvas.width - state.ball.radius, state.ball.x));
      }

      if (state.ball.y - state.ball.radius < 0) {
        state.ball.vy = -state.ball.vy * 0.8;
        state.ball.y = state.ball.radius;
      }

      if (state.ball.y > canvas.height) {
        setGameOver(true);
      }

      state.bumpers.forEach(bumper => {
        const dx = state.ball.x - bumper.x;
        const dy = state.ball.y - bumper.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < state.ball.radius + bumper.radius) {
          const angle = Math.atan2(dy, dx);
          const speed = Math.sqrt(state.ball.vx * state.ball.vx + state.ball.vy * state.ball.vy);
          state.ball.vx = Math.cos(angle) * (speed + 3);
          state.ball.vy = Math.sin(angle) * (speed + 3);

          const overlap = state.ball.radius + bumper.radius - distance;
          state.ball.x += Math.cos(angle) * overlap;
          state.ball.y += Math.sin(angle) * overlap;

          setScore(prev => prev + 100);
        }
      });

      [state.leftFlipper, state.rightFlipper].forEach(flipper => {
        const dx = state.ball.x - flipper.x;
        const dy = state.ball.y - flipper.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < flipper.width && Math.abs(dy) < 15) {
          const isActive = flipper.isLeft ? state.leftFlipperActive : state.rightFlipperActive;
          if (isActive) {
            state.ball.vy = -15;
            state.ball.vx = (state.ball.x - flipper.x) * 0.3;
            setScore(prev => prev + 10);
          } else {
            state.ball.vy = -8;
          }
        }
      });
    };

    const animate = () => {
      if (gameOver) return;

      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#16213e';
      ctx.lineWidth = 10;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      state.bumpers.forEach(drawBumper);
      drawFlipper(state.leftFlipper);
      drawFlipper(state.rightFlipper);
      drawBall();
      updateBall();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex justify-between w-full max-w-[500px] px-4">
        <div className="text-white font-mono text-lg">
          Score: <span className="text-yellow-400 font-bold">{score}</span>
        </div>
        <div className="text-gray-400 text-sm">
          Controls: A/← and D/→
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={600}
        className="border-4 border-gray-700 bg-[#1a1a2e] shadow-2xl"
      />

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="bg-[#ece9d8] border-4 border-[#0054e3] p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-[#003da8]" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              Game Over!
            </h2>
            <p className="text-xl mb-4">Final Score: {score}</p>
            <button
              onClick={() => {
                gameStateRef.current.ball = { x: 250, y: 100, vx: 2, vy: 0, radius: 8 };
                setScore(0);
                setGameOver(false);
              }}
              className="xp-button px-6 py-2 text-sm"
            >
              Play Again (Space)
            </button>
          </div>
        </div>
      )}

      <div className="text-gray-400 text-xs text-center max-w-[500px]">
        <p>Hit the bumpers to score points!</p>
        <p>Use the flippers to keep the ball in play.</p>
      </div>
    </div>
  );
};
