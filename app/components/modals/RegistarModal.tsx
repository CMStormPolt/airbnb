"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRegister } from "@/app/hooks/useRegisterModal";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import { toast} from 'react-hot-toast';
import { Button } from "../Button";
import { useLogin } from "@/app/hooks/useLoginModal";

interface RegistarModalProps {}

export const RegistarModal: React.FC<RegistarModalProps> = ({}) => {
  const registerModal = useRegister();
  const loginModal = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.post(('/api/register'), data)
        registerModal.onClose();
    } catch(error) {
        toast.error('Something went wrong');
    } finally {
        setIsLoading(false)
      }
  }  

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
            title="Welcome to Airbnb"
            subTitle="Create an account!"
        />
        <Input 
            id="email"
            label="Email"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
        />
        <Input 
            id="name"
            label="Name"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
        />
        <Input 
            id="password"
            label="Password"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
            type="password"
        />

    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
        <hr/>
        <Button 
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
        />
        <Button 
            outline
            label="Continue with GitHub"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
        />
        <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="flex flex-row justify-center items-center gap-2">
                <div>
                    Already have an account?
                </div>
                <div 
                    className="text-neutral-800 cursor-pointer hover:underline"
                    onClick={toggle}
                >
                    Log in
                </div>
            </div>
        </div>
    </div>
  )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
};
