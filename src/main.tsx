import React from 'react';
import ReactDOM from 'react-dom';
import * as ui from './views';

window.addEventListener('DOMContentLoaded', () => {
    const domNode = document.getElementById('content');

    ReactDOM.render(<ui.Page />, domNode);
});

