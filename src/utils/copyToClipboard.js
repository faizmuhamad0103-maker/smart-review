import Swal from "sweetalert2";

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Link berhasil disalin.",
      timer: 1200,
      showConfirmButton: false,
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Tidak dapat menyalin link.",
    });

    console.error(error);
  }
}