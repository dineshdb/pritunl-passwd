import passwordInput from "@inquirer/password";
import { totp } from "@maks11060/otp";
import { Entry } from "@napi-rs/keyring";
import { decodeBase32 } from "jsr:@std/encoding@^0.224.0/base32";
/**
 * given a password and totp-secret, generate a password to be used in pritunl-client
 */
export async function generatePritnulPassword(
  password: string,
  totpKey: string,
): Promise<string> {
  const totpCode = await totp({ secret: decodeBase32(totpKey!) });
  return `${password}${totpCode}`;
}

export async function getPassword(
  name: string,
  description: string,
): Promise<string> {
  const entry = new Entry("pritunl-password-generator", name);
  let password = entry.getPassword();
  if (!entry.getPassword()) {
    password = await passwordInput({ message: description });
    if (!password) {
      const error = `'${description}' is required.`;
      console.error(`'${description}' is required.`);
      throw new Error(error);
    }
    entry.setPassword(password);
  }
  return password!;
}

if (import.meta.main) {
  import("./main.ts").then((main) => main.default());
}
