# ゆずるくんとすわるくん


## Requirements
- Python 3.x
	- Flask
	- websocket_server


## インストール

1. Python3 のインストール

2. ライブラリのインストール
```bash
> pip3 install Flask
> pip3 install websocket_server
```

## 実行方法

- `app.py` と `websocket_server.py` の2つのサーバーを起動する必要がある

```bash
> python3 app.py
```
```bash
> python3 wsock_server.py
```

## AWS 上での使用について

- AWS などのクラウド上で実行する場合は、サーバーのアドレスやポート番号を適切に設定する必要がある

- AWS(EC2) の場合は、アドレスに`0.0.0.0`、ポート番号は開放設定したポート番号に設定する必要がある
	- EC2 ダッシュボード上からポート番号の開放設定を事前に行う必要あり
	
- アドレス、ポート番号を指定して実行する方法
```bash
> python3 app.py -h 0.0.0.0 -p 5000
```
```bash
> python3 wsock_server.py -h 0.0.0.0 -p 1234
```


## Author
@Hzawawa11

@popunbom

@
