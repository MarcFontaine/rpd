{
  description = "Rigpage remote QTH flake build";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/release-25.11";
    dream2nix.url = "github:nix-community/dream2nix";
    dream2nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = {
    self,
    dream2nix,
    nixpkgs,
  }: let
    eachSystem = nixpkgs.lib.genAttrs [
      "aarch64-darwin"
      "aarch64-linux"
      "x86_64-darwin"
      "x86_64-linux"
    ];
  in {
    packages = eachSystem (system: {
      default = dream2nix.lib.evalModules {
        packageSets.nixpkgs = nixpkgs.legacyPackages.${system};
        modules = [
          # Import our actual package definiton as a dream2nix module from ./default.nix
          ./default.nix
          {
            # Aid dream2nix to find the project root. This setup should also works for mono
            # repos. If you only have a single project, the defaults should be good enough.
            paths.projectRoot = ./.;
            # can be changed to ".git" or "flake.nix" to get rid of .project-root
            paths.projectRootFile = "flake.nix";
            paths.package = ./.;
          }
        ];
      };
    });
  };
}
