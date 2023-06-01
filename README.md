# Tasks REST API

Uma API REST para gerenciamento de tasks, utilizando fundamentos do node. Desafio Ignite Node.js da Rocketseat.

## Funcionalidades

[x] Criação de uma task

[x] Listagem de todas as tasks

[x] Atualização de uma task pelo `id`

[x] Remover uma task pelo `id`

[x] Marcar pelo `id` uma task como completa

[] Importação de tasks em massa por um arquivo CSV

## Estrutura de uma task

`id`: Id único da task

`title`: Título da task

`description`: Descrição detalhada da task

`completed_at`: Data de quando task foi completada. Valor inicial deve ser `null`

`created_at`: Data de quando task foi criada

`updated_at`: Data de quando task foi atualizada

## Rotas

`POST` - `/tasks`

`GET` - `/tasks`

`PUT` - `/tasks/:id`

`DELETE` - `/tasks/:id`

`PATCH` - `/tasks/:id/complete`

## Validações

[x] Validar `title` e `description` no POST

[x] Validar `title` e `description` no PUT

[x] Validar se `:id` existe no banco retornar mensagem informando que registro não existe