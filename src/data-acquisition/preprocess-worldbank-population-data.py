"""Data acquired from https://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv
"""
import pandas as pd


if __name__ == '__main__':
    data = pd.read_csv('worldbank_population.csv')
    countries = [
        "Albania", "Belgium", "Bulgaria", "Canada", "Croatia", "Czechia", "Denmark", "Estonia", "Finland", 
        "France", "Germany", "Greece", "Hungary", "Italy", "Latvia", "Lithuania", "Luxembourg", "Montenegro", 
        "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Slovak Republic", 
        "Slovenia", "Spain", "Sweden", "Türkiye", "United Kingdom", "United States"
    ]
    columns = [
        "Country Name", "2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"
    ]
    new_columns = [
        "country", "2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024e"
    ]

    data = data[data['Country Name'].isin(countries)]
    data = data[columns]
    data.columns = new_columns

    data.to_csv("population.csv", index=False)
