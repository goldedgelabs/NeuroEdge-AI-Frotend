
// Simple esbuild script to bundle FloatingAssistant into a single file for embedding.
// Requires esbuild as a dev dependency (npm i -D esbuild)
const esbuild = require('esbuild');
esbuild.build({
  entryPoints: ['src/components/floating/FloatingAssistant.tsx'],
  bundle: true,
  external: ['react', 'react-dom'],
  outfile: 'public/embed-bundle.js',
  format: 'iife',
  globalName: 'NeuroEdgeEmbed',
  loader: { '.tsx': 'tsx', '.ts': 'ts' },
}).catch(() => process.exit(1));
