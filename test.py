import requests,datetime,json
req = requests.post(json=
    
    dict(
        exchange = "test",
        ticker = "test2",
        side = "buy",
        size = "2",
        order_type = "limit",
        strategy_id = "fuck me",
        send_datetime = "test"
    ),
    # url="http://118.27.5.63:893/postOrder/",
    # port
    url="http://127.0.0.1:893/postOrder"
    
)


print(req.content)