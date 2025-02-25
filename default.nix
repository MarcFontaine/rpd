{
  lib,
  pkgs,
  config,
  dream2nix,
  ...
}: {
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-json-v3
    dream2nix.modules.dream2nix.nodejs-granular-v3
  ];

  deps = {nixpkgs, ...}: {
    npm = pkgs.nodejs_22;
    nodejs = pkgs.nodejs_22;
    inherit
      (nixpkgs)
      gnugrep
      stdenv
      ;
  };

  name = lib.mkForce "XK852-rigcontrol";
  version = lib.mkForce "0.10.0";

  mkDerivation = {
    src = lib.cleanSource ./.;
    preInstallPhases = lib.mkForce [];
    installPhase = ''
      mkdir -p $out/rigpage
      cp -avr dist/* $out/rigpage
    '';
    doCheck = true;
  };
}
