import pandas as pd
from sqlalchemy import create_engine

engine = create_engine('postgres://postgres:postgres@localhost:5432/Bigfoot_sightings')
df = pd.read_sql_query("SELECT * FROM bfro_data", engine)
df.to_csv(r'data\Bigfoot.csv', index = True)

df = pd.read_sql_query("SELECT * from sightings_by_year order by year", engine)
df.to_csv(r'data\sightings_by_year.csv', index = True)

