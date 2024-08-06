"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import { Button } from "../Button";
import { useLogin } from "@/app/hooks/useLoginModal";
import { useRegister } from "@/app/hooks/useRegisterModal";

interface LoginModalProps { }

export const LoginModal: React.FC<LoginModalProps> = ({ }) => {
  const router = useRouter();
  const loginModal = useLogin();
  const registerModal = useRegister();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    })
    setIsLoading(false)
    if (result?.ok) {
      toast.success('Loggged in')
      router.refresh();
      loginModal.onClose();
    }

    if (result?.error) {
      toast.error(result.error);
    }
  }

  const loginWithProvider = async (provider: string) => {
    setIsLoading(true);

    const result = await signIn(provider)
    setIsLoading(false)
    if (result?.ok) {
      toast.success('Loggged in')
      router.refresh();
      // loginModal.onClose();
    }

    if (result?.error) {
      toast.error(result.error);
    }
  }

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subTitle="Login to your account"
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
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => loginWithProvider('google')}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => loginWithProvider('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>
            First time using Airbnb
          </div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggle}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
};