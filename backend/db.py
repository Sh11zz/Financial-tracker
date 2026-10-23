import os

import psycopg2

def get_db():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port="5432",
        database="fintrack",
        user="postgres",
        password="72781ef8c07489a6dd77563d6cdf1587"
    )
