interface OverlayProps {
  isOpen: boolean
  handleClose : () => void
}

const Overlay = ({
  isOpen,
  handleClose
} : OverlayProps) => {
  const overlayActiveStyles = isOpen ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'

  return (
    <div
      className={overlayActiveStyles + ' ' + 'absolute w-full top-0 min-h-screen bg-black transition-opacity'}
      onClick={handleClose}
    >
    </div>
  )
}

export default Overlay