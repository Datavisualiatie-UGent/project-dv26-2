{
  description = "Development environment for datavisualisation project NATO";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            # Data Acquisition & Processing
            python3
            uv

            # Website & Observable Framework
            nodejs_22 # Or whichever Node LTS version you prefer
            
            # Documentation
            typst
            gnumake
          ];

          shellHook = ''
            echo "Python: $(python --version)"
            echo "uv: $(uv --version)"
            echo "Node: $(node --version)"
            echo "Typst: $(typst --version)"
          '';
        };
      }
    );
}
