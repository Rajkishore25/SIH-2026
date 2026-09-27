module.exports = {
  hooks: {
    readPackage(pkg) {
      // Allow all build scripts
      if (pkg.scripts && pkg.name === 'esbuild') {
        pkg.scripts = pkg.scripts || {};
      }
      return pkg;
    }
  }
};
