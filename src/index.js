const http = require('http');
const { getUsers } = require('./modules/users');

const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3003;

const send = (response, status, body = '', type = 'text/plain') => {
    response.writeHead(status, { 'Content-Type': `${type}; charset=utf-8` });
    response.end(body);
};

const server = http.createServer(async (request, response) => {
    const { searchParams } = new URL(request.url, `http://${HOST}`);

    if (searchParams.size === 0) {
        return send(response, 200, 'Hello, World!');
    }

    if (searchParams.has('hello')) {
        const name = searchParams.get('hello');
        return name
            ? send(response, 200, `Hello, ${name}.`)
            : send(response, 400, 'Enter a name');
    }

    if (searchParams.has('users')) {
        try {
            return send(response, 200, await getUsers(), 'application/json');
        } catch {
            return send(response, 500);
        }
    }

    send(response, 500);
});

server.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});
