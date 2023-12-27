import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'



// Read the key and certificate files
const key = fs.readFileSync(path.resolve(__dirname,'../frontend/help-desk-app-privateKey.key' ));
const cert = fs.readFileSync(path.resolve(__dirname, '../frontend/help-desk-app.crt'))

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    https:{
      key: key,
      cert: cert
    }
  },
  plugins: [react()],
})
