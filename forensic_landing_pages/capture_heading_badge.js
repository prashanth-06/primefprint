const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const edge = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless',
  '--remote-debugging-port=9231',
  '--disable-gpu',
  'http://localhost:3000/landing_slider.html#services'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9231/json', (res) => {
    let raw = '';
    res.on('data', d => raw += d);
    res.on('end', () => {
      const tabs = JSON.parse(raw);
      const pageTab = tabs.find(t => t.url && t.url.includes('landing_slider.html'));
      if (pageTab) {
        const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
        ws.onopen = () => {
          ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
          ws.send(JSON.stringify({
            id: 2,
            method: 'Emulation.setDeviceMetricsOverride',
            params: {
              width: 800,
              height: 400,
              deviceScaleFactor: 2,
              mobile: false
            }
          }));
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 3,
              method: 'Page.captureScreenshot',
              params: {
                clip: {
                  x: 100,
                  y: 1100,
                  width: 600,
                  height: 200,
                  scale: 1
                }
              }
            }));
          }, 1200);
        };
        ws.onmessage = (msg) => {
          const res = JSON.parse(msg.data);
          if (res.id === 3 && res.result && res.result.data) {
            fs.writeFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/shot_badge_fix.png', Buffer.from(res.result.data, 'base64'));
            console.log('Badge fix screenshot captured!');
            edge.kill();
            process.exit(0);
          }
        };
      }
    });
  });
}, 3000);
