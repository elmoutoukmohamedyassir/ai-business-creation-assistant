from app.tools.saas_calculator import calculate_basic_saas_metrics
from app.tools.scenario_analysis import build_three_scenarios
from app.llm.ollama_client import ask_llm
from app.rag.retriever import retrieve_context


def analyze_saas_business(
    customers,
    monthly_price,
    monthly_costs,
    cash,
    customers_lost=0,
    marketing_spend=0,
    customers_acquired=0
):

    metrics = calculate_basic_saas_metrics(
        customers=customers,
        monthly_price=monthly_price,
        monthly_costs=monthly_costs,
        cash=cash,
        customers_lost=customers_lost,
        marketing_spend=marketing_spend,
        customers_acquired=customers_acquired
    )

    scenarios = build_three_scenarios(
        customers=customers,
        monthly_price=monthly_price,
        months=6
    )

    rag_query = """
    SaaS finance metrics: MRR, ARR, churn, CAC, LTV, runway,
    break-even, revenue projection, financial planning.
    """

    context = retrieve_context(rag_query)

    prompt = f"""
You are a SaaS finance advisor.

IMPORTANT RULES:
- Use the calculated metrics as the source of truth.
- Use the retrieved knowledge only to support explanations.
- Do not invent extra numbers.
- Do not recalculate ARR incorrectly.
- If retrieved knowledge is not useful, ignore it.
- Be concise and clear.
- Answer only finance-related analysis.

Retrieved Knowledge Context:
{context}

Business Inputs:
Customers: {customers}
Monthly Price: {monthly_price}
Monthly Costs: {monthly_costs}
Cash: {cash}

Calculated Metrics:
MRR: {metrics["mrr"]}
ARR: {metrics["arr"]}
Profit: {metrics["profit"]}
Burn: {metrics["burn"]}
Runway: {metrics["runway_months"]}
Churn: {metrics["churn_rate_percent"]}%
CAC: {metrics["cac"]}
LTV: {metrics["ltv"]}
Break-even customers: {metrics["break_even_customers"]}

Revenue Scenarios for the next 6 months:
{scenarios}

Give:
1. Financial health analysis
2. Scenario interpretation
3. Risks
4. Suggestions for improvement
"""

    advisor_analysis = ask_llm(prompt)

    return {
        "metrics": metrics,
        "scenarios": scenarios,
        "retrieved_context": context,
        "advisor_analysis": advisor_analysis
    }