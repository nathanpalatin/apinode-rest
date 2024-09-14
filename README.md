## RFs (Requisitos funcionais)

- [x] Dev ser possível se cadastrar
- [x] Dev ser possível se autenticar
- [x] Dev ser possível obter o perfil de um usuário logado
- [x] Deve ser possível buscar usuários pelo nome

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com e-mail duplicado
- [x] O usuário não pode se cadastrar com telefone duplicado
- [x] O perfil do usuário deve ser visível apenas para os usuários com permissão

## RNFs (Regras não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em banco PostgreSQL
- [x] O usuário deve ser identificado por um JWT (Json Web Token)
