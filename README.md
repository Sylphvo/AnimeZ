# HTTPS Server Setup

This project includes a simple HTTPS server using Node.js and self-signed SSL certificates.

## Prerequisites

- Node.js installed
- npm installed

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate SSL certificates:
   ```bash
   node generate-cert.js
   ```

3. Start the HTTPS server:
   ```bash
   npm run server
   ```

The server will run on https://localhost:3000

## Note

Since the certificates are self-signed, your browser will show a security warning. You can safely proceed by accepting the certificate for local development.

## Files

- `server.js`: The HTTPS server implementation
- `generate-cert.js`: Script to generate self-signed SSL certificates
- `certificates/`: Directory containing the generated certificates
  - `key.pem`: Private key
  - `cert.pem`: Certificate
