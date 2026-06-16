import psycopg2

def get_db():
    return psycopg2.connect(
        host="localhost",
        port="5432",
        database="fintrack",
        user="postgres",
        password="Sl3865"
    )