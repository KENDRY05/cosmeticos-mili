
function WhatsAppFlotante() {
  const numeroWhatsApp = "50558427509";

  const mensaje = "Hola, me interesa conocer más sobre sus productos. ¿Me pueden ayudar?";

  const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={enlaceWhatsApp}
      className="whatsapp-flotante"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a COSMETICOS Y ACCESORIOS MILY por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.04 2a9.85 9.85 0 0 0-8.48 14.87L2 22l5.29-1.39A9.9 9.9 0 1 0 12.04 2Zm0 17.98a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.14.83.84-3.06-.2-.31a8.1 8.1 0 1 1 6.93 3.85Zm4.45-6.07c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}

export default WhatsAppFlotante;
