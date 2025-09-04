const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

const certDir = path.join(__dirname, 'certificates');

// Ensure certificates directory exists
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir);
}

// Generate self-signed certificate
const attrs = [
  { name: 'commonName', value: 'localhost' },
  { name: 'countryName', value: 'US' },
  { name: 'stateOrProvinceName', value: 'State' },
  { name: 'localityName', value: 'City' },
  { name: 'organizationName', value: 'Organization' },
];

const pems = selfsigned.generate(attrs, { days: 365 });

fs.writeFileSync(path.join(certDir, 'key.pem'), pems.private);
fs.writeFileSync(path.join(certDir, 'cert.pem'), pems.cert);

console.log('SSL certificates generated successfully!');
