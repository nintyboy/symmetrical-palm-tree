/*-------------------
GLOBALS
-------------------*/
const read = require('node-readability');
const cheerio = require('cheerio');
const URL = require('url');


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
	getData: async (url) => {
		console.log("data!")
		// console.time('getData');


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
						// console.log(article.content);
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
							'author': metadata.author,
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

							// 'mp3_count' : contentArray.length

							// 'article': article


						}
						// console.log(content);
						console.log("done");
						resolve(content);
					}
				})()
				// article.close();
				// console.timeEnd('getData');

			});
		});

		return promise;
	}
}