# Evidências reais da vitrine estática

O workflow serve o `index.html` do próprio repositório por HTTP local, abre a página com Chromium/Playwright, verifica o título, os seis cartões de produtos e o feedback de alerta do botão demonstrativo, e salva capturas desktop e mobile.

## O que comprova em caso de sucesso

- A página estática pode ser servida localmente por HTTP.
- O navegador renderizou o HTML e encontrou os elementos verificados.
- Os botões exibem o alerta de demonstração existente no código.
- As capturas são da interface real do repositório executada no runner.

## Limitações conhecidas

- Não existe backend, API, checkout, processamento de pagamento ou carrinho persistente verificado.
- Os produtos e preços são conteúdo estático de demonstração.
- O alerta do botão não adiciona itens a um carrinho real.
- A execução local no runner não comprova publicação pública nem operação comercial.
