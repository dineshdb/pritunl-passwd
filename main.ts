import { getPritnulPassword } from "./mod.ts";

export default async function main() {
	const totpKey = Deno.env.get("PRITUNL_TOTP_KEY");
	const password = Deno.env.get("PRITUNL_PASSWORD");

	if (!totpKey) {
		console.error("PRITUNL_TOTP_KEY is required");
		return;
	}

	if (!password) {
		console.error("PRITUNL_PASSWORD is required.");
		return;
	}

	console.log(await getPritnulPassword(password, totpKey));
}

if (import.meta.main) {
	main();
}
