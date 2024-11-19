{
  lib,
  config,
  dream2nix,
  ...
}: {
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-json-v3
    dream2nix.modules.dream2nix.nodejs-granular-v3
  ];

  deps = {nixpkgs, ...}: {
    inherit
      (nixpkgs)
      gnugrep
      stdenv
      ;
  };

#  nodejs-granular-v3 = {
#    buildScript = ''
#      tsc ./src/index.ts
#      mv app.js app.js.tmp
#      echo "#!${config.deps.nodejs}/bin/node" > index.js
#      cat index.js.tmp >> index.js
#      chmod +x ./index.js
#      patchShebangs .
#    '';
#  };

  name = lib.mkForce "XK852-rigcontrol";
  version = lib.mkForce "0.0.2";

  mkDerivation = {
    src = lib.cleanSource ./.;
#    checkPhase = ''
#      ./app.js | ${config.deps.gnugrep}/bin/grep -q "Hello, World!"
#    '';
    doCheck = true;
  };
}
