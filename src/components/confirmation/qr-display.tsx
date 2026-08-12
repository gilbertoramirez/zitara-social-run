"use client";

import Image from "next/image";

export default function QrDisplay({ qrDataUrl }: { qrDataUrl: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-semibold text-zitara-navy mb-4">
        Tu código QR de acceso
      </p>
      <div className="inline-block bg-white p-4 rounded-xl border-2 border-gray-100">
        <Image
          src={qrDataUrl}
          alt="Código QR de acceso al evento"
          width={250}
          height={250}
          unoptimized
        />
      </div>
      <p className="text-xs text-zitara-gray mt-4">
        Presenta este código el día del evento para hacer check-in
      </p>
    </div>
  );
}
