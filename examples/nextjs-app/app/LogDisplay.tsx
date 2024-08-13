// @ts-nocheck
'use client';


import { useEffect, useState } from 'react';

function LogDisplay() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Override console.log to capture logs
    const originalConsoleLog = console.log;
    console.log = function(...args) {
      const logMessage = args.join(' ');
      const event = new CustomEvent('log', { detail: logMessage });
      window.dispatchEvent(event);
      originalConsoleLog.apply(console, args);
    };

    // Listen for log events
    const handleLogEvent = (event: CustomEvent) => {
      setLogs((prevLogs) => [...prevLogs, event.detail]);
    };

    window.addEventListener('log', handleLogEvent);

    return () => {
      window.removeEventListener('log', handleLogEvent);
      console.log = originalConsoleLog; // Restore original console.log
    };
  }, []);

  return (
    <div style={{ padding: '10px', backgroundColor: '#333', color: '#fff', fontFamily: 'monospace' }}>
      <h2>Logs</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default LogDisplay;
