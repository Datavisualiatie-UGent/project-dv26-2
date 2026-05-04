"""Script to convert/format the downloaded CSV files from the old format to easier machine readable.
"""

import csv
import pandas as pd

def convert_from_google_to_decent_csv(file: str) -> None:
    data = pd.read_csv(file)

    numeric_columns = data.columns[1:]
    data[numeric_columns] = data[numeric_columns].astype(str).replace({',': '.'}, regex=True)
    data[numeric_columns] = data[numeric_columns].apply(pd.to_numeric, errors="coerce")

    data["country"] = data["country"].astype(str).replace({"\\*": ""}, regex=True)

    print(data.dtypes)
    print(data.info())

    data.to_csv(file, index=False, quoting=csv.QUOTE_NONNUMERIC)

files = [
    "shareofgdp", # % of GDP for defense
    "realchange", # % of real change: ((val2 - val1) / val) x 100
    "spenditurepercapita2021usdollars", # US$ spent on defense per capita (2021 prices and exchange rates)
    "militarypersonelinthousands", # number of military personel in 1.000s
    "portionofexpenditure_equipment", # % of defence budget spent on equipment
    "portionofexpenditure_personel", # % of defence budget spent on personel
    "portionofexpenditure_infrastructure", # % of defence budget spent on infrastructure
    "portionofexpenditure_other", # % of defence budget spent on other
    "gdp2021usdollars" # % countries' GDP in millions of US dollars (2021 prices and exchange rates)
]

if __name__ == "__main__":
    for f in files:
        convert_from_google_to_decent_csv(f"assets/nato-defence-expenditure/{f}.csv")
