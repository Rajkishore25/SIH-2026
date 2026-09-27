type PdfInput = {
  workcellId: string;
  taskName: string;
  asset: string;
  purpose: string;
  classification: string;
  documents: string[];
  workflow: string[];
  reviewer: string;
};

function pdfEscape(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrap(value: string, width = 92) {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (!current) current = word;
    else if (`${current} ${word}`.length <= width) current += ` ${word}`;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function makePdf(input: PdfInput) {
  const lines = [
    'MRPL CONFIDENTIAL INDUSTRIAL WORKCELL',
    'VERIFIED WORK PACKAGE · SYNTHETIC PROTOTYPE DATA',
    '',
    `Workcell: ${input.workcellId}`,
    `Task: ${input.taskName}`,
    `Asset / project: ${input.asset}`,
    `Classification: ${input.classification}`,
    `Purpose: ${input.purpose}`,
    '',
    'REQUIRED EVIDENCE',
    ...input.documents.map((document) => `- ${document}`),
    '',
    'BOUNDED WORKFLOW',
    ...input.workflow.map((step, index) => `${index + 1}. ${step}`),
    '',
    'RESULT',
    'The task was executed within the declared Workcell scope.',
    'Evidence was admitted before local analysis. High-risk findings require human review.',
    'The result was verified against the available evidence before release.',
    '',
    'DEMO FINDING',
    'Vendor A satisfies the required discharge specification.',
    'Vendor B does not satisfy the required discharge specification.',
    '',
    `Human reviewer: ${input.reviewer}`,
    'Approval status: Approved',
    'Verification status: Verified against available evidence',
    'Release status: Ready for controlled release',
    '',
    'This prototype uses deterministic local responses and makes no external AI API calls.',
  ].flatMap((line) => line ? wrap(line) : ['']);

  const content = [
    'BT',
    '/F1 10 Tf',
    '48 760 Td',
    ...lines.flatMap((line) => [`(${pdfEscape(line)}) Tj`, '0 -14 Td']),
    'ET',
  ].join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets[index + 1] = pdf.length;
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, '0')} 00000 n \n`; });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

export function downloadWorkPackagePdf(input: PdfInput) {
  const blob = new Blob([makePdf(input)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${input.workcellId}-verified-work-package.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}