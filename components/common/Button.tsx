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
  type: 'primary' | 'secondary' | 'tertiary',
  bordersRounded: boolean
  icon?: ReactNode
  clickHandler: (() => void) | ((any: any) => Promise<void>)
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
  icon,
  clickHandler
} : ButtonProps) => {
  const defaultStyles = 'flex gap-2 items-center font-rubik font-medium px-8 py-[10px] leading-[20px] xl:text-[20px] xl:py-4'
  const borderStyles = 
    bordersRounded ?
      'rounded-full' :
      'rounded-[4px]'
  const typeStyles = 
    type === 'primary' ?
    'bg-primary text-[#F5F5F5]' :
    type === 'secondary' ?
      'text-primary border border-[#A9B3AE]' :
    type === 'tertiary' ?
      'font-montserrat text-[12px] text-primary bg-[#E8ECEC] px-[12px] py-[6px] gap-[6px]' :
      ''

  return (
    <button
      className={defaultStyles + ' ' + typeStyles + ' ' +  borderStyles + ' ' + className}
      onClick={clickHandler}
    >
      {icon && (
        <div>
          {icon}
        </div>
      )}
      {children}
    </button>
  )
}