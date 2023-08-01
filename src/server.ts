import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get<{ exampleRouteParameter: string }>(
  "/echo/:exampleRouteParameter",
  (req, res) => {
    const echoContent = req.params.exampleRouteParameter;
    res.json({
      echo: echoContent,
      message: `I am echoing back to you: ${echoContent}`,
    });
  }
);

app.get<{ numOne: string; numTwo: string }>(
  "/multiply/:numOne/:numTwo",
  (req, res) => {
    /**
     * Note that `numOne` and `numTwo` are both typed as string.
     * (Hover over with your mouse to see!)
     *
     * Route params are, by default, typed as strings when they
     * are parsed by Express.
     */
    const { numOne, numTwo } = req.params;
    const multiplication = parseInt(numOne) * parseInt(numTwo);
    res.json({
      original: `${numOne} x ${numTwo}`,
      result: multiplication,
    });
  }
);

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{ shoutedText: string }>("/shout/:shoutedText", (req, res) => {
  const shoutedText = req.params.shoutedText;
  res.json({
    shout: `${shoutedText}`,
    result: `I am shouting back to you: ${shoutedText}!`,
  });
});

//GET /add/3/4 should have a JSON body response of { "original": "3 + 4", "result": 7 }

app.get<{ number1: string; number2: string }>(
  "/add/:number1/:number2",
  (req, res) => {
    const number1 = parseInt(req.params.number1);
    const number2 = parseInt(req.params.number2);

    const result = number1 + number2;
    res.json({ original: `${number1}+${number2}`, result: result });
  }
);

app.get<{ number1: string; number2: string; number3: string }>(
  "/add/:number1/:number2/:number3",
  (req, res) => {
    const number1 = parseInt(req.params.number1);
    const number2 = parseInt(req.params.number2);
    const number3 = parseInt(req.params.number3);

    const result = number1 + number2 + number3;
    res.json({ original: `${number1}+${number2}+${number3}`, result: result });
  }
);

let vowels = ["a", "e", "i", "o", "u"];

function anVsAn(food: string): string {
  let result = "";

  if (vowels.includes(food[0])) {
    result = "an";
  } else {
    result = "a";
  }

  return result;
}

app.get<{ food: string }>("/eat/:food", (req, res) => {
  const food = req.params.food;
  res.json({
    message: `Yum yum - you ate ${anVsAn(food)} ${food}!`,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
