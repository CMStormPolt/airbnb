'use client';

import { use, useEffect } from "react";
import { EmptyState } from "./components/EmptyState";

interface ErrorPageProps {
    error: Error
}

export default async function error({error}: ErrorPageProps) {
    useEffect(()=>{
        console.error(error)
    }, [error])

    return (
        <EmptyState title="Uh oh" subTitle="Something went wrong"/>
    )
}