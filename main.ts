import "@std/dotenv/load";
import { generatePritnulPassword, getPassword } from "./mod.ts";

export default async function main() {
  let password = Deno.env.get("PRITUNL_PASSWORD");
  let totpKey = Deno.env.get("PRITUNL_TOTP_SECRET");

  if (!password) {
    password = await getPassword("pritunlPassword", "Pritunl Password");
  }
  if (!totpKey) {
    totpKey = await getPassword("toptSecret", "TOTP Secret");
  }

  console.log(await generatePritnulPassword(password, totpKey));
}

if (import.meta.main) {
  main();
}
