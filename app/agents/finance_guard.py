FINANCE_KEYWORDS = [
    "revenue", "mrr", "arr", "profit", "cost", "expense",
    "pricing", "budget", "cash", "runway", "burn",
    "break-even", "cac", "ltv", "churn", "customers",
    "forecast", "projection", "financial", "finance",
    "subscription", "price"
]


def is_finance_question(message: str) -> bool:
    message = message.lower()

    for keyword in FINANCE_KEYWORDS:
        if keyword in message:
            return True

    return False