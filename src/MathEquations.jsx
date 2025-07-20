import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import katex from "katex";
import html2canvas from "html2canvas";
import "katex/dist/katex.min.css";


const bannerImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Mathematical_formulae.svg/1200px-Mathematical_formulae.svg.png";


const equationMap = {
    "Area of Circle": "A = \\pi r^2",
    "Area of Rectangle": "A = lw",
    "Area of Triangle": "A = \\frac{1}{2}bh",
    "Bayes Theorem": "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}",
    "Binomial Formula": "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k",
    "Chi-Square": "\\chi^2 = \\sum \\frac{(O - E)^2}{E}",
    "Combination Formula": "\\binom{n}{r} = \\frac{n!}{r!(n - r)!}",
    "Compound Interest": "A = P\\left(1 + \\frac{r}{n}\\right)^{nt}",
    "Confidence Interval": "\\bar{x} \\pm z \\frac{\\sigma}{\\sqrt{n}}",
    "Circumference of Circle": "C = 2\\pi r",
    "Derivative of cos(x)": "\\frac{d}{dx} \\cos(x) = -\\sin(x)",
    "Derivative of e^x": "\\frac{d}{dx} e^x = e^x",
    "Derivative of ln(x)": "\\frac{d}{dx} \\ln(x) = \\frac{1}{x}",
    "Derivative of sin(x)": "\\frac{d}{dx} \\sin(x) = \\cos(x)",
    "Derivative of x^n": "\\frac{d}{dx} x^n = nx^{n-1}",
    "Determinant 2x2": "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc",
    "Distance Formula": "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
    "Euler's Identity": "e^{i\\pi} + 1 = 0",
    "Expected Value": "E[X] = \\sum x_i p_i",
    "Integral of cos(x)": "\\int \\cos(x) dx = \\sin(x) + C",
    "Integral of e^x": "\\int e^x dx = e^x + C",
    "Integral of sin(x)": "\\int \\sin(x) dx = -\\cos(x) + C",
    "Integral of x^n": "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C",
    "Law of Cosines": "c^2 = a^2 + b^2 - 2ab\\cos C",
    "Law of Sines": "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}",
    "Log Rule 1": "\\log_b(xy) = \\log_b(x) + \\log_b(y)",
    "Log Rule 2": "\\log_b\\left(\\frac{x}{y}\\right) = \\log_b(x) - \\log_b(y)",
    "Log Rule 3": "\\log_b(x^r) = r\\log_b(x)",
    "Logistic Growth": "P(t) = \\frac{K}{1 + Ae^{-rt}}",
    "Matrix Multiplication": "(AB)_{ij} = \\sum_k A_{ik} B_{kj}",
    "Midpoint Formula": "M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)",
    "Normal Distribution": "f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}",
    "Perimeter of Rectangle": "P = 2(l + w)",
    "Poisson Distribution": "P(k; \\lambda) = \\frac{e^{-\\lambda} \\lambda^k}{k!}",
    "Population Growth": "P(t) = P_0 e^{rt}",
    "Probability Rule": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
    "Pythagorean Theorem": "a^2 + b^2 = c^2",
    "Quadratic Formula": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    "Sample Variance": "s^2 = \\frac{1}{n - 1} \\sum (x_i - \\bar{x})^2",
    "Simple Interest": "I = Prt",
    "Slope Formula": "m = \\frac{y_2 - y_1}{x_2 - x_1}",
    "Standard Deviation": "\\sigma = \\sqrt{Var(X)}",
    "Sum of Arithmetic Series": "S_n = \\frac{n}{2}(a + l)",
    "Sum of Geometric Series": "S_n = a \\frac{1 - r^n}{1 - r}",
    "T Statistic": "t = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}}",
    "Taylor Series of cos(x)": "\\cos(x) = \\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n}}{(2n)!}",
    "Taylor Series of e^x": "e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!}",
    "Taylor Series of sin(x)": "\\sin(x) = \\sum_{n=0}^\\infty \\frac{(-1)^n x^{2n+1}}{(2n+1)!}",
    "Variance": "Var(X) = E[(X - \\mu)^2]",
    "Z Score": "z = \\frac{X - \\mu}{\\sigma}"
};

const options = Object.keys(equationMap)
  .sort()
  .map((name) => ({ value: name, label: name }));

function MathEquations() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const renderRef = useRef(null);

  useEffect(() => {
    if (renderRef.current && selectedOption) {
      html2canvas(renderRef.current, { backgroundColor: "#ffffff" }).then((canvas) => {
        setImageSrc(canvas.toDataURL("image/png"));
      });
    }
  }, [selectedOption]);

  const latex = selectedOption ? equationMap[selectedOption.value] : "";

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", color: "#000" }}>
      <img
        src={bannerImageUrl}
        alt="Math Logo"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "contain",
          marginBottom: "1rem"
        }}
      />

      <h2>Search Math Equation</h2>
      <div style={{ width: "350px", margin: "0 auto" }}>
        <Select
          options={options}
          onChange={(option) => {
            setSelectedOption(option);
            setImageSrc(null);
          }}
          placeholder="Type or select an equation..."
          isSearchable
          styles={{
            control: (base) => ({
              ...base,
              color: "#000",
              backgroundColor: "#fff",
              borderColor: "#ccc"
            }),
            singleValue: (base) => ({ ...base, color: "#000" }),
            input: (base) => ({ ...base, color: "#000" }),
            menu: (base) => ({ ...base, backgroundColor: "#fff", color: "#000" }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#eee" : "#fff",
              color: "#000",
              cursor: "pointer"
            })
          }}
        />
      </div>

      {latex && (
        <>
          <div
            ref={renderRef}
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              fontSize: "32px"
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(latex, { throwOnError: false })
            }}
          />

          <div
            style={{
              marginTop: "2rem",
              fontSize: "1.5rem"
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(latex, {
                throwOnError: false,
                displayMode: true
              })
            }}
          />

          {imageSrc && (
            <div style={{ marginTop: "2rem" }}>
              <h4>Equation Image</h4>
              <img
                src={imageSrc}
                alt="Equation as image"
                style={{ border: "1px solid #ccc", padding: "0.5rem", background: "#fff" }}
              />
              <div style={{ marginTop: "1rem" }}>
                <a href={imageSrc} download="equation.png">
                  <button>Download Image</button>
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MathEquations;
