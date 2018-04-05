const apiKey = '88cd081c4b774aedb70774b2f338b24e';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async event => {
  updateNews();
  await updateSources();
  sourceSelector.value = defaultSource;

  sourceSelector.addEventListener('change', event => {
    updateNews(event.target.value);
  })
})

async function updateSources() {
  const res = await fetch('https://newsapi.org/v2/sources?apiKey=88cd081c4b774aedb70774b2f338b24e');
  const json = await res.json();
  sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n')
}

async function updateNews(source = defaultSource) {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
  const json = await res.json();
  main.innerHTML = json.articles.map(createArticle).join('\n');
}
function createArticle(article) {
  return `
      <div class="article">
        <a href="${article.url}">
          <h2>${article.title}</h2>
          <img src="${article.urlToImage}">
          <p>${article.description}</p>
        </a>
      </div>
  `;
}
