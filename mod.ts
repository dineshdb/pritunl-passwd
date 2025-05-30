import passwordInput from "@inquirer/password";
import { totp } from "@maks11060/otp";
import { Entry } from "@napi-rs/keyring";
import { decodeBase32 } from "@std/encoding/base32";
/**
 * given a password and totp-secret, generate a password to be used in pritunl-client
 */
export async function generatePritnulPassword(
  password: string,
  totpKey: string,
): Promise<string> {
  const totpCode = await totp({ secret: decodeBase32(totpKey!).buffer });
  return `${password}${totpCode}`;
}

/**
 * Get password from keyring or prompt user to enter password
 * @param name
 * @param description
 */
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
