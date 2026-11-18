// Lets plain `import "./file.css"` side-effect imports type-check. Newer TypeScript
// (and the editor's bundled version) errors on them without a declaration.
declare module "*.css";
