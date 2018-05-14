require('../module.js');
require('./index.css');

function component() {
    var element = document.createElement('div');

    console.log('hello index');
    element.classList.add('index');
    return element;
}

document.body.appendChild(component());