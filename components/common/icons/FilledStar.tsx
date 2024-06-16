const FilledStar = () => {
  return (
    <>
      {/* MOBILE */}
      <svg
        className="xl:hidden"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.15076 1.36588C6.54204 0.736561 7.45796 0.73656 7.84924 1.36587L9.46559 3.96555C9.60326 4.18697 9.82196 4.34586 10.0751 4.40837L13.047 5.14227C13.7664 5.31993 14.0495 6.19102 13.5719 6.75761L11.5989 9.0982C11.4309 9.29755 11.3473 9.55465 11.3661 9.8147L11.5865 12.868C11.6398 13.6071 10.8988 14.1454 10.2124 13.8663L7.37669 12.7132C7.13517 12.615 6.86484 12.615 6.62331 12.7132L3.78761 13.8663C3.10115 14.1454 2.36016 13.6071 2.41351 12.868L2.63391 9.8147C2.65268 9.55465 2.56914 9.29755 2.4011 9.0982L0.428144 6.75761C-0.0494583 6.19102 0.233575 5.31993 0.953 5.14227L3.92492 4.40837C4.17804 4.34586 4.39674 4.18697 4.53441 3.96555L6.15076 1.36588Z"
          fill="#FF8C05"
        />
      </svg>

      {/* DESKTOP */}
      <svg
        className="hidden xl:block"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.15077 1.36587C8.54204 0.736559 9.45796 0.73656 9.84924 1.36587L12.1357 5.04327C12.2733 5.26469 12.492 5.42358 12.7452 5.48609L16.9491 6.52424C17.6685 6.7019 17.9516 7.57298 17.474 8.13958L14.6831 11.4505C14.5151 11.6498 14.4315 11.9069 14.4503 12.167L14.7621 16.486C14.8154 17.2251 14.0744 17.7635 13.388 17.4843L9.37669 15.8532C9.13516 15.755 8.86483 15.755 8.62331 15.8532L4.61203 17.4843C3.92558 17.7635 3.18459 17.2251 3.23794 16.486L3.5497 12.167C3.56847 11.9069 3.48494 11.6498 3.3169 11.4505L0.52603 8.13958C0.0484277 7.57298 0.331462 6.7019 1.05089 6.52424L5.25484 5.48609C5.50797 5.42358 5.72667 5.26469 5.86434 5.04327L8.15077 1.36587Z"
          fill="#FF8C05"
        />
      </svg>
    </>
  );
};

export default FilledStar;
