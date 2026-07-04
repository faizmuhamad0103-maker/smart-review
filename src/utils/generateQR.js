import QRCode from "qrcode";

export async function downloadQR(url, filename) {
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: 500,
      margin: 2,
    });

    const a = document.createElement("a");

    a.href = dataUrl;

    a.download = `${filename}.png`;

    a.click();

  } catch (err) {

    console.error(err);

  }
}