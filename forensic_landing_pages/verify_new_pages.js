const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const edge = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless',
  '--remote-debugging-port=9286',
  '--disable-gpu',
  'http://localhost:3000/service_pcc.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9286/json', (res) => {
    let raw = '';
    res.on('data', d => raw += d);
    res.on('end', () => {
      const tabs = JSON.parse(raw);
      const pageTab = tabs.find(t => t.url && t.url.includes('service_pcc.html'));
      if (pageTab) {
        const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
        ws.onopen = () => {
          ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
          ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
          ws.send(JSON.stringify({
            id: 3,
            method: 'Emulation.setDeviceMetricsOverride',
            params: {
              width: 1400,
              height: 900,
              deviceScaleFactor: 2,
              mobile: false
            }
          }));
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 4,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 1500);
        };
        ws.onmessage = (msg) => {
          const res = JSON.parse(msg.data);
          if (res.id === 4 && res.result && res.result.data) {
            fs.writeFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/shot_service_pcc.png', Buffer.from(res.result.data, 'base64'));
            console.log('PCC service page screenshot captured!');
            
            // Navigate to FINRA
            ws.send(JSON.stringify({
              id: 5,
              method: 'Page.navigate',
              params: { url: 'http://localhost:3000/service_finra.html' }
            }));

            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 6,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 1800);
          } else if (res.id === 6 && res.result && res.result.data) {
            fs.writeFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/shot_service_finra.png', Buffer.from(res.result.data, 'base64'));
            console.log('FINRA service page screenshot captured!');
            edge.kill();
            process.exit(0);
          }
        };
      }
    });
  });
}, 3000);
