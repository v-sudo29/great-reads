const ShareIcon = () => {
  return (
    <>
      {/* MOBILE */}
      <svg
        className="xl:hidden"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 6V10C2 10.2652 2.10536 10.5196 2.29289 10.7071C2.48043 10.8946 2.73478 11 3 11H9C9.26522 11 9.51957 10.8946 9.70711 10.7071C9.89464 10.5196 10 10.2652 10 10V6"
          stroke="#53675D"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 3L6 1L4 3"
          stroke="#53675D"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 1V7.5"
          stroke="#53675D"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      {/* DESKTOP */}
      <svg
        className="hidden xl:block"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.33203 10V16.6667C3.33203 17.1087 3.50763 17.5326 3.82019 17.8452C4.13275 18.1577 4.55667 18.3333 4.9987 18.3333H14.9987C15.4407 18.3333 15.8646 18.1577 16.1772 17.8452C16.4898 17.5326 16.6654 17.1087 16.6654 16.6667V10"
          stroke="#53675D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.3346 4.99935L10.0013 1.66602L6.66797 4.99935"
          stroke="#53675D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 1.66602V12.4993"
          stroke="#53675D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  )
}

export default ShareIcon
