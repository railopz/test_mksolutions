# README.md

## Pré-requisitos

Este é um projeto de exemplo que demonstra o uso das seguintes tecnologias:

- Node.js
- Express
- Prisma

Você deve ter instalado em sua máquina o Docker e o Docker Compose.

## Inicialização
1. Primeiramente, execute o Docker Compose para subir os serviços definidos no arquivo `docker-compose.yml`. Você pode fazer isso executando o seguinte comando no seu terminal:

    ```bash
    docker-compose up -d
    ```

2. Depois, entre no container do PostgreSQL utilizando o seguinte comando:

    ```bash
    docker exec -it mk-seller bash
    ```

3. Agora iremos rodar as migrations para popular o banco de dados

    ```bash
    yarn prisma generate
    
    yarn prisma migrate dev
    
    yarn prisma db push

    yarn prisma db seed
    ```
4. Para sair do servidor é só digitar, você pode pressionar `CTRL + D`.

5. Nosso servidor já vai está rodando na porta `3333`

# Documentação da API

Bem-vindo à documentação da API. Aqui você encontrará informações sobre como fazer solicitações e interpretar as respostas da API.

## Base URL

A base URL para todas as solicitações à API é: `http://localhost:3333`

## Autenticação

A API requer autenticação usando um token JWT. Certifique-se de incluir o token em cada solicitação na forma de um cabeçalho `Authorization`.

## Solicitações (Requests)
**Cabeçalho (Headers)**:
```makefile
  Authorization: Bearer SEU_TOKEN_JWT
```


### Autenticação
**Rota**: `POST /sessions`
**Request (Body)**:
```json
{
  "email": "test@test.com",
  "password": "123@456"
}
```
**Resposta (Response):**:
```json
{
   "user": {
      "id": "049cb0d4-3392-4c55-b089-ef8d93ce1d99",
      "name": "Administrador",
      "email": "test@test.com",
      "is_admin": true
  },
  "token": "token_api"
}
```
### Produtos
**Rota**: `GET /products`
`Rota responsável por listar todos os produtos.`
**Resposta (Response):**:
```json
[
	{
		"id": "ddf783f5-6ef9-4b2c-a2c3-4a11f64dba1c",
		"name": "TESTE SALE",
		"description": "SALE PRODUCT",
		"price": "10.5",
		"created_at": "2023-08-09T07:21:22.942Z",
		"updated_at": "2023-08-09T07:21:22.942Z"
	},
]

```
**Rota**: `PATCH /products/:product_id`

`Rota para que seja feita a atualização dos dados do produto.`

**Request (Body):**:
```json
{
	"name": "TESTE 3",
	"description": "TESTE",
	"price": 20
}
```
**Resposta (Response):**:
```json
{
	"id": "7a75384f-62c3-4826-b39b-d1236ae3cda5",
	"name": "TESTE 3",
	"description": "TESTE",
	"price": "20",
	"created_at": "2023-08-09T08:03:36.452Z",
	"updated_at": "2023-08-09T08:03:36.452Z"
}
```
**Mensagem de error:**:
`Caso passe um ID que não existe na url.`
```json
{
	"status": "error",
	"message": "Product not exists"
}
```

`Caso os dados informados para a aplicação não estejam de acordo com a validação`
```json
{
	"statusCode": 400,
	"error": "Bad Request",
	"message": "Validation failed",
	"validation": {
		"params": {
			"source": "params",
			"keys": [
				"product_id"
			],
			"message": "\"product_id\" must be a valid GUID"
		}
	}
}
```
**Rota**: `DELETE /products/:product_id`
`Rota destinada a remover um produto, com isso o produto também é removido do estoque.`

**Resposta (Response):**:
```json
{
	"message": "Delete product success",
	"status": "success"
}
```
**Mensagem de error:**:
`Caso passe um ID que não existe na url.`
```json
{
	"status": "error",
	"message": "Product not exists"
}
```

`Caso os dados informados para a aplicação não estejam de acordo com a validação`
```json
{
	"statusCode": 400,
	"error": "Bad Request",
	"message": "Validation failed",
	"validation": {
		"params": {
			"source": "params",
			"keys": [
				"product_id"
			],
			"message": "\"product_id\" must be a valid GUID"
		}
	}
}
```

**Rota**: `POST /products/stock/manager/:product_id`
`Rota destinada a controle do estoque, dando assim entrada e saída de produtos.`

**Request (Body):**:
```json
{
	"quantity": 20,
	"type": "Output"
}
```
`
o type pode ser Input | Output. Já a quantidade não pode ser negativa.
`

**Resposta (Response):**:
```json
{
	"id": "7a75384f-62c3-4826-b39b-d1236ae3cda5",
	"name": "TESTE 3",
	"description": "TESTE",
	"price": "20",
	"created_at": "2023-08-09T08:03:36.452Z",
	"updated_at": "2023-08-09T08:03:36.452Z"
}
```
**Mensagem de error:**:
`Exemplo caso de quantidade`
```json
{
	"status": "error",
	"message": "The quantity cannot be negative"
}
```

`Caso os dados informados para a aplicação não estejam de acordo com a validação`
```json
{
	"statusCode": 400,
	"error": "Bad Request",
	"message": "Validation failed",
	"validation": {
		"params": {
			"source": "params",
			"keys": [
				"product_id"
			],
			"message": "\"product_id\" must be a valid GUID"
		}
	}
}
```
### Vendas

**Rota**: `POST /sales`
`Rota responsável por lançar uma venda`

**Request (Body):**:
```json
{
	"transactions": [
		{
			"product_id": "563ef8d5-6825-42bb-934d-1e2d3027906a",
			"quantity": 10
		}
	]
}
```

**Resposta (Response):**:
```json
{
	"hash": "1f4c7631-9369-46fc-be0e-715749535c4d",
	"transactions": [
		{
			"id": "94e6eed0-758a-40e0-afe6-9756e26c5a90",
			"transaction": "1f4c7631-9369-46fc-be0e-715749535c4d",
			"product_id": "7a75384f-62c3-4826-b39b-d1236ae3cda5",
			"user_id": "049cb0d4-3392-4c55-b089-ef8d93ce1d99",
			"client_id": null,
			"quantity": 10,
			"total_price": "200",
			"status": "pending",
			"created_at": "2023-08-09T08:22:55.475Z",
			"updated_at": "2023-08-09T08:22:55.475Z"
		}
	],
	"qrcode": "QRCODEBASE64"
}
```
**Mensagem de error:**:
`Exemplo caso de quantidade`
```json
{
	"status": "error",
	"message": "The quantity cannot be negative"
}
```

`Caso os dados informados para a aplicação não estejam de acordo com a validação`
```json
{
	"statusCode": 400,
	"error": "Bad Request",
	"message": "Validation failed",
	"validation": {
		"params": {
			"source": "params",
			"keys": [
				"product_id"
			],
			"message": "\"product_id\" must be a valid GUID"
		}
	}
}
```
