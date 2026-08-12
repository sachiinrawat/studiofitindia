/* ── Payment method trust badges ─────────────────────────────────────────── */

const PaymentBadges = ({ className = "" }) => (
  <div
    className={`flex flex-col items-center gap-1.5 ${className}`}
    aria-label="Accepted payment methods: UPI, VISA, Mastercard, RuPay"
  >
    {/* Icon row */}
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center justify-center h-7 px-2.5 bg-white border border-gray-200 rounded-md shadow-sm">
        <img
          src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1786532866/8080a60f-a36e-4229-b945-2f5e5cffe07b.png"
          alt="UPI"
          className="h-3.5 w-auto object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-center h-7 px-2.5 bg-white border border-gray-200 rounded-md shadow-sm">
        <img
          src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1786532858/728206b2-d85f-47a6-88c7-e3b4c5c0c8e2.png"
          alt="VISA"
          className="h-3.5 w-auto object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-center h-7 px-2 bg-white border border-gray-200 rounded-md shadow-sm">
        <img
          src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1786532834/8bcb9622-1f5d-49c3-bb13-8579da873d2e.png"
          alt="Mastercard"
          className="h-[18px] w-auto object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-center h-7 px-2.5 bg-white border border-gray-200 rounded-md shadow-sm">
        <img
          src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1786532819/0af4d44a-9b59-4c32-a7e9-300df5e29ac7.png"
          alt="RuPay"
          className="h-3.5 w-auto object-contain"
          loading="lazy"
        />
      </div>
    </div>

    {/* Text row */}
    <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 mt-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      <span className="font-semibold text-gray-500">Secure</span>
      <span className="text-gray-300">·</span>
      <span>UPI</span>
      <span className="text-gray-300">·</span>
      <span>Cards</span>
      <span className="text-gray-300">·</span>
      <span>Wallets</span>
    </div>
  </div>
);

export default PaymentBadges;
