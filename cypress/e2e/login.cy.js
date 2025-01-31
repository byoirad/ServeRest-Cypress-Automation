import { Access } from '../support/actions/access'

describe('Dado que o usuário acessa a página de Login', function () {

    context('Quando ele preenche o formulário com dados válidos', function () {

        it('Então deve ser possível realizar o Login como usuário comum', function () {

            const user = {
                name: 'Usuário Normal de Teste',
                email: 'user-normal-teste@qa.com.br',
                password: 'senhadeteste',
                adm: 'false'
            }

            cy.deleteUserByEmail(user.email)
            cy.postUser(user)

            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.userShouldLogin()

        })

        it('Então deve ser possível realizar o Login como usuário administrador', function () {

            const user = {
                name: 'Usuário Admin de Teste',
                email: 'user-admin-teste@qa.com.br',
                password: 'senhadeteste',
                adm: 'true'
            }

            cy.deleteUserByEmail(user.email)
            cy.postUser(user)

            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.adminShouldLogin(`Bem Vindo  ${user.name}`)

        })

    })

    context('Quando ele preenche o formulário com dados inválidos', function () {

        it('Então não deve ser possível realizar Login com usuário não cadastrado no sistema', function () {

            const user = {
                name: 'Usuário Comum de Teste Não Cadastrado',
                email: 'user-normal-nao-cadastrado@qa.com.br',
                password: 'senhadeteste',
                adm: 'false'
            }

            cy.deleteUserByEmail(user.email)

            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.errorMsgShouldBe('Email e/ou senha inválidos')

        })

        it('Então não deve ser possível realizar Login com senha incorreta', function () {

            const user = {
                name: 'Usuário da Senha Ruim',
                email: 'usuario-senha-ruim@qa.com.br',
                password: '123',
                adm: 'false'
            }

            cy.deleteUserByEmail(user.email)

            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.errorMsgShouldBe('Email e/ou senha inválidos')

        })

        it('Então não deve ser possível realizar Login com email sem @', function () {

            const user = {
                name: 'Usuário do Email Sem Arroba',
                email: 'usuario-email-ruim',
                password: 'senhadeteste',
                adm: 'false'
            }

            cy.deleteUserByEmail(user.email)

            Access.go()
            Access.fillForm(user)
            Access.submit()
            Access.outputShuoldBe(`Inclua um "@" no endereço de e-mail.`)

        })

        it('Então não deve ser possível realizar Login sem preencher os campos', function () {

            Access.go()
            Access.submit()
            Access.errorMsgShouldBe('Email é obrigatório')
            Access.errorMsgShouldBe('Password é obrigatório')

        })

        it('Então deve retornar mensagem após esvaziar campos e submeter o formulário', function () {

            const user = {
                name: 'Usuário Teste de Esvaziar Campos',
                email: 'usuario-teste-esvaziar@qa.com.br',
                password: 'senhadeteste',
                adm: 'false'
            }

            Access.go()
            Access.fillForm(user)
            Access.clearForm()
            Access.submit()
            Access.errorMsgShouldBe('Email não pode ficar em branco')
            Access.errorMsgShouldBe('Password não pode ficar em branco')

        })

    })

    context('Quando ele clica no botão "Cadastre-se"', function () {

        it('Então deve ser possível ir para a página de cadastro', function () {

            Access.go()
            Access.goToSignup()

        })

    })

})

