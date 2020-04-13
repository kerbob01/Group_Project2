import psycopg2

conn = psycopg2.connect(host="localhost", port = 5432, database="Bigfoot_sightings", user="postgres", password="postgres")
cur = conn.cursor()

cur.execute('SELECT * FROM bfro_data')
query_results = cur.fetchall()
print(query_results)