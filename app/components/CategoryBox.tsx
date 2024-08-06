import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

interface CategoryBoxProps {
    label: string;
    description?: string;
    icon: IconType;
    selected?: boolean;
}

export const CategoryBox: React.FC<CategoryBoxProps> = ({
    label, description, selected, icon: Icon
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        console.log(url);

        router.push(url);
    }, [label, params, router])
    

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center border-b-2 justify-center p-3 hover:text-neutral-800 gap-2 transition cursor-pointer ${selected ? 'border-b-neutral-500' : 'border-transparent'} ${selected ? 'text-b-neutral-800' : 'text-b-neutral-500'}`}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}