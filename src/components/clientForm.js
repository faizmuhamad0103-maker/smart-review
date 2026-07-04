import Swal from "sweetalert2";

import { addClient } from "../services/clientServices";
import { generateClientId,
         generateShortUrl,
        } from "../utils/generateId";

export function renderClientForm(onSuccess) {
  document.querySelector("#form-container").innerHTML = `
    <form id="client-form">

      <input
        id="businessName"
        type="text"
        placeholder="Nama Bisnis"
      />

      <input
        id="reviewUrl"
        type="text"
        placeholder="Google Review URL"
      />

      <button type="submit">
        Simpan Client
      </button>

    </form>
  `;

  document
    .querySelector("#client-form")
    .addEventListener("submit", async (e) => {

      e.preventDefault();

      const businessName = document
        .querySelector("#businessName")
        .value
        .trim();

      const reviewUrl = document
        .querySelector("#reviewUrl")
        .value
        .trim();

      if (!businessName || !reviewUrl) {

        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Semua field wajib diisi.",
        });

        return;
      }

        const id =  generateClientId();

        const client = {
             id,
             businessName,
             reviewUrl,
             shortUrl: generateShortUrl(id),
        };

      const result = await addClient(client);

      if (result.success) {

        Swal.fire({

          icon: "success",

          title: "Berhasil",

          text: "Client berhasil ditambahkan.",

          timer: 1500,

          showConfirmButton: false,

        });

        document.querySelector("#client-form").reset();

        onSuccess();

      } else {

        Swal.fire({

          icon: "error",

          title: "Gagal",

          text: result.message,

        });

      }

    });

}