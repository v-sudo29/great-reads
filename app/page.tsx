import Image from "next/image"
import ButtonLink from "@components/common/ButtonLink"
import heroImage from "@public/great-reads-hero-image.png"

export default function Home() {
  return (
    <section className='py-[60px] px-[12px] h-full xl:py-[186px]'>
      <div>
        <Image
          src='/great-reads-hero-image.png'
          width='304'
          height='222'
          alt=''
          priority
        />
      </div>
      <div className='text-center'>
        <h1 className='font-lora text-xl text-primary font-semibold mt-10'>
          Discover, Share, Connect.
        </h1>
        <p className='font-montserrat text-primary text-[14px] font-medium tracking-[-0.5px] mb-8 mt-3'>
          Sign up to unlock a world of literary adventures!
        </p>
      </div>
      <div className='flex gap-2'>
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
