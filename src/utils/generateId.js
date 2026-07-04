import { nanoid } from "nanoid";

export function generateClientId() {
  return nanoid(8);
}

export function generateShortUrl(id) {
  return `${window.location.origin}/r/${id}`;
}