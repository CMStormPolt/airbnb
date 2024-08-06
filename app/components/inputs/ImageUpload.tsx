import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])

    return (
       <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME}
            options={{
                maxFiles: 1
            }}
       >
        {({open})=> {
            return (
                <div 
                    onClick={() => open?.()}
                    className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600"
                >
                    <TbPhotoPlus size={50}/>
                    <div className="font-semibold text-lg">
                        Click to upload
                    </div>
                    {value && (
                        <div className="absolute h-full inset-0 w-full">
                            <Image 
                                alt="upload"
                                fill
                                style={{objectFit: 'contain'}}
                                src={value}
                            />
                        </div>
                    )}
                </div>
            )
        }}
       </CldUploadWidget>
    )
}