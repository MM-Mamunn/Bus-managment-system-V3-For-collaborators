import psycopg2

HOST = "localhost"
DB_NAME = "IIUC_Bus_management"
USER = "postgres"
PASSWORD = "1234"
PORT = "5432"

conn = psycopg2.connect(
    host = HOST,
    database = DB_NAME,
    user = USER,
    password = PASSWORD,
    port = PORT
)

cur = conn.cursor()

Error= psycopg2.Error