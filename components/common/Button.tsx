import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonLinkProps {
  href?: string
  className?: string
  children: ReactNode
  type: 'primary' | 'secondary'
  bordersRounded: boolean
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: ReactNode
  variant: 'primary' | 'secondary' | 'tertiary'
  bordersRounded: boolean
  icon?: ReactNode
  clickHandler: (() => void) | ((any: any) => Promise<void>)
  dataPostId?: string
}

export const ButtonLink = ({
  href,
  className,
  children,
  type,
  bordersRounded,
}: ButtonLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const defaultStyles =
    'font-rubik font-medium px-8 py-[10px] leading-[20px] xl:text-[20px] xl:py-4'
  const borderStyles = bordersRounded ? 'rounded-full' : 'rounded-[4px]'
  const typeStyles =
    type === 'primary'
      ? 'bg-primary text-[#F5F5F5]'
      : type === 'secondary'
        ? 'text-primary border border-[#A9B3AE]'
        : ''
  return (
    <a
      href={href}
      className={
        defaultStyles + ' ' + typeStyles + ' ' + borderStyles + ' ' + className
      }
    >
      {children}
    </a>
  )
}

export const Button = ({
  children,
  className,
  bordersRounded,
  variant,
  icon,
  clickHandler,
  dataPostId,
}: ButtonProps) => {
  const defaultStyles =
    'flex gap-2 items-center font-rubik font-medium px-8 py-[10px] leading-[20px] xl:text-[20px] xl:py-4'
  const borderStyles = bordersRounded ? 'rounded-full' : 'rounded-[4px]'
  const variantStyles =
    variant === 'primary'
      ? 'bg-primary text-[#F5F5F5]'
      : variant === 'secondary'
        ? 'text-primary border border-[#A9B3AE]'
        : variant === 'tertiary'
          ? 'font-montserrat text-[12px] text-primary bg-[#E8ECEC] px-[12px] py-[6px] gap-[6px] xl:py-[12px] xl:px-[20px] xl:gap-[12px] xl:text-[16px]'
          : ''

  return (
    <button
      className={
        defaultStyles +
        ' ' +
        variantStyles +
        ' ' +
        borderStyles +
        ' ' +
        className
      }
      onClick={clickHandler}
      data-post-id={dataPostId ?? null}
    >
      {icon && <div className="pointer-events-none">{icon}</div>}
      {children}
    </button>
  )
}
