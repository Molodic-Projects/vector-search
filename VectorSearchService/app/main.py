from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os, openai, psycopg
from dotenv import load_dotenv
import pgvector.psycopg

# Load environment variables from .env file
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

# Connect to database
conn = psycopg.connect("dbname=vectordb user=vectordb password=secret host=db")

# Setup database schema FIRST
with conn.cursor() as cur:
    # Create the vector extension
    cur.execute("CREATE EXTENSION IF NOT EXISTS vector")
    conn.commit()

# NOW register pgvector with psycopg (after extension is created)
pgvector.psycopg.register_vector(conn)

# Create table after pgvector is registered
with conn.cursor() as cur:
    cur.execute("""CREATE TABLE IF NOT EXISTS docs(
                       id serial PRIMARY KEY,
                       text text,
                       embedding vector(1536))""")
    conn.commit()

app = FastAPI()

class DocIn(BaseModel):
    text: str

@app.post("/embed")
def embed(doc: DocIn):
    emb = openai.embeddings.create(input=doc.text, model="text-embedding-3-small").data[0].embedding
    with conn.cursor() as cur:
        cur.execute("INSERT INTO docs(text, embedding) VALUES (%s, %s)", (doc.text, emb))
        conn.commit()
    return {"status": "stored"}

class QueryIn(BaseModel):
    query: str
    k: int = 3

@app.post("/search")
def search(q: QueryIn):
    emb = openai.embeddings.create(input=q.query, model="text-embedding-3-small").data[0].embedding
    with conn.cursor() as cur:
        cur.execute(
            "SELECT text, embedding <-> %s AS dist FROM docs ORDER BY dist LIMIT %s;",
            (emb, q.k))
        rows = cur.fetchall()
    if not rows:
        raise HTTPException(404, "No results")
    return [{"text": r[0], "score": 1 - r[1]} for r in rows]
