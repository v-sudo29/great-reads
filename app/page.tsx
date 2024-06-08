import Image from "next/image"
import ButtonLink from "@components/common/ButtonLink"

export default function Home() {
  return (
    <section className='py-[60px] px-[12px] h-full xl:py-[186px]'>
      <div>
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
  )
}
