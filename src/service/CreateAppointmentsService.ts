import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositores/AppointmentsRepository";
import { startOfHour } from "date-fns";

interface Request  {
   provider: string;
   date: Date;
}

class CreateAppointmentService{
   private appoimentsRepository: AppointmentsRepository;

   constructor(appointmentsRepository: AppointmentsRepository) {
      this.appoimentsRepository = appointmentsRepository;
   }

   public execute({date, provider}: Request): Appointment {
      const appointmentDate = startOfHour(date);

   const findAppointmentInSameDate = this.appoimentsRepository .findByDate(
      appointmentDate
      );

      if (findAppointmentInSameDate){
         throw Error('This appointment is alredy booked');
      }

      const appointment = this.appoimentsRepository.create({
         provider, 
        date: appointmentDate,
      });
      return appointment;
   }
}
export default CreateAppointmentService;