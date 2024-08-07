"use client";

import { useState, useMemo, useCallback } from "react";
import qs from "query-string";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from 'react-hot-toast';
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";
import { Button } from "../Button";
import { useLogin } from "@/app/hooks/useLoginModal";
import { useRegister } from "@/app/hooks/useRegisterModal";
import { useSearch } from "@/app/hooks/useSearchModal";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelect, CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import { Calendar } from "../inputs/Calendar";
import { Counter } from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export const SearchModal: React.FC = () => {
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathRoomCount, setBathRoomCount] = useState(1)
  const [location, setLocation] = useState<CountrySelectValue>()
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const router = useRouter();
  const params = useSearchParams()
  const searchModal = useSearch();
  const [isLoading, setIsLoading] = useState(false);

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location])

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit = useCallback(async() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true })

    setStep(STEPS.LOCATION)
    searchModal.onClose();

    router.push(url);
  }, [step, searchModal, location, router, guestCount, roomCount, bathRoomCount, dateRange, onNext, onBack, params])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step])


  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   setIsLoading(true);

  //   const result = await signIn('credentials', {
  //     ...data,
  //     redirect: false,
  //   })
  //   setIsLoading(false)
  //   if (result?.ok) {
  //     toast.success('Loggged in')
  //     router.refresh();
  //     loginModal.onClose();
  //   }

  //   if (result?.error) {
  //     toast.error(result.error);
  //   }
  // }

  // const loginWithProvider = async (provider: string) => {
  //   setIsLoading(true);

  //   const result = await signIn(provider)
  //   setIsLoading(false)
  //   if (result?.ok) {
  //     toast.success('Loggged in')
  //     router.refresh();
  //     // loginModal.onClose();
  //   }

  //   if (result?.error) {
  //     toast.error(result.error);
  //   }
  // }

  // const toggle = useCallback(() => {
  //   loginModal.onClose();
  //   registerModal.onOpen();
  // }, [loginModal, registerModal])

  let  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subTitle="Find the perfect location!"
      />
      <CountrySelect 
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng}/>
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subTitle="Make sure everyone is free!"
        />
        <Calendar 
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subTitle="Find your perfect place!"
        />
        <Counter 
          title="Guests"
          subTitle="How many guests are comming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter 
          title="Rooms"
          subTitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter 
          title="Bathrooms"
          subTitle="How many bathrooms do you need?"
          value={bathRoomCount}
          onChange={(value) => setBathRoomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      disabled={isLoading}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    // footer={footerContent}
    />
  )
};