import { Access } from "../support/actions/access"
import { Admin } from "../support/actions/admin"
import { Home } from "../support/actions/home"
import { Signup } from "../support/actions/signup"

describe('Dado que o usuário acessa a página de Cadastro', function () {

    context('Quando ele preenche o formulário e se cadastra como administrador', function () {

        it('Então o sistema deve cadastrar um usuário administrador com sucesso', function () {

            const user = {
                name: 'Usuário Administrador de Teste',
                email: 'user-admin-teste@qa.com.br',
                password: 'senhadeteste',
                adm: 'true'
            }

            cy.deleteUserByEmail(user.email)

            Access.go()
            Access.goToSignup()
            Signup.fillform(user)
            Signup.submit()
            Admin.isVisible(`Bem Vindo  ${user.name}`)
        })
    })

    context('Quando ele preenche o formulário e se cadastra como usuário comum', function () {

        it('Então o sistema deve cadastrar um usuário comum com sucesso', function () {

            const user = {
                name: 'Usuário Comum de Teste',
                email: 'user-comum-teste@qa.com.br',
                password: 'senhadeteste',
                adm: 'false'
            }

            cy.deleteUserByEmail(user.email)

            Access.go()
            Access.goToSignup()
            Signup.fillform(user)
            Signup.submit()
            Home.isVisible()
        })
    })
})