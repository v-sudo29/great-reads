import { ReactNode } from "react"

interface ButtonLinkProps {
  href?: string
  className?: string
  children: ReactNode
  type: 'primary' | 'secondary',
  bordersRounded: boolean
}

interface ButtonProps {
  className?: string
  children: ReactNode
  type: 'primary' | 'secondary',
  bordersRounded: boolean
  clickHandler: () => void
}

export const ButtonLink = ({
  href,
  className,
  children,
  type,
  bordersRounded
} : ButtonLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const defaultStyles = 'font-rubik font-medium px-8 py-[10px] leading-[20px] xl:text-[20px] xl:py-4'
  const borderStyles = 
    bordersRounded ?
      'rounded-full' :
      'rounded-[4px]'
  const typeStyles = 
    type === 'primary' ?
    'bg-primary text-[#F5F5F5]' :
    type === 'secondary' ?
      'text-primary border border-[#A9B3AE]' :
    ''
  return (
    <a
      href={href}
      className={defaultStyles + ' ' + typeStyles + ' ' +  borderStyles + ' ' + className}
    >
      {children}
    </a>
  )
}

export const Button = ({
  children,
  className,
  bordersRounded,
  type,
  clickHandler
} : ButtonProps) => {
  const defaultStyles = 'font-rubik font-medium px-8 py-[10px] leading-[20px] xl:text-[20px] xl:py-4'
  const borderStyles = 
    bordersRounded ?
      'rounded-full' :
      'rounded-[4px]'
  const typeStyles = 
    type === 'primary' ?
    'bg-primary text-[#F5F5F5]' :
    type === 'secondary' ?
      'text-primary border border-[#A9B3AE]' :
    ''
  return (
    <button
      className={defaultStyles + ' ' + typeStyles + ' ' +  borderStyles + ' ' + className}
      onClick={clickHandler}
    >
      {children}
    </button>
  )
}