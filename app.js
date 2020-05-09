const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

app.get('/sum', (req, res) => {
    const {a, b} = req.query;

    if(Number.isNaN(a)) {
        return res.status(400).send('a must be a number');
    }

    if(Number.isNaN(b)) {
        return res.status(400).send('b must be a number');
    }

    const c = Number(a) + Number(b);

    const responseString = `The sum of ${a} and ${b} is ${c}`;

    res
        .status(200)
        .send(responseString);
});

//drill 2

app.get("/cipher", (req, res) => {
    const text = req.query.text;
    const textArray = text.split("");
    const shiftedBy = +(req.query.shift);
    const cipher = textArray.map((char) => {
      if (char === char.toUpperCase()) {
        const newUppercaseChar = String.fromCharCode(
          ((char.charCodeAt(0) + shiftedBy - 65) % 26) + 65
        );
        return newUppercaseChar;
      } else {
        const newLowercaseChar = String.fromCharCode(
          ((char.charCodeAt(0) + shiftedBy - 97) % 26) + 97
        );
        return newLowercaseChar;
      }
    });
    res.send(
      `Your text "${text}" when run through the Caesar Cipher becomes: <b>${cipher.join(
        ""
      )}</b>`
    );
  });


app.get('/lotto', (req, res) => {
    const { numbers } = req.query;

    if(numbers.length !== 6){
        res.status(400).send('please give 6 numbers');
    }

    const stockNum = []
        for (let i=0; i<6;i++){
            const randomNum = Math.ceil(Math.random() * 10)
        stockNum.push(randomNum)
        }

    const commonNum =numbers.filter(num => stockNum.includes(Number(num)));

    if(commonNum.length < 4){
        res.send('Sorry you lose.');
    }else if(commonNum.length === 4){
        res.send('Congratulations, you win a free ticket')
    }else if (commonNum.length === 5){
        res.send('You won $100.')
    }
    else res.send('Wow! Unbelievable! You could have won the mega millions!')


})


app.listen(8000, () => {
    console.log('Server running');
});