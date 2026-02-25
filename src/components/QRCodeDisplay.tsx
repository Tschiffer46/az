'use client';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  label?: string;
  primaryColor?: string;
}

export default function QRCodeDisplay({ value, size = 160, label, primaryColor = '#1a3a6b' }: QRCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
        <QRCodeSVG
          value={value}
          size={size}
          fgColor={primaryColor}
          bgColor="#ffffff"
          level="M"
        />
      </div>
      {label && (
        <p className="text-xs text-gray-500 text-center max-w-[160px] leading-tight">{label}</p>
      )}
    </div>
  );
}
