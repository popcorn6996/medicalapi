const http = require('http');
const port = process.env.PORT || 6000;
const app = require('./index');

const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => {`Connected at post ${port}`});

