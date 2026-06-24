# Projeto de Automação de Testes Web - QaZando Shop 🎯

Este repositório contém o projeto de automação de testes focado na interface web do e-commerce de teste **QaZando Shop**. O objetivo deste projeto é garantir a qualidade, estabilidade e o funcionamento correto do cabeçalho e rodapé da página e das páginas de Login, Cadastro e Checkout

Este projeto utiliza o **Cypress Cloud** para monitoramento e gravação das execuções dos testes de automação de forma pública.

📊 **Painel de Execuções (Dashboard):** [Clique aqui para visualizar o Cypress Cloud](https://cloud.cypress.io/projects/isrrue/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&tagsMatch=ANY&timeRange=%7B%22startDate%22%3A%222025-06-17%22%2C%22endDate%22%3A%222026-06-17%22%2C%22id%22%3A%22LAST_12_MONTHS%22%7D)

💡 **O Plano de Testes Completo (com descrição de casos de testes estruturados/gherkin e relatório de bugs) pode ser acessado aqui:** 
👉 [Plano de Testes Detalhado - QaZando Shop](docs/plano-de-testes-e-bugs-web.docx)
---

## 💻 Tecnologias Utilizadas

* **Framework de Automação:** Cypress 
* **Linguagem:** JavaScript / Node.js
* **Padrão de Projeto:** Page Objects Pattern (PoP)

---

## 🌐 Ambiente de Testes

* **URL da Aplicação:** [QaZando Shop](https://www.automationpratice.com.br/)
* **Escopo:** Testes funcionais de interface (UI), usabilidade e validações de regras de negócio.

---

## 📝 Planejamento e Casos de Teste Mapeados

Como parte da estratégia de testes, foram levantados cenários divididos por componentes/histórias de usuário:

### 🔹 História 1 – Cabeçalho (Header)
* **CT1:** Validação de redirecionamento - link “Aproveitar....”
* **CT2:** Validação de redirecionamento - botão “Login”
* **CT3:** Validação de redirecionamento - botão “Cadastro”
* **CT5:** Validação de redirecionamento – links dos menus dropdown
* **CT6:** Validação de redirecionamento – links dos menus dropdown
* **CT7:** Validação do botão de lupa (pesquisa)
* **CT8:** Alteração do cabeçalho quando o usuário está logado
* **CT9:** Validação de redirecionamento – link “Acompanhe seu pedido”
* **CT10:** Validação dos links do menu do usuário (Dashboard / Meus Pedidos)
* **CT11:** Deslogar do sistema usando o botão Logout do menu de usuário

### 🔹 História 2 – Rodapé (Footer)
* **CT1:** Validação de redirecionamento - botão “QaZando Shop”
* **CT2:** Validação de redirecionamento – ícones de redes sociais
* **CT3:** Validação de redirecionamento – links institucionais e de navegação do rodapé
* **CT4:** Assinatura da newsletter com e-mail válido
* **CT5:** Assinatura da newsletter com e-mail em branco
* **CT6:** Assinatura da newsletter com e-mail inválido

### 🔹 História 3 – Página de Login
* **CT1:** Login com credenciais válidas
* **CT2:** Validação de campos obrigatórios de login usando Matriz de Dados
* **CT3:** Login mal sucedido com e-mail inválido
* **CT4:** Login mal sucedido com senha curta (menos de 6 caracteres)
* **CT5:** Teste de mascaramento e segurança do campo senha
* **CT6:** Login com a opção “Lembrar de mim” selecionada
* **CT7:** Teste de redirecionamento - link “Ainda não tem conta?”

### 🔹 História 4 – Página de Cadastro
* **CT1:** Cadastro com credenciais válidas
* **CT2:** Validação de campos obrigatórios de cadastro usando Matriz de Dados
* **CT3:** Cadastro mal sucedido com nome curto (menos de 3 caracteres)
* **CT4:** Cadastro mal sucedido com e-mail fora do padrão válido
* **CT5:** Cadastro mal sucedido com senha curta (menos de 6 caracteres)
* **CT6:** Teste de mascaramento da senha no cadastro

### 🔹 História 5 – Página de Checkout (Finalização de Compra)
* **CT1:** Salvar endereço de faturamento com sucesso
* **CT2:** Realizar checkout com sucesso via Direct Bank Transfer
* **CT3:** Realizar checkout com sucesso via Mobile Banking
* **CT4:** Realizar checkout com sucesso via Paypal
* **CT5:** Validação de campos obrigatórios vazios usando Matriz de Dados 
* **CT6:** Validação de e-mail inválido sem caractere "@"
* **CT7:** Validação de e-mail inválido sem provedor/domínio
* **CT8:** Impedir a geração do pedido (ordem) sem antes salvar um endereço válido
---

## 🐛 Relatório de Bugs (Bug Report)

Durante a fase de testes exploratórios e mapeamento, foram identificados os seguintes desvios na plataforma:

### 🚨 [CABEÇALHO] [CT6] Link "Shop Four Grid" não está direcionando corretamente
* **Severidade / Prioridade:** Alta / Alta (Fluxo de navegação interrompido)
* **Impacto:** O usuário fica impossibilitado de acessar uma categoria específica de produtos, resultando em perda direta de vendas

### 🚨 [CABEÇALHO] [CT6] Link "Eletronics" envia para uma página cópia da home
* **Severidade / Prioridade:** Alta / Alta (Funcionalidade de listagem de produtos inoperante)
* **Impacto:** Impacta diretamente a receita da categoria de eletrônicos, pois impede a seleção e compra de itens

### ⚠️ [RODAPÉ] [CT2] Ícones de redes sociais quebrados
* **Severidade / Prioridade:** Baixa / Baixa (Funcionalidade secundária)
* **Impacto:** Transmite uma imagem de descuido com a manutenção do site, embora não impeça o fluxo principal de vendas

### ⚠️ [RODAPÉ] [CT4] Mensagem de inscrição na newsletter errada
* **Severidade / Prioridade:** Baixa / Baixa (Cosmético/Conteúdo)
* **Impacto:** Gera uma quebra na experiência de internacionalização do usuário local, causando uma leve percepção de amadorismo, embora a funcionalidade técnica de cadastro esteja operando normalmente

### ⚠️ [LOGIN] [CT4] Sistema não informa o erro com login de senha curta
* **Severidade / Prioridade:** Média / Média (UX/Feedback ao usuário)
* **Impacto:** O usuário pode interpretar que errou a senha cadastrada, gerando desistência ou chamados desnecessários no suporte técnico

### 🔒 [LOGIN/CADASTRO] [CT5/CT6] Senha não preenche mascarada
* **Severidade / Prioridade:** Crítica / Imediato (Falha de segurança)
* **Impacto:** Risco crítico de vazamento de credenciais se o usuário estiver em um ambiente público

---

## 🛠️ Como Executar os Testes Localmente

### Pré-requisitos: Node.js (versão 18 ou superior recomendada)

### Passo a Passo (Configuração e Execução)
```bash
git clone https://github.com/matheuszanellasma/automacao-web-cypress.git
cd automacao-web-cypress
npm install
npx cypress open
```

---
## 👤 Autor

* **Matheus Koehler Zanella** - Quality Assurance Engineer
