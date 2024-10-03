export const lessonMathData = [
  {
    id: 1,
    content: `<h3>Factoring quadratic expressions</h3>
      <p><strong>Note:</strong> We cover how to factor quadratic expressions in the form $x^2+bx+c$ in detail in the <strong>Solving quadratic equations</strong> lesson.</p>
      <p>Quadratic expressions that have an $x^2$-coefficient that is not $1$ are more difficult to factor. We should try to factor out any common factors if possible.</p>
      <p>For example, in the expression $3x^2+12x-15$, we can factor out a $3$ first and then factor the quadratic expression $x^2+4x-5$.</p>
      <p>To factor a quadratic expression in the form $x^2+bx+c$:</p>
      <ol>
        <li>Find two numbers with a product equal to $c$ and a sum equal to $b$.</li>
        <li>The two factors of the expression are each the sum of $x$ and one of the numbers from Step 1.</li>
      </ol>`,
    example: {
      question: `<p><strong>Example:</strong> Factor $x^2+9x-10$.</p>`,
      explanation: `<p>We're looking for two numbers, $a$ and $b$, that meet the following criteria:</p>
        <ul>
          <li>$a+b$ is equal to the coefficient of $x$, $9$</li>
          <li>$ab$ is equal to the constant term, $-10$</li>
        </ul>
        <p>$a=10$ and $b=-1$ would work:</p>
        <ul>
          <li>$10+(-1)=9$</li>
          <li>$(10)(-1)=-10$</li>
        </ul>
        <p>As such, we can rewrite:</p>
        <p>$x^2+9x-10$ as $(x+10)(x-1)$.</p>`
    }
  },
  {
    id: 2,
    content: `<h3>How do we factor by grouping?</h3><p>When we do this, we see that both of the initial pairs contain the factor $x+5$. This means we can factor out the $x+5$ from the overall expression:</p>
      <p>$2x(x+5)-1(x+5)$</p>
      <p>$=(x+5)\\left(2x-1\\right)$</p>
      <p>Therefore, $2x^2+9x-5=(x+5)(2x-1)$.</p>
      <p><strong>Note:</strong> Factoring by grouping can be difficult, and there are often other strategies that can get you to the answer on test day. For example, you might be able to simply test multiple choice options by using FOIL, or plug in simple values for $x$ to find a match!</p>
      <p>To factor a quadratic expression in the form $ax^2+bx+c$:</p>
      <ol>
        <li>Factor out any integers if possible. If this results in the product of an integer and a quadratic expression in the form $x^2+bc+c$, follow the steps for factoring $x^2+bx+c$ shown above.</li>
        <li>Find two numbers with a product equal to $ac$ and a sum equal to $b$</li>
        <li>Use the two numbers from Step 2 to split $bx$ into two $x$-terms.</li>
        <li>Group the resulting expression into two pairs of terms: one pair should have an $x^2$-term and an $x$-term, and the other pair should have an $x$-term and a constant term.</li>
        <li>Factor out an expression containing $x$ from the pair with an $x^2$-term and an $x$-term. Factor out a constant from the pair with an $x$-term and a constant term. These two pairs should now share a binomial factor.</li>
        <li>The shared binomial factor is one factor of the quadratic expression. The expression containing $x$ and the constant factored out in Step 5 combine to form the other factor of the quadratic expression.</li>
      </ol>`,
    example: {
      question: `<p><strong>Example:</strong> Factor $6x^2-7x-3$.</p>`,
      explanation: `<p>We're looking for two numbers, $a$ and $b$, that meet the following criteria:</p>
        <ul>
          <li>$ab$ is equal to the product of the coefficient of $x^2$ and the constant term, $(6)(-3)=-18$.</li>
          <li>$a+b$ is equal to the coefficient of $x$, $-7$</li>
        </ul>
        <p>$a=-9$ and $b=2$ would work:</p>
        <ul>
          <li>$(-9)(2)=-18$</li>
          <li>$-9+2=-7$</li>
        </ul>`
    }
  },
];
