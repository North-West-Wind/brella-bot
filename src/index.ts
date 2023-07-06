import { CronJob } from "cron";
import "dotenv/config";
import { Mastodon } from 'megalodon';

const BASE_URL = 'https://wetdry.world';
const client = new Mastodon(BASE_URL, process.env.TOKEN);

const job = new CronJob("* * */2 * * *", () => client.postStatus(generateToot(), {}).catch(console.error), null, true);

function generateToot() {
	var toot = '☂️';

	if (nextInt(3) < 1) {
		if (nextInt()) {
			toot += ".";
			if (nextInt()) {
				toot += "..";
				if (nextInt()) toot += "?";
			}
		}
	} else {
		var next = nextInt(3);
		if (!next) {
			next = nextInt(3);
			toot += "!";
			if (!next) {
				toot += "?";
				next = nextInt(3);
				if (next < 2) {
					toot += "?";
					if (!next && nextInt()) toot = toot.replace("!?", "⁉️");
				} else toot = toot.replace("!?", "⁉️");
			} else if (next < 2) {
				toot += "!";
				if (nextInt()) toot += "!";
			}
		} else if (next < 2) {
			toot += "?";
			if (nextInt()) {
				toot += "?";
				if (nextInt()) toot += "?";
			}
		} else {
			toot += " :";
			if (nextInt()) toot += ")";
			else toot += "D";
		}
	}

	return toot;
}

function nextInt(length = 2) {
	return Math.floor(Math.random() * length);
}