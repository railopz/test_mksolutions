# README.md

## Pré-requisitos

#A venda será realizada pela pessoa frente de caixa, portanto, deve haver pelo
menos um cadastro de vendedor no sistema. Este cadastro servirá para fazer a
autenticação numa API.
Segurança é primordial, portanto, utilize os conceitos de token de autenticação.

[] Usuário (id, name, is_admin, is_seller, created_at, updated_at)
● Autenticar o usuário

#Antes da venda ser feita, é necessário que haja produtos no banco de dados,
portanto, espera-se um CRUD:

[] Produto (id, name, description, category, photo)
● Listar produtos
● Buscar um produto específico
● opcional - Deletar um produto
● opcional - Atualizar um produto
● opcional - Controle de estoque

##Atenção: Lembre-se que, ao criar qualquer entidade via api, é necessário validações:
valores de produtos não podem ser inferiores a zero, nomes devem ter um limite de
caracteres etc. Seja criativo, mas não muito.

#. No momento da venda, podem ser selecionados N produtos. Cada produto poderá
ser comprado em qualquer quantidade.

#Para que o cliente possa pagar, o retorno da api de cadastro de venda deve conter
um QrCode em base64. O payload do QrCode deve ter obrigatoriamente o valor total da
venda. Sinta-se livre para adicionar mais informações.

#Criar container com Docker para o banco de dados e aplicação.

#opcional - Enviar por e-mail um relatório simples, contendo uma lista ordenada dos
produtos mais vendidos:

#opcional - Utilizar mensageria ou fila em algum dos fluxos. Sugestão: Kafka,
RabbitMq, Apache Camel, queue com redis etc.

#opcional - Criar indexes para as tabelas de banco de dados e fazer um breve
comentário explicando o porquê das escolhas.
