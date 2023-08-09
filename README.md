# README.md

## Pré-requisitos

#A venda será realizada pela pessoa frente de caixa, portanto, deve haver pelo
menos um cadastro de vendedor no sistema. Este cadastro servirá para fazer a
autenticação numa API.
Segurança é primordial, portanto, utilize os conceitos de token de autenticação.

[x] users (id, name, password, is_admin, is_seller, created_at, updated_at)
[x] Autenticar o usuário
[x] Criar um novo usuário
[x] Pegar usuário logado

[] clients (id, name, email, phone, created_at, updated_at)
[] Listar clientes
[] Criar cliente
[] Ver compras do cliente

#Antes da venda ser feita, é necessário que haja produtos no banco de dados,
portanto, espera-se um CRUD:

[X] products (id, name, description, price, created_at, updated_at)
[x] Listar produtos
[x] Buscar um produto específico
[X] opcional - Deletar um produto
[X] opcional - Atualizar um produto
[X] opcional - Controle de estoque

[x] stock_products (id, name, description, created_at, updated_at)
[x] Incluir no estoque
[x] Movimentar Entrada e Saida

##Atenção: Lembre-se que, ao criar qualquer entidade via api, é necessário validações:
valores de produtos não podem ser inferiores a zero, nomes devem ter um limite de
caracteres etc. Seja criativo, mas não muito.

#. No momento da venda, podem ser selecionados N produtos. Cada produto poderá
ser comprado em qualquer quantidade.

[x] sales (id, name, description, created_at, updated_at)
[x] Será possível executar uma venda
[x] Será possível listar todas as vendas
[x] Será Possível capturar uma venda pendente para faturar

#Para que o cliente possa pagar, o retorno da api de cadastro de venda deve conter
um QrCode em base64. O payload do QrCode deve ter obrigatoriamente o valor total da
venda. Sinta-se livre para adicionar mais informações.
[x] Criação da imagem para pagamento

#Criar container com Docker para o banco de dados e aplicação.
[x] Criar arquivo de configuração do docker-compose e dockerfile

#opcional - Enviar por e-mail um relatório simples, contendo uma lista ordenada dos
produtos mais vendidos:

#opcional - Utilizar mensageria ou fila em algum dos fluxos. Sugestão: Kafka,
RabbitMq, Apache Camel, queue com redis etc.

#opcional - Criar indexes para as tabelas de banco de dados e fazer um breve
comentário explicando o porquê das escolhas.x
