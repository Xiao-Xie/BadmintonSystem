const express = require('express');
const path = require('path');
// const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyparser.json());

const PORT = process.env.PORT || 9000;

//To prevent server routing - react-router will handle the routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

//routing
const router = require('./router');
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
