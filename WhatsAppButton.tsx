const WHATSAPP_NUMBER = '919622987445';
const WHATSAPP_MESSAGE = 'Hi, I want to connect';

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] inline-flex h-14 w-14 sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 ring-1 ring-black/5 transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden
        className="h-7 w-7 sm:h-8 sm:w-8"
        fill="currentColor"
      >
        <path d="M16.001 3C8.82 3 3 8.82 3 16c0 2.292.602 4.443 1.654 6.31L3 29l6.876-1.626A12.95 12.95 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16.001 3Zm0 23.667a10.66 10.66 0 0 1-5.43-1.486l-.39-.232-4.083.964.971-3.974-.254-.41A10.642 10.642 0 0 1 5.333 16c0-5.886 4.782-10.667 10.668-10.667S26.667 10.114 26.667 16 21.886 26.667 16 26.667Zm5.853-7.99c-.32-.16-1.894-.935-2.188-1.042-.293-.107-.506-.16-.72.16-.213.32-.826 1.041-1.013 1.255-.187.214-.373.24-.693.08-.32-.16-1.353-.499-2.578-1.59-.953-.85-1.597-1.9-1.784-2.22-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.523-.539-.72-.549l-.613-.011a1.18 1.18 0 0 0-.853.4c-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.094 1.306 3.307.16.213 2.255 3.444 5.466 4.83.764.33 1.36.527 1.825.674.766.244 1.464.21 2.016.127.615-.092 1.894-.774 2.16-1.521.267-.747.267-1.387.187-1.522-.08-.134-.293-.214-.613-.374Z" />
      </svg>
    </a>
  );
}
