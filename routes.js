const router = require('express').Router();
const dbQueries = require('./database.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const genPass = async (pwd) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pwd, salt);
  return hash;
};

const compPass = async (pwd, hash) => {
  const match = await bcrypt.compare(pwd, hash);
  return match;
};

router.post('/products/', async (req, res) => {
  const body = req.body;
  const id = body.id;

  if (!body.description) {
    res.status(400).send(`Du måste ange en beskrivning`);
  } else if (!body.name) {
    res.status(400).send(`Du måste ange ett namn`);
  } else if (!body.price || !body.price.match('^\\d+$')) {
    res.status(400).send(`Du måste ange ett pris eller är priset inte ett number`);
  } else {
    const found = await dbQueries.saveProduct(body);
    res.json({ status: 'Allt funkade' });
  }
});

router.get('/products/', async (req, res) => {
  try {
    const products = await dbQueries.getProducts();
    res.json(products);
  } catch (error) {
    res.json({ info: 'error' });
  }
});

router.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await dbQueries.getProduct(id);
    res.json(product);
  } catch (error) {
    res.json({ info: 'error' });
  }
});

router.delete('/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await dbQueries.deleteProduct(id);
    res.json({ status: 'Allt funkade' });
  } catch (error) {
    res.json({ info: 'error' });
  }
});

router.put('/products/', async (req, res) => {
  const body = req.body;
  const id = body.id;

  const found = await dbQueries.getProduct(id);

  if (!body.name) {
    res.status(400).send(`Namn kan inte vara tomt`);
  } else if (!body.description) {
    res.status(400).send(`Beskrivningen kan inte vara tomt`);
  } else if (!body.price) {
    res.status(400).send(`Du måste ange ett pris!`);
  } else if (found) {
    const result = await dbQueries.updateProduct(body);
    res.json({ status: 'Allt funkade' });
  } else {
    res.status(400).send(`Ingen produkt med id : ${body.id}`);
  }
});

router.get('/users/', async (req, res) => {
  try {
    const users = await dbQueries.getUsers();
    res.json(users);
  } catch (error) {
    res.send('Något gick fel i routen.');
  }
});

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await dbQueries.getUser(id);
    res.json(user);
  } catch (error) {
    res.json({ info: 'error' });
  }
});

router.post('/users/', async (req, res) => {
  const body = req.body;
  const id = body.id;
  const found = await dbQueries.getUser(id);

  if (
    body.email == null ||
    !body.email.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    res.status(400).send(`Ogiltig email`);
  } else if (body.firstname == null || !body.firstname.match(/^([a-zA-Z ]){2,30}$/)) {
    res.status(400).send(`Ogiltig förnamn. Du kan bara använda bokstäver eller så har du inte skrivit in något förnamn`);
  } else if (body.lastname == null || !body.lastname.match(/^([a-zA-Z ]){2,30}$/)) {
    res.status(400).send(`Ogiltig efernamn. Du kan bara använda bokstäver eller så har du inte skrivit in något efternamn`);
  } else {
    body.password = await genPass(body.password);
    const result = await dbQueries.saveUser(body);
    res.json({ status: 'Allt funkade' });
  }
});

router.post('/login/', async (req, res) => {
  const body = req.body;
  const found = await dbQueries.loginUser(body.email);

  if (found == null) {
    return res.status(400).send('Det angivna email-adressen finns inte.');
  }

  const passwordMatches = await compPass(body.password, found.password);

  if (passwordMatches == true) {
    res.json(`Det gick att logga in: ${body.email}`);
  } else {
    res.status(400).send('Kunde inte logga in. Fel lösenord');
  }
});

module.exports = router;
