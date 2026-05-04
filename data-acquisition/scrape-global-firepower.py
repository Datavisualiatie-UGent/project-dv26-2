import logging
import re
import requests
import sys
import time

from bs4 import BeautifulSoup
import pandas as pd

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

stdout_handler = logging.StreamHandler(sys.stdout)
stdout_handler.setFormatter(formatter)

file_handler = logging.FileHandler("log/nato_scraper.log", mode="w")
file_handler.setFormatter(formatter)

logger.addHandler(stdout_handler)
logger.addHandler(file_handler)


def find_nato_member_countries() -> set[str]:
    url = "https://www.globalfirepower.com/nato-members.php"
    headers = { "User-Agent": "Mozilla/5.0" }
    
    try:
        logger.info("Connecting to GlobalFirepower to fetch NATO members...")
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        nato_links = soup.select("a:has(.mainBlockContainer)")
        
        country_ids = set()
        for a in nato_links:
            href = str(a.get("href", ""))
            if "country_id=" in href:
                country = href.split("country_id=")[-1]
                country_ids.add(country)

        logger.info(f"Successfully identified {len(country_ids)} country IDs.")
        return country_ids
    
    except Exception as e:
        logger.error(f"Failed to retrieve member list: {e}")
        return set()
    

def scrape_country_details(country: str):
    url = f"https://www.globalfirepower.com/country-military-strength-detail.php?country_id={country}"
    headers = { "User-Agent": "Mozilla/5.0" }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        results = { "country": country, "stats": {} }

        targets = {
            "aircraft-total.php":              "aircraft_total",
            "aircraft-total-fighters.php":     "fighters_total",
            "aircraft-total-attack-types":     "attack_aircraft_total",
            "aircraf-total-transports":        "fixed_wing_transport_total",
            "aircraft-total-tanker-fleet":     "tanker_transport_total",
            "aircraft-helicopters-total":      "helicopter_total",
            "aircraft-helicopters-attack":     "attack_helicopter_total",
            "armor-tanks-total":               "tanks_total",
            "armor-apc-total":                 "apc_total",
            "armor-self-propelled-guns-total": "spg_artillery_total",
            "armor-towed-artillery-total":     "towed_artillery_total",
            "armor-mlrs-total":                "mlrs_total",
            "navy-ships":                      "ships_total",
            "navy-force-by-tonnage":           "ships_tonnage_total",
            "navy-aircraft-carriers":          "aircraft_carrier_total",
            "navy-helo-carriers":              "helo_carrier_total",
            "navy-destroyers":                 "destroyers_total",
            "navy-frigates":                   "frigates_total",
            "navy-corvettes":                  "corvettes_total",
            "navy-submarines":                 "submarines_total",
            "navy-patrol-coastal-craft":       "coastal_patrol_craft_total",
            "navy-mine-warfare-craft":         "mine_warfare_craft_total"
        }

        containers = soup.find_all("div", class_="specsGenContainers")

        for container in containers:
            parent_a = container.find_parent("a")
            if not parent_a: continue
            
            href = parent_a.get("href", "")
            
            for path, key in targets.items():
                if href is not None and path in href:
                    full_text = container.get_text(" ", strip=True).replace('\xa0', ' ')
                    logger.debug(f"Matching {key} in text: {full_text}")

                    stock_match = re.search(r"Stock:\s*([\d,]+)", full_text)
                    readiness_match = re.search(r"Readiness:\s*([\d,]+)", full_text)
                    
                    if stock_match: # aircraft and armor
                        val = stock_match.group(1).replace(",", "")
                        results["stats"][f"{key}_stock"] = int(val)
                        if readiness_match:
                            read_val = readiness_match.group(1).replace(",", "")
                            results["stats"][f"{key}_ready"] = int(read_val)
                    else: # navy
                        spans = container.find_all("span", class_="textLarge")
                        if spans:
                            value_text = spans[-1].get_text(strip=True)
                            clean_val = re.sub(r"[^\d]", "", value_text)
                            if clean_val:
                                results["stats"][f"{key}"] = int(clean_val)

        return results
    except Exception as e:
        logger.warning(f"Could not scrape {country}: {e}")
        return None
    

def scrape_nato_firepower(member_states: set[str]):
    results = []

    for country in member_states:
        logger.info(f"Scraping: {country}")
        data = scrape_country_details(country)
        # time.sleep(1) # politeness delay
        if data:
            results.append(data)

    return results


def save_to_csv_pandas(results: list, filename: str = "assets/global-firepower/nato_firepower_2026.csv") -> pd.DataFrame:
    if not results:
        logger.warning("No data to process")
        return pd.DataFrame()

    df = pd.DataFrame(results)
    stats_df = df['stats'].apply(pd.Series)

    final_df = pd.concat([df['country'], stats_df], axis=1)
    final_df = final_df.fillna(0)
    final_df = final_df.sort_values(by="country")
    final_df.to_csv(filename, index=False, encoding='utf-8')
    
    logger.info(f"{len(final_df)} countries' data saved to {filename}")
    return final_df


if __name__ == "__main__":
    nato_members = find_nato_member_countries()
    if nato_members:
        scraped_results = scrape_nato_firepower(nato_members)
        df_result = save_to_csv_pandas(scraped_results)
        logger.info("Finished scraping Global Firepower data")
