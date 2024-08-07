import { generatePritnulPassword, getPassword } from "./mod.ts";

export default async function main() {
  const password = await getPassword("pritunlPassword", "Pritunl Password");
  const totpKey = await getPassword("toptSecret", "TOTP Secret");
  console.log(await generatePritnulPassword(password, totpKey));
}

if (import.meta.main) {
  main();
}
