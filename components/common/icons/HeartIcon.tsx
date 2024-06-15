const HeartIcon = () => {
  return (
    <>
      {/* Mobile */}
      <svg className='xl:hidden' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.2 7.22222C11.094 6.33 12 5.26056 12 3.86111C12 2.96969 11.6523 2.11478 11.0335 1.48445C10.4146 0.854116 9.57521 0.5 8.7 0.5C7.95724 0.5 7.36883 0.651169 6.77193 1.05983C6.31029 1.37589 5.68971 1.37589 5.22807 1.05984C4.63117 0.651169 4.04276 0.5 3.3 0.5C2.42479 0.5 1.58542 0.854116 0.966548 1.48445C0.347678 2.11478 0 2.96969 0 3.86111C0 5.26667 0.9 6.33611 1.8 7.22222L5.28644 10.7732C5.67839 11.1724 6.32161 11.1724 6.71356 10.7732L10.2 7.22222Z" fill="#53675D"/>
      </svg>

      {/* Desktop */}
      <svg className='hidden xl:block' width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 12C19.49 10.54 21 8.79 21 6.5C21 5.04131 20.4205 3.64236 19.3891 2.61091C18.3576 1.57946 16.9587 1 15.5 1C14.036 1 12.9318 1.34595 11.7385 2.32563C11.3116 2.67607 10.6884 2.67607 10.2615 2.32563C9.06818 1.34595 7.96398 1 6.5 1C5.04131 1 3.64236 1.57946 2.61091 2.61091C1.57946 3.64236 1 5.04131 1 6.5C1 8.8 2.5 10.55 4 12L10.2929 18.2929C10.6834 18.6834 11.3166 18.6834 11.7071 18.2929L18 12Z" stroke="#53675D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </>
  )
}

export default HeartIcon