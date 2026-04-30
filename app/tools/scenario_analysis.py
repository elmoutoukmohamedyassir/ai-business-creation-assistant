def project_revenue(
    customers: int,
    monthly_price: float,
    growth_rate_percent: float,
    months: int
) -> list:
    projections = []

    current_customers = customers
    growth_rate = growth_rate_percent / 100

    for month in range(1, months + 1):
        mrr = current_customers * monthly_price

        projections.append({
            "month": month,
            "customers": round(current_customers),
            "mrr": round(mrr, 2)
        })

        current_customers = current_customers * (1 + growth_rate)

    return projections


def project_revenue_with_churn(
    customers: int,
    monthly_price: float,
    growth_rate_percent: float,
    churn_rate_percent: float,
    months: int
) -> list:
    projections = []

    current_customers = customers
    growth_rate = growth_rate_percent / 100
    churn_rate = churn_rate_percent / 100

    for month in range(1, months + 1):
        mrr = current_customers * monthly_price

        projections.append({
            "month": month,
            "customers": round(current_customers),
            "mrr": round(mrr, 2)
        })

        gained_customers = current_customers * growth_rate
        lost_customers = current_customers * churn_rate

        current_customers = current_customers + gained_customers - lost_customers

        if current_customers < 0:
            current_customers = 0

    return projections


def build_three_scenarios(
    customers: int,
    monthly_price: float,
    months: int
) -> dict:
    return {
        "pessimistic": project_revenue_with_churn(
            customers=customers,
            monthly_price=monthly_price,
            growth_rate_percent=5,
            churn_rate_percent=8,
            months=months
        ),
        "realistic": project_revenue_with_churn(
            customers=customers,
            monthly_price=monthly_price,
            growth_rate_percent=10,
            churn_rate_percent=5,
            months=months
        ),
        "optimistic": project_revenue_with_churn(
            customers=customers,
            monthly_price=monthly_price,
            growth_rate_percent=20,
            churn_rate_percent=3,
            months=months
        )
    }