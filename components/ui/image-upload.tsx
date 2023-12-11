'use client'

import { useState, useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from '@/components/ui/button'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex-col items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
        <CldUploadWidget onUpload={onUpload} uploadPreset="dyfp09oi">
          {({ open }) => {
            const onClick = () => {
              open()
            }

            return (
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={onClick}
                className="mt-2"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Upload an image
              </Button>
            )
          }}
        </CldUploadWidget>
      </div>
    </div>
  )
}

export default ImageUpload
