from fastapi import FastAPI
from pydantic import BaseModel

from app.llm.ollama_client import ask_llm
from app.tools.saas_calculator import calculate_basic_saas_metrics
from app.agents.finance_agent import analyze_saas_business
from app.agents.finance_chat_agent import finance_chat

app = FastAPI(
    title="AI Business Assistant"
)


class ChatRequest(BaseModel):
    message: str


class SaaSProjectionRequest(BaseModel):
    customers: int
    monthly_price: float
    monthly_costs: float
    cash: float
    customers_lost: int = 0
    marketing_spend: float = 0
    customers_acquired: int = 0


@app.get("/")
def home():
    return {"status": "running"}


@app.post("/chat")
def chat(request: ChatRequest):
    answer = ask_llm(request.message)

    return {
        "agent": "saas_finance_agent",
        "answer": answer
    }


@app.post("/finance/saas/projection")
def saas_projection(request: SaaSProjectionRequest):
    result = calculate_basic_saas_metrics(
        customers=request.customers,
        monthly_price=request.monthly_price,
        monthly_costs=request.monthly_costs,
        cash=request.cash,
        customers_lost=request.customers_lost,
        marketing_spend=request.marketing_spend,
        customers_acquired=request.customers_acquired
    )

    return {
        "agent": "saas_finance_agent",
        "metrics": result
    }


@app.post("/finance/saas/analyze")
def analyze_saas(request: SaaSProjectionRequest):

    result = analyze_saas_business(
        customers=request.customers,
        monthly_price=request.monthly_price,
        monthly_costs=request.monthly_costs,
        cash=request.cash,
        customers_lost=request.customers_lost,
        marketing_spend=request.marketing_spend,
        customers_acquired=request.customers_acquired
    )

    return result

class FinanceChatRequest(BaseModel):
    message: str
    state: dict = {}


@app.post("/finance/chat")
def finance_chat_endpoint(request: FinanceChatRequest):
    return finance_chat(
        message=request.message,
        state=request.state
    )