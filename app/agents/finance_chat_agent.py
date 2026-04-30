from app.agents.finance_guard import is_finance_question
from app.agents.finance_agent import analyze_saas_business


REQUIRED_FIELDS = [
    "monthly_price",
    "customers",
    "monthly_costs",
    "cash"
]


QUESTIONS = {
    "monthly_price": "What monthly subscription price do you plan to charge?",
    "customers": "How many paying customers do you expect in the first month?",
    "monthly_costs": "What are your estimated monthly operating costs?",
    "cash": "How much starting cash or budget do you have?"
}


def finance_chat(message: str, state: dict):
    """
    Main conversation controller for the Finance Agent.
    It checks scope, collects required data, then runs financial analysis.
    """

    if state is None:
        state = {}

    # If this is the first message, make sure it is finance-related
    if not state and not is_finance_question(message):
        return {
            "status": "out_of_scope",
            "current_agent": "finance_agent",
            "suggested_agent": "orchestrator_or_other_agent",
            "message": "This question is outside my finance specialty. I should transfer it to another agent."
        }

    # Store first message as the business idea
    if not state.get("idea"):
        state["idea"] = message

    # Find the next missing required field
    for field in REQUIRED_FIELDS:
        if state.get(field) is None:
            return {
                "status": "collecting_info",
                "current_agent": "finance_agent",
                "missing_field": field,
                "next_question": QUESTIONS[field],
                "state": state
            }

    # All required fields exist, so run the real finance analysis
    result = analyze_saas_business(
        customers=state["customers"],
        monthly_price=state["monthly_price"],
        monthly_costs=state["monthly_costs"],
        cash=state["cash"],
        customers_lost=state.get("customers_lost", 0),
        marketing_spend=state.get("marketing_spend", 0),
        customers_acquired=state.get("customers_acquired", 0)
    )

    return {
        "status": "analysis_complete",
        "current_agent": "finance_agent",
        "state": state,
        "result": result
    }