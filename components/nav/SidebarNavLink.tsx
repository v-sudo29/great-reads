import { ReactNode } from "react"

interface SidebarNavLinkProps {
  href: string
  children: ReactNode
  icon: ReactNode
}

const SidebarNavLink = ({
  href,
  children,
  icon
} : SidebarNavLinkProps) => {
  return (
    <a
      className='flex items-center gap-4 h-[52px] px-3 text-primary font-montserrat text-[14px] font-medium rounded-[4px] hover:bg-[#F0F4F6] hover:font-semibold xl:text-[18px] xl:h-[56px]'
      href={href}
    >
      <div className='w-6 h-6'>
        {icon}
      </div>
      {children}
    </a>
  )
}

export default SidebarNavLink