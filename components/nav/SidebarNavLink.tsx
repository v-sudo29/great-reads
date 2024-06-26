import { ReactNode } from 'react'

interface SidebarNavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  icon: ReactNode
  className?: string
}

const SidebarNavLink = ({
  href,
  children,
  icon,
  className,
}: SidebarNavLinkProps) => {
  return (
    <a
      className={
        'flex items-center gap-4 h-[52px] px-3 text-primary font-montserrat text-[14px] font-medium rounded-[4px] hover:bg-[#F0F4F6] hover:font-semibold xl:text-[18px] xl:h-[56px]' +
        ' ' +
        className
      }
      href={href}
    >
      <div className="flex justify-center items-center w-6 h-6">{icon}</div>
      {children}
    </a>
  )
}

export default SidebarNavLink
