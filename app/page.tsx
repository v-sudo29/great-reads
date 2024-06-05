import Image from "next/image"
import { ReactNode } from "react"

interface ButtonLinkProps {
  href: string
  className?: string
  children: ReactNode
  type: 'primary' | 'secondary'
}

const ButtonLinks = ({
  href,
  className,
  children,
  type
} : ButtonLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const defaultStyles = 'rounded-full font-rubik font-medium px-8 py-[10px]'
  
  const typeStyles = 
    type === 'primary' ?
    'bg-primary text-[#F5F5F5]' :
    type === 'secondary' ?
      'text-primary border border-[#A9B3AE]' :
    ''
  return (
    <a
      href={href}
      className={defaultStyles + ' ' + typeStyles + ' ' + className}
    >
      {children}
    </a>
  )
}

export default function Home() {
  return (
    <section className='pt-[60px] px-[43px]'>
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
        <ButtonLinks
          href='/sign-up'
          type='secondary'
        >
          Create Account
        </ButtonLinks>
        <ButtonLinks
          href='/sign-in'
          type='primary'
        >
          Sign In
        </ButtonLinks>
      </div>
    </section>
  )
}
