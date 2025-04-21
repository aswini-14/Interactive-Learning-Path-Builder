import React from 'react';
import { downloadCertificate } from '../../api/certificates';

export default function CertificateGenerator({ pathId }) {
  const generateCertificate = async () => {
    console.log('Generate Certificate Clicked');
    try {
      const response = await downloadCertificate(pathId);

      // Handle the PDF response and download it
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate_${pathId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Certificate generation failed:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Failed to generate certificate');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={generateCertificate}>Download Certificate</button>
    </div>
  );
}
