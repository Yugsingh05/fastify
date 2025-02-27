const port = process.env.PORT || 3000;
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Enable CORS
fastify.register(cors, {
  origin: '*', // Change this for security
  methods: ['GET', 'POST'],
});

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

// POST route with JSON parsing
fastify.post('/login', async (request, reply) => {
  const { email, name,password } = request.body;

if(!email) {
  return reply.status(400).send({ message: 'Email is required' });
}

else if(!name) {
  return reply.status(400).send({ message: 'Name is required' });
}

else if(!password) {
  return reply.status(400).send({ message: 'Password is required' });
}

  reply.send({ message: 'Login successful', name, email,password });
  console.log(email,name);
});

// Start server
fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
