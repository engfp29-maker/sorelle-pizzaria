const https = require('https');
const os = require('os');
const fs = require('fs');
const path = require('path');

const home = os.homedir();
const possiblePaths = [
  path.join(home, '.vercel', 'config.json'),
  path.join(process.env.APPDATA || '', 'Vercel', 'config.json'),
  path.join(home, 'AppData', 'Roaming', 'Vercel', 'config.json'),
  path.join(home, 'AppData', 'Local', 'Vercel', 'config.json'),
];

function findConfig() {
  for (const p of possiblePaths) {
    console.log('Checking:', p);
    if (fs.existsSync(p)) {
      console.log('Found config at:', p);
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    }
  }
  // Try vercel CLI auth file
  const authPath = path.join(home, '.vercel', 'auth.json');
  if (fs.existsSync(authPath)) {
    console.log('Found auth at:', authPath);
    return JSON.parse(fs.readFileSync(authPath, 'utf8'));
  }
  return null;
}

const config = findConfig();
if (!config) {
  console.log('Config not found');
  process.exit(1);
}

const token = config.token;
console.log('Token found:', token.substring(0, 15) + '...');

const data = JSON.stringify({ ssoProtection: null });
const options = {
  hostname: 'api.vercel.com',
  path: '/v1/projects/sorelle-pizzaria?teamId=team_HD5u9pdrwjs6HXkA8ZV5kmXA',
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const parsed = JSON.parse(body);
      console.log('Response:', JSON.stringify(parsed, null, 2));
    } catch {
      console.log('Raw response:', body);
    }
  });
});
req.on('error', e => console.error('Error:', e.message));
req.write(data);
req.end();