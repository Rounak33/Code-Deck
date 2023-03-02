import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import FormInputComponent from '../Components/FormInputComponent'
import { toastArray } from "../Components/Toast";
import { toast } from "react-toastify";
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'


function SignIn() {

  const navigate = useNavigate()

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Required field'),
    password: yup.string().required('Required field').min(6, 'Password must be at least 6 characters')
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      toast.success("SignIn Succesfull", toastArray);
    }).catch((error) => {
      toast.error("error", toastArray);
    })
  }
  

  const onSubmit = (data) => {
    console.log(data)
    auth.signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        toast.success("SignIn Succesfull", toastArray);
      }).catch((error) => {
        console.log("error in signing in")
        toast.error("error", toastArray);

      });
  }


  return (
    <div className='flex flex-col w-6/12 p-4 mx-auto justify-center border '>

      <h1 className=' text-center font-semibold underline'>Sign In </h1>
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

      </form>
      <button type='submit' form='hook-form' className='w-full border-2 bg-black text-white hover:bg-red p-3 mt-8 font-semibold shadow-lg rounded-lg'> Sign In </button>
      <button onClick={signInWithGoogle} form='hook-form' className='w-full border-2 bg-primaryLight hover:bg-white p-3 mt-8 font-semibold shadow-lg rounded-lg text-center flex justify-center'> <span className="flex items-center gap-3 text-black"><FcGoogle style={{ fontSize: "2rem" }} /> Sign In with Google</span> </button>
      <h5 className='mt-4'>Don't have an account ?<span className='text-primaryLight hover:bg-black mx-2 underline cursor-pointer' onClick={() => { navigate("/signup") }}>SignUp</span></h5>

    </div>
  )
}

export default SignIn