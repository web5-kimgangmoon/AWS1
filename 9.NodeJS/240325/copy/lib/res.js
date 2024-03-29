const makeHeader = (type, length) => `HTTP/1.1 200 Ok
Content-Type: ${type};
Content-Length: ${length}`;

const makeResponse = (type, body) => {
  body = Buffer.from(body);
  return `${makeHeader(type, body.length)}

${body.toString()}`;
};

const redirect = () => {
  return `HTTP/1.1 301 Moved Permanently
Content-Type: text/html
Content-Length: 0

`;
};
// 010101 => R : 1, G : 1, B : 1
//
const sendFile = (type, body) => {};
