import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import FormInputComponent from '../Components/FormInputComponent'
import { toastArray } from "../Components/Toast";
import { toast } from "react-toastify";
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
function SignUp() {

  const navigate = useNavigate()
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Required field'),
    password: yup.string().required('Required field').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().required('Required field').min(6, 'Password must be at least 6 characters').oneOf([yup.ref('password')], "passwords don't match")
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = (data) => {
    auth.createUserWithEmailAndPassword(data.email, data.password).then((userCredential) => {
      toast.success("SignUp Succesfull", toastArray);
    }
    ).catch((error) => {
      toast.error(error, toastArray);
    })
    console.log(data)
  }


  return (
    <div className='flex flex-col w-6/12 p-4 mx-auto justify-center border'>

      <h1 className='text-center font-semibold underline'>Sign Up </h1>
      <form id="hook-form" className='mt-16' onSubmit={handleSubmit(onSubmit)}>
        <FormInputComponent
          label='Email'
          type='email'
          name='email'
          placeholder='Enter your email'
          control={control}
          error={errors?.email?.message}
          required
        />
        <FormInputComponent
          label='Password'
          type='password'
          name='password'
          placeholder='Enter your password'
          control={control}
          error={errors?.password?.message}
          required
        />
        <FormInputComponent
          label='Password'
          type='password'
          name='confirmPassword'
          placeholder='Enter your password'
          control={control}
          error={errors?.confirmPassword?.message}
          required
        />

      </form>
      <button type='submit' form='hook-form' className='w-full border-2 bg-black text-white  hover:bg-red p-3 mt-8 font-semibold shadow-lg rounded-lg'> Sign Up</button>
      <h5 className='mt-4'>If you have account<span className='text-primaryLight hover:bg-black mx-2 underline cursor-pointer' onClick={()=>{navigate("/signin")}}>SignIn</span></h5>
    </div>
  )
}

export default SignUp