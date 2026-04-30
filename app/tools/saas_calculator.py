def calculate_mrr(customers: int, monthly_price: float) -> float:
    return customers * monthly_price


def calculate_arr(mrr: float) -> float:
    return mrr * 12


def calculate_profit(revenue: float, costs: float) -> float:
    return revenue - costs


def calculate_burn(revenue: float, costs: float) -> float:
    """
    Burn = money lost per month.
    If revenue is higher than costs, burn is 0.
    """
    loss = costs - revenue

    if loss > 0:
        return loss

    return 0


def calculate_runway(cash: float, monthly_burn: float):
    """
    Runway = how many months before cash runs out.
    """
    if monthly_burn <= 0:
        return "Infinite"

    return cash / monthly_burn


def calculate_churn_rate(customers_lost: int, starting_customers: int) -> float:
    """
    Churn rate = customers lost / starting customers.
    Result is returned as percentage.
    """
    if starting_customers <= 0:
        return 0

    return (customers_lost / starting_customers) * 100


def calculate_growth_rate(old_customers: int, new_customers: int) -> float:
    """
    Growth rate = (new - old) / old.
    Result is returned as percentage.
    """
    if old_customers <= 0:
        return 0

    return ((new_customers - old_customers) / old_customers) * 100


def calculate_cac(marketing_spend: float, customers_acquired: int) -> float:
    """
    CAC = customer acquisition cost.
    """
    if customers_acquired <= 0:
        return 0

    return marketing_spend / customers_acquired


def calculate_ltv(arpu: float, churn_rate_percent: float) -> float:
    """
    Simplified LTV = ARPU / churn rate.
    Churn must be converted from percentage to decimal.
    Example: 5% = 0.05
    """
    if churn_rate_percent <= 0:
        return 0

    churn_decimal = churn_rate_percent / 100

    return arpu / churn_decimal


def calculate_break_even_customers(monthly_costs: float, monthly_price: float) -> float:
    """
    Number of customers needed to cover monthly costs.
    """
    if monthly_price <= 0:
        return 0

    return monthly_costs / monthly_price


def calculate_basic_saas_metrics(
    customers: int,
    monthly_price: float,
    monthly_costs: float,
    cash: float,
    customers_lost: int = 0,
    marketing_spend: float = 0,
    customers_acquired: int = 0
) -> dict:
    """
    One function that calculates all important SaaS metrics.
    """

    mrr = calculate_mrr(customers, monthly_price)
    arr = calculate_arr(mrr)
    profit = calculate_profit(mrr, monthly_costs)
    burn = calculate_burn(mrr, monthly_costs)
    runway = calculate_runway(cash, burn)
    churn_rate = calculate_churn_rate(customers_lost, customers)
    cac = calculate_cac(marketing_spend, customers_acquired)
    ltv = calculate_ltv(monthly_price, churn_rate)
    break_even_customers = calculate_break_even_customers(monthly_costs, monthly_price)

    return {
        "customers": customers,
        "monthly_price": monthly_price,
        "monthly_costs": monthly_costs,
        "cash": cash,
        "mrr": mrr,
        "arr": arr,
        "profit": profit,
        "burn": burn,
        "runway_months": runway,
        "churn_rate_percent": churn_rate,
        "cac": cac,
        "ltv": ltv,
        "break_even_customers": break_even_customers
    }