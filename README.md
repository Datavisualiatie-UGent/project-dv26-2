# NATO Strategic Capacities Visualised

Project repository for the 2026 Data Visualisation course at the University of Ghent.
This project was developed by Group 2: [Bram Comyn](mailto:bram.comyn@ugent.be), [Tibo De Peuter](mailto:tibo.depeuter@ugent.be), and [Brent Janssens](mailto:brent.janssens@ugent.be).

## Main Goal

The main point of our project is that even though NATO's allies might have been lacking in strategic contributions, the alliance as a whole is becoming stronger than ever before.
Allies are contributing more and more to the alliance, making the claim that NATO is in decline less and less valid.
By exploring, visualising and comparing both financial and military contributions of NATO's allies, we aim to show a more nuanced picture: the US is becoming less dominant, but the alliance is not necessarily weaker as a result.

## What is in this repo

- A report in `report/` with the process of how we arrived at our results, as well as some before and after for certain visualisations.
- An Observable Framework website in `website/` with the interactive presentation of the findings.
- Data acquisition and preprocessing scripts in `data-acquisition/`.
- Prepared datasets and source files in `assets/`.

## Quick start

The recommended development shell is defined in `flake.nix` and includes Python, `uv`, Node.js, Typst, and `make`.

```bash
nix develop
```

If you are not using Nix, install the equivalent tools manually before continuing.

## Rebuild the project

### 1. Set up Python dependencies

The Python dependencies live in `pyproject.toml`.

```bash
uv sync
```

### 2. Build the written report

The Typst source lives in `docs/main.typ`.

```bash
cd docs
make
```

This produces `docs/main.pdf`.

### 4. Run the website locally

The website is powered by Observable Framework.

```bash
cd website
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

And to serve the built site locally:

```bash
npm run start
```

## Repository layout

```text
assets/                  Processed data used by the report and website
data-acquisition/        Scripts for scraping and preprocessing source data
data-exploration/        Notebook-style exploratory work and Observable prototypes
docs/                    Dataset documentation
report/                  Additional report material and chapter drafts
website/                 Observable Framework website source
```

## Data sources

The project combines data from:

- NATO expenditure and personnel datasets
- World Bank population data
- Global Firepower hardware data

Where possible, the processed files in `assets/` were derived from these source datasets with reproducible Python scripts.

## Outputs

- Report PDF: `docs/main.pdf`
- Interactive website: built from `website/` and deployed to github pages at <https://datavisualiatie-ugent.github.io/project-dv26-2/>.

## Notes

- Some generated files in `website/src/plots/` and `data-exploration/observable-exploration/files/` are part of the project's visual pipeline and should generally be kept in sync with the source data.
- Observable HQ notebooks was used for developing the visualisations:
  - <https://observablehq.com/@bramcomyns/charts-plots>,
  - <https://observablehq.com/@bramcomyns/1-before-the-billions-securing-a-broken-continent>,
  - <https://observablehq.com/@my-workspace234/charts-plots>,
  - <https://observablehq.com/@my-workspace234/bds>,
  - <https://observablehq.com/d/300fc36220e3e6e8>,
  - <https://observablehq.com/d/d6add01a225f7f43>, and
  - <https://observablehq.com/d/23d60c50f7cc1cb8>.
