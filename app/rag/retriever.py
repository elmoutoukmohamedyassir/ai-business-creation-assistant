import chromadb
from sentence_transformers import SentenceTransformer


CHROMA_DIR = "app/rag/vector_store"
COLLECTION_NAME = "saas_finance_docs"


embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.PersistentClient(path=CHROMA_DIR)

collection = client.get_or_create_collection(
    name=COLLECTION_NAME
)


def retrieve_context(query: str, n_results: int = 3) -> str:
    query_embedding = embedding_model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )

    documents = results["documents"][0]

    context = "\n\n---\n\n".join(documents)

    return context