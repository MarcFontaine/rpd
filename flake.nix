{
  description = "Nix flake build for Rigpage remote QTH";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/release-25.11";
  };

  outputs = {
    self,
    nixpkgs,
  }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      rigpage = pkgs.buildNpmPackage {
        pname = "XK852-rigcontrol";
        version = "0.11.0";
        src = pkgs.lib.cleanSource ./.;
        npmDepsHash = "sha256-eaSMSeRFrke9cjaMvnK1BXZselrP3FA2Xiq1F3lQlSg=";
        installPhase = ''
            mkdir -p $out/rigpage
            cp -avr dist/* $out/rigpage
        '';
      };
    in
    {
      packages.x86_64-linux.default = rigpage;
    };
}
