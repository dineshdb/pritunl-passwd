import { totp } from "@maks11060/otp";
import { decodeBase32 } from "jsr:@std/encoding@^0.224.0/base32";

export async function getPritnulPassword(password: string, totpKey: string): Promise<string> {
  const totpCode = await totp({ secret: decodeBase32(totpKey!) });
  return `${password}${totpCode}`;
}

if (import.meta.main) {
  import("./main.ts").then((main) => main.default());
}
