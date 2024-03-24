const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.$$eval('#container table tbody tr', rows => {
    return rows.map(row => {
      const cells = Array.from(row.querySelectorAll('td'));
      return cells.map(cell => cell.innerText);
    });
  });

  console.log(data);

  const  html = `
    <html>
      <head>
        <title>Fiyatlandırma</title>
        <style>
       
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>Cinsi</th>
              <th>Birim</th>
              <th>Asgari (₺)</th>
              <th>Azami (₺)</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody id="Fiyatlandırma">
            ${data.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        <script src="scraperr.js"></script>
      </body>
    </html>
  `;

  fs.writeFileSync('fiyat.html', html);

  await browser.close();
}

scrapeProduct('https://www.ankara.bel.tr/hal-fiyatlari');
