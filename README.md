# Studio Estética — template de landing page (salão/estética)

Template React + CSS puro (sem framework de UI), com GSAP para as animações,
pensado para você apresentar como demonstração para salões de beleza e
estúdios de estética antes de fechar um projeto sob medida.

## Rodando localmente

```bash
npm install
npm run dev       # ambiente de desenvolvimento, http://localhost:5173
npm run build     # gera a versão de produção em /dist
npm run preview   # serve a versão de produção localmente
```

Requer Node.js 18+.

## Estrutura

```
src/
  theme.css              ← toda a paleta e a tipografia do site (ver abaixo)
  App.jsx                ← monta as seções na ordem em que aparecem na página
  components/
    Navbar, Hero, Problem, Services, HowItWorks, About, Gallery,
    Testimonials, FAQ, CTA, Footer, StickyMobileCTA
    PhotoSlot.jsx         ← todo espaço de foto do site passa por aqui
```

A ordem das seções segue uma narrativa de conversão, não uma lista solta:

```
Hero            → o que é, pra quem é, por que vale a pena
Problem         → "isso é pra mim?" — as dores que levam a agendar
Services        → a solução, por frente de cuidado
HowItWorks      → "como funciona?" — o passo a passo até a cadeira
About           → identidade do estúdio + diferenciais ("por que é melhor?")
Gallery         → prova visual do ambiente e do trabalho
Testimonials    → prova social, com avaliação em destaque
FAQ             → objeções reais respondidas antes de perguntarem
CTA             → conclusão natural da página, com nova chance de conversão
Footer          → contato, horários, redes
StickyMobileCTA → barra fixa só no mobile, some perto da CTA final
```

## Como trocar a paleta de cores

Tudo fica em `src/theme.css`, no topo do arquivo, dentro de `:root`. Troque
só os 5 valores da "paleta base" — o resto do site (botões, textos, cards,
navbar, seções escuras/claras) é montado a partir de "papéis semânticos"
(`--bg`, `--text`, `--accent` etc.) que apontam para essas 5 cores. Ou seja:
você não precisa procurar cor nenhuma dentro dos componentes.

```css
--ink: #251d0e;        /* fundo escuro (hero, CTA final, rodapé) */
--parchment: #f2eee3;  /* fundo claro principal */
--stone: #a79f8e;      /* texto secundário / bordas */
--brass: #a9834f;      /* cor de destaque (botões, ícones, títulos em itálico) */
--white: #fffdf9;
```

Me passe a paleta que você quiser (em hex) que eu reescrevo esse bloco — o
site inteiro muda de cara sem tocar em mais nada.

## Sobre as fotos

O template já vem com fotos reais (Pexels, licença "Free to use" — uso
comercial livre, sem exigência de atribuição) escolhidas para dialogar entre
si: a mesma paleta de tons de pele, o mesmo tipo de luz de estúdio, e um
tratamento de cor aplicado via CSS (`.photo-slot img`, em `PhotoSlot.css`)
que unifica fotos de fotógrafos diferentes num mesmo "grading" — por isso
elas parecem parte de um mesmo ensaio, mesmo vindo de fontes distintas.

Todo espaço de imagem usa o componente `<PhotoSlot />`. Para trocar por uma
foto sua (ou do cliente final), basta trocar o `src`:

```jsx
<PhotoSlot src="/fotos/recepcao.jpg" alt="Recepção do salão" ratio="4/5" />
```

Se você remover o `src`, o componente volta a mostrar um placeholder
elegante na cor do tema — útil para apresentar a estrutura antes de ter
fotos definitivas.

## Animações (GSAP)

- **Hero**: uma sequência única de entrada ao carregar a página (navbar,
  título linha a linha, imagem com reveal por clip-path).
- **Seções seguintes**: reveals disparados por scroll (`ScrollTrigger`),
  cada seção com um efeito específico — parallax leve na seção "Sobre",
  montagem em cascata na galeria, etc.
- Tudo respeita `prefers-reduced-motion`.

Me diga quais efeitos específicos você quer ajustar ou adicionar (parallax
em outro trecho, transição entre seções, cursor customizado, hover 3D nos
cards, etc.) que eu implemento em cima dessa base.

## Responsividade

Testado em breakpoints para desktop, tablet (≤900px) e mobile (≤640px/480px).
A tipografia usa `clamp()` para escalar fluidamente entre esses tamanhos.
