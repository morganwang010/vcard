import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import vcard from 'vcards-js';

const VCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerateQrCode = () => {
    const vcardData = vcard.generate({
      name: name,
      email: email,
      phone: phone,
    });
    const qrcode = new QRCode();
    qrcode.toDataURL(vcardData, { errorCorrectionLevel: 'H' })
      .then((data) => setQrCode(data));
  };

  const handleDownloadQrCode = () => {
    const filename = 'vcard-qrcode.png';
    const fileType = 'image/png';
    const file = new File([qrCode], filename, { type: fileType });
    saveAs(file);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
      />
      <button onClick={handleGenerateQrCode}>Generate QR Code</button>
      {qrCode && (
        <div>
          <img src={qrCode} alt="VCard QR Code" />
          <button onClick={handleDownloadQrCode}>Download QR Code</button>
        </div>
      )}
    </div>
  );
};

export default VCard;