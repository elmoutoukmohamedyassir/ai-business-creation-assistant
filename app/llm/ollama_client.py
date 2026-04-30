import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def ask_llm(prompt):

    payload = {
        "model": "qwen3:1.7b",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(
        OLLAMA_URL,
        json=payload
    )

    data = response.json()

    return data["response"]