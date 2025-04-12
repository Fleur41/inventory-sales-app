import requests
import random

products = []
for i in range(50):
    products.append({
        "name": f"Product {i+1}",
        "imei": f"{100000000000000 + i}",
        "price": round(random.uniform(50, 200), 2),
        "quantity": random.randint(1, 20)
    })

response = requests.post("http://localhost:5000/products", json=products)
print(response.status_code)
print(response.json())
