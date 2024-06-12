interface OverlayProps {
  isOpen: boolean
  handleClose : () => void
  className?: string
}

const Overlay = ({
  isOpen,
  handleClose,
  className
} : OverlayProps) => {
  const overlayActiveStyles = isOpen ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'

  return (
    <div
      className={overlayActiveStyles + ' ' + 'top-0 left-0 z-10 fixed w-full h-screen bg-black transition-opacity' + ' ' + className}
      onClick={handleClose}
    >
    </div>
  )
}

export default Overlay