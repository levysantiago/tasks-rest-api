# Tasks REST API

A REST API for tasks management.

## Funcionalidades

[x] Criação de uma task
[] Listagem de todas as tasks
[] Atualização de uma task pelo `id`
[] Remover uma task pelo `id`
[] Marcar pelo `id` uma task como completa
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