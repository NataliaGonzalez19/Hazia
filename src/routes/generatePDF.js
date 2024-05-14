const PDFDocument = require('pdfkit');
const fs = require('fs');
// 9 Commit archivo pdf 
function generatePDF() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filename = 'example.pdf';
    const fileStream = fs.createWriteStream(filename);

    // Define el contenido del PDF
    doc.text('Hola, este es un archivo PDF generado en Node.js con pdfkit.');

    // Finaliza y guarda el PDF
    doc.pipe(fileStream);
    doc.end();

    fileStream.on('finish', () => {
      resolve(filename); // Resuelve la promesa con el nombre del archivo
    });

    fileStream.on('error', (error) => {
      reject(error); // Rechaza la promesa si hay un error
    });
  });
}

module.exports = generatePDF;