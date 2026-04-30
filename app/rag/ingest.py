import os
from pypdf import PdfReader
import chromadb
from sentence_transformers import SentenceTransformer


DOCUMENTS_DIR = "documents"
CHROMA_DIR = "app/rag/vector_store"
COLLECTION_NAME = "saas_finance_docs"


def extract_text_from_pdf(pdf_path: str) -> str:
    reader = PdfReader(pdf_path)
    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return text


def split_text(text: str, chunk_size: int = 700, overlap: int = 100) -> list:
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]

        if chunk.strip():
            chunks.append(chunk)

        start = end - overlap

    return chunks


def ingest_documents():
    embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

    client = chromadb.PersistentClient(path=CHROMA_DIR)

    collection = client.get_or_create_collection(
        name=COLLECTION_NAME
    )

    doc_id = 0

    for filename in os.listdir(DOCUMENTS_DIR):
        if not filename.endswith(".pdf"):
            continue

        pdf_path = os.path.join(DOCUMENTS_DIR, filename)
        print(f"Reading: {pdf_path}")

        text = extract_text_from_pdf(pdf_path)
        chunks = split_text(text)

        for chunk in chunks:
            embedding = embedding_model.encode(chunk).tolist()

            collection.add(
                ids=[f"doc_{doc_id}"],
                embeddings=[embedding],
                documents=[chunk],
                metadatas=[{"source": filename}]
            )

            doc_id += 1

    print("Ingestion finished.")


if __name__ == "__main__":
    ingest_documents()