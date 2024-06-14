'use client'
import Image from "next/image"
import { ButtonLink } from "@components/common/Button"
import { useSession } from "next-auth/react"
import { Button } from "@components/common/Button"
import GreenDotIcon from "@components/common/icons/GreenDotIcon"
import HeartIcon from "@components/common/icons/HeartIcon"
import CommentsIcon from "@components/common/icons/CommentsIcon"
import ShareIcon from "@components/common/icons/ShareIcon"

export default function Home() {
  const { data: session } = useSession()

  if (session === undefined) return <></>
  return (
    <>
      {/* Authenticated UI */}
      {session && (
        <section className='px-3'>

        <div className='grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9]'>
          
          {/* Profile Icon */}
          <div>
            <Image
              src='/tempPostIcon1.png'
              alt=''
              width='40'
              height='40'
            />
          </div>

          {/* Post Content */}
          <div className='w-full'>

            {/* User's name + timestamp */}
            <div className='flex items-center gap-2 font-lora font-bold text-primary'>
              <p>Sasuke Uchiha</p>
              <GreenDotIcon/>
              <span className='font-semibold'>
                2 mins
              </span>
            </div>

            {/* Post caption */}
            <div className='mt-[6px]'>
              <p className='font-montserrat font-medium text-primary text-[14px] leading-[20px]'>
                This book delves into the darker side of human nature, the shadows we carry. It&apos;s a reflection of the path I&apos;ve walked...
                <span className='text-[#8D8D8D] pl-2 cursor-pointer'>
                  more
                </span>
              </p>
            </div>

            {/* Post image */}
            <div className='w-full mt-4'>
              <Image
                className='w-full'
                src='/tempPostImage1.png'
                alt='Temporary alt description here'
                width='314'
                height='176'
                objectFit='cover'
              />
            </div>

            {/* Buttons Container */}
            <div className='flex mt-3 gap-2'>
              <Button
                type='tertiary'
                bordersRounded={true}
                icon={<HeartIcon/>}
                clickHandler={()=>{}}
              >
                12k
              </Button>
              <Button
                type='tertiary'
                bordersRounded={true}
                icon={<CommentsIcon/>}
                clickHandler={()=>{}}
              >
                562
              </Button>
              <Button
                type='tertiary'
                bordersRounded={true}
                icon={<ShareIcon/>}
                clickHandler={()=>{}}
                className='ml-auto'
              >
                Share
              </Button>
            </div>

          </div>

        </div>
        </section>
      )}

      {/* Unauthenticated UI */}
      {!session && (
        <section className='flex flex-col items-center py-[60px] px-[12px] w-full h-full xl:py-[186px]'>
          <div className='w-max'>
            <Image
              src='/great-reads-hero-image.png'
              className='xl:w-[532px] xl:h-[390px]'
              width='304'
              height='222'
              alt=''
              priority
            />
          </div>
          <div className='text-center'>
            <h1 className='font-lora text-xl text-primary font-semibold mt-10 xl:text-[32px]'>
              Discover, Share, Connect.
            </h1>
            <p className='font-montserrat text-primary text-[14px] font-medium tracking-[-0.5px] mb-8 mt-4 xl:text-xl'>
              Sign up to unlock a world of literary adventures!
            </p>
          </div>
          <div className='flex gap-2 xl:gap-4 xl:justify-center xl:mt-12'>
            <ButtonLink
              href='/sign-up'
              type='secondary'
              bordersRounded={true}
            >
              Create Account
            </ButtonLink>
            <ButtonLink
              href='/sign-in'
              type='primary'
              bordersRounded={true}
            >
              Sign In
            </ButtonLink>
          </div>
        </section>
      )}
    </>
  )
}
