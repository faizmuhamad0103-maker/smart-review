import Swal from "sweetalert2";

import { addClient } from "../services/clientServices";

import {
  generateClientId,
  generateShortUrl,
} from "../utils/generateId";

import { normalizeWhatsAppNumber } from "../utils/whatsapp";


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

      <input
        id="whatsapp"
        type="tel"
        placeholder="Nomor WhatsApp"
      />

      <select id="templateCategory">

        <option value="">
          Pilih Template Chat
        </option>

        <option value="cafe">
          Cafe
        </option>

        <option value="restaurant">
          Restaurant
        </option>

        <option value="barbershop">
          Barbershop / Salon
        </option>

        <option value="hotel">
          Hotel
        </option>

        <option value="other">
          Bisnis Lainnya
        </option>

      </select>

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


      const whatsapp = document
        .querySelector("#whatsapp")
        .value
        .trim();


      const templateCategory = document
        .querySelector("#templateCategory")
        .value;


      if (
        !businessName ||
        !reviewUrl ||
        !whatsapp ||
        !templateCategory
      ) {

        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Semua field wajib diisi.",
        });

        return;
      }


      let normalizedWhatsapp;

      try {

        normalizedWhatsapp =
          normalizeWhatsAppNumber(whatsapp);

      } catch (error) {

        Swal.fire({
          icon: "warning",
          title: "Nomor WhatsApp tidak valid",
          text: error.message,
        });

        return;
      }


      // Generate ID unik untuk setiap card
      const cardId = generateClientId();

      // URL yang akan digunakan oleh QR dan NFC
      const shortUrl = generateShortUrl(cardId);


      const client = {

        id: cardId,

        cardId,

        businessName,

        reviewUrl,

        whatsapp: normalizedWhatsapp,

        templateCategory,

        shortUrl,

      };


      const result = await addClient(client);


      if (result.success) {

        Swal.fire({

          icon: "success",

          title: "Card berhasil dibuat",

          html: `
            <p>
              <strong>${businessName}</strong>
            </p>

            <p>
              Card ID:
              <strong>${cardId}</strong>
            </p>

            <p>
              URL:
              <br>
              ${shortUrl}
            </p>
          `,

          timer: 2500,

          showConfirmButton: false,

        });


        document
          .querySelector("#client-form")
          .reset();


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