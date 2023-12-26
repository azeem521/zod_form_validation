import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'


type FormData = {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  password: string,
  confirmPassword: string,
}

function App() {

  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(20),
      lastName: z.string().min(2).max(20),
      email: z.string().email(),
      age: z.number().min(2).max(60),
      password: z.string().min(2).max(20),
      confirmPassword: z.string().min(2).max(20),
    }).refine((data)=>data.password === data.confirmPassword, {
      message:"Password is not matched",
      path:['confirmPassword']
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({resolver: zodResolver(schema)});

    const submitData = (data: FormData)=>{
      console.log("It worked",data);
      
    }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            {...register("firstName")}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            {...register("lastName")}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            {...register("age", {valueAsNumber:true})}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
