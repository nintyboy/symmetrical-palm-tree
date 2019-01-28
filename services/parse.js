/*-------------------
GLOBALS
-------------------*/
const read = require('node-readability');
const cheerio = require('cheerio');
const URL = require('url');
const axios = require('axios');
const isUrl = require('is-url');



/* Metatag Scraper */

const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-description')(),
	require('metascraper-image')(),
	// require('metascraper-logo')(),
	require('metascraper-clearbit-logo')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')(),
	require('metascraper-lang-detector')(),
	require('metascraper-video')()
])

/* Natural Language Processing */
const Tokenizer = require('sentence-tokenizer');
const nlp = require('compromise');



/*-------------------
MODULES
-------------------*/

module.exports = {
	getDataV2: async (url) => {
			console.time('Data_V2');
			var promise = new Promise(function(resolve, reject) {
				if (isUrl(url)) {

				} else {
					throw ("Not a Valid URL")
				}

				try {
					console.log("Valid URL");
					axios.get(url)
						.then(function(response) {
							const data = read(response.data, (err, article, meta) => {
								console.log(article.document);
							})
							console.timeEnd('Data_V2');
							resolve(article.textBody)

						})
						.catch(function(error) {
							console.log("AXIOS ERROR:", error);
							console.timeEnd('Data_V2');
						})
				} catch (e) {
					console.log("Invalid URL");
					console.timeEnd('Data_V2');
					reject();
				}
				return promise;

			});




		},
		getData: async (url) => {
			console.log("data!")
			console.time('getData');
			var promise = new Promise((resolve, reject) => {

				const data = read(url, (err, article, meta) => {
					const getDomain = URL.parse(url, true);
					let metadata;
					let content;
					(async () => {
						const html = article.html;


						try {
							// console.log(await metascraper({ html, url }));
							metadata = await metascraper({
								html,
								url
							});
						} catch (err) {
							console.log("error : " + err);
						} finally {
							console.log("Article content: \n");
							console.log(article.content);


							const $ = cheerio.load(article.content);

							let paraArray = []
							let contentArray = [];
							let counter = 0;
							var tokenizer = new Tokenizer('Chuck');

							// Change this for a for loop in the future
							var changed;
							$('p').each((i, elem) => {
								tokenizer.setEntry($(elem).text());
								let scentences = tokenizer.getSentences();
								changed = nlp(scentences).values().out('array');
								console.log(changed);
								contentArray.push($(elem).text());
								paraArray.push({
									scentences,
									"para_count": $(elem).text().length
								});

							});




							content = {
								'url': url,
								'title': article.title,
								'author': metadata.author || "No Author",
								'lead_image_url': metadata.image,
								'content': contentArray,
								'paragraphs': paraArray, //contentArray,//Simple HTML Strip
								'language': metadata.lang,
								'domain': getDomain.hostname,
								'publisher': metadata.publisher,
								'logo': metadata.logo,
								'word_count': article.content.match(/\S+/g).length,
								'char_count': article.content.length,
								'todayVisits': 0,
								'totalVisits': 0,
								'URI': ''
							}
							// console.log(content);
							console.log("done");
							console.timeEnd('getData');
							resolve(content);
						}
					})()
					// article.close();


				});
			});

			return promise;
		}
}