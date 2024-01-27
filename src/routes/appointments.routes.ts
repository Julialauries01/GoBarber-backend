import { Router, request, response } from 'express';
import { uuid } from 'uuidv4';
import { parseISO} from 'date-fns';
import AppointmentsRepository from '../repositores/AppointmentsRepository';
 import CreateAppointmentService from '../service/CreateAppointmentsService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/',(request, response) => {
   const appointments = appointmentsRepository.all();
   return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
   console.log('Request Body:', request.body);

  try {
   const { provider, date } = request.body || {};
   console.log('Destructured Values:', { provider, date });

   const parsedDate = parseISO(date);
   
   const CreateAppointment = new CreateAppointmentService(appointmentsRepository);

   const appointment =  CreateAppointment.execute({ date: parsedDate, provider})

   return response.json(appointment);

  } catch (err: any) {
   return response.status(400).json({error: err.message })
  }
});
 
export default appointmentsRouter;