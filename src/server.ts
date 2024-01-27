import express from 'express';
import routes from './routes'


const app = express();

app.use(express.json());

app.get('/', (request, response) => {

   return response.json({ message: 'Hello'});
})

app.use(routes)

app.listen(3333, () => {
   console.log('👻 Server Started on port 3333!')
});

