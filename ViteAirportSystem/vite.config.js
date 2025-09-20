import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' https://m.stripe.network https://js.stripe.com https://cdn.jsdelivr.net 'sha256-e357n1PxCJ8d03/QCSKaHFmHF1JADyvSHdSfshxM494=' 'sha256-5DA+a07wxWmEka9IdoWjSPVHb17Cp5284/lJzfbl8KA=' 'sha256-/5Guo2nzv5n/w6ukZpOBZOtTJBJPSkJ6mhHpnBgm3Ls=' 'sha256-MqH8JJslY2fF2bGYY1rZlpCNrRCnWKRzrrDefixUJTI=' 'sha256-ZswfTY7H35rbv8WC7NXBoiC7WNu86vSzCDChNWwZZDM='; connect-src 'self' https://api.stripe.com https://labwebbasetechnologybackend.onrender.com; style-src 'self' 'unsafe-inline' https://m.stripe.network; frame-src 'self' https://js.stripe.com;",
    },
  },
});