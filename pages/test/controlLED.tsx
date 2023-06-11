import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

export default function ControlLED() {
  const [clientLoaded, setClientLoaded] = useState(false);

  useEffect(() => {
    // Load Johnny-Five dynamically on the client-side
    const loadClient = async () => {
      const { Board } = await import('johnny-five');
      if (typeof Board === 'function') {
        setClientLoaded(true);
      }
    };

    loadClient();
  }, []);

  const handleBtnClick = async () => {
    if (!clientLoaded) {
      return;
    }

    const { Board, Led } = await import('johnny-five');
    const board = new Board();
    board.on('ready', () => {
      const led = new Led(5);
      led.blink(500);
    });
  };

  if (!clientLoaded) {
    return null; // Render nothing on the server-side
  }

  return (
    <div>
      <button onClick={handleBtnClick}>Blink LED</button>
    </div>
  );
}
