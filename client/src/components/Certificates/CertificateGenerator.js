import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CertificateGenerator({ userName, pathTitle }) {
  const download = async () => {
    const node = document.getElementById('certificate');
    const canvas = await html2canvas(node);
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    pdf.addImage(img, 'PNG', 20, 20);
    pdf.save(`${userName}_certificate.pdf`);
  };

  return (
    <div>
      <div id="certificate" style={{ padding: 20, textAlign: 'center', border: '1px solid #000' }}>
        <h1>Certificate of Completion</h1>
        <p>{userName} has completed <strong>{pathTitle}</strong></p>
      </div>
      <button onClick={download}>Download Certificate</button>
    </div>
  );
}
