export const questionMathData = {
  questionId: 1,
  prompt:
    "<p>Given the quadratic expression $4x2+25x+6$, which of the following is the correct factorization?</p>",
  correctAnswer: "A",
  options: [
    {
      optionId: 1,
      label: "A",
      text: "$(x+6)(4x−1)$",
    },
    {
      optionId: 2,
      label: "B",
      text: "$(x+6)(4x+1)$",
    },
    {
      optionId: 3,
      label: "C",
      text: "$(x-6)(4x+1)$",
    },
    {
      optionId: 4,
      label: "D",
      text: "$(x+1)(4x+6)$",
    },
  ],
  explanation:
    "<p>The two numbers with a product of $24$&nbsp;and sum of&nbsp;$25$&nbsp;are&nbsp;$1$&nbsp;and&nbsp;$24$:</p><ul><li>$(1)(24)=24$</li><li>$1+24=25$</li></ul><p>This means we can split the&nbsp;$x$-term,&nbsp;$25x$, into&nbsp;$24+x$, and the original quadratic expression can be rewritten as $4x^2+24x+x+6$</p><p>The greatest common factor of&nbsp;$4x^2$&nbsp;and&nbsp;$24x$&nbsp;is&nbsp;$4x$. Factoring out the&nbsp;$4x$&nbsp;from $4x^2+24$&nbsp;gives us:</p><p>$4x^2+24x={4x\\cdot}\\left(\\dfrac{4x^2}{{4x}}+\\dfrac{24x}{{4x}}\\right)$</p><p>$=4x(x+6)$</p>",
};
