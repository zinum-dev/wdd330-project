function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

async function injectTemplate(path, selector) {
    const template = await loadTemplate(path);
    const element = document.querySelector(selector);
    renderWithTemplate(template, element);
}

export async function commomHeaderFooter() {
    await injectTemplate("/wdd330-project/common/header.html", "#common-header");
    await injectTemplate("/wdd330-project/common/footer.html", "#common-footer");
    addStyle("style.css");
    addStyle("style-large.css");
    menuButton();
}

function menuButton() {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

function addStyle(style_file) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/wdd330-project/css/${style_file}`;
    document.head.appendChild(link);
}
