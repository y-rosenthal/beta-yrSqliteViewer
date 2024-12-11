/*
import { getEditor } from './yrSqliteViewer-sql-interface.js';
*/

import { getEditor } from './editor.js';

// Functions for handling font size adjustments and resizing

function adjustFontSize(elementId, delta) {
    console.log("starting: function adjustFontSize(elementId, delta)");
    let element;
    
    if (elementId.startsWith('query_interface_')) {
        // For SQL interfaces, find the specific interface container
        const queryId = elementId.replace('query_interface_', '');
        element = document.querySelector(`#sqlQuery${queryId}`).closest('.yrQueryInterface');
        
        if (!element) return;
        
        const currentSize = parseFloat(element.getAttribute("data-base-font")) || 1;
        const newSize = Math.max(0.5, Math.min(3, currentSize + delta));
        element.setAttribute("data-base-font", newSize);
        element.style.fontSize = `${newSize}em`;

        // Also adjust the CodeMirror instance
        const editor = getEditor(queryId);
        if (editor) {
            const wrapper = editor.getWrapperElement();
            wrapper.style.fontSize = `${newSize}em`;
            editor.refresh();
        }
        return;
    } else if (elementId.endsWith('_card')) {
        // For table cards, find the specific card
        const tableName = elementId.replace('_card', '');
        element = Array.from(document.getElementsByClassName('yrTableCard'))
            .find(card => card.querySelector('.yrTableName').textContent === `Table: ${tableName}`);
    }

    if (!element) return;

    const currentSize = parseFloat(element.getAttribute("data-base-font")) || 1;
    const newSize = Math.max(0.5, Math.min(3, currentSize + delta));
    element.setAttribute("data-base-font", newSize);
    element.style.fontSize = `${newSize}em`;
}

function adjustAllTablesFontSize(delta) {
    console.log("starting: function adjustAllTablesFontSize(delta)");
    const tableCards = document.getElementsByClassName("yrTableCard");
    // Find the font size input control
    const fontInput = document.querySelector('.yrFlexContainer .yrFontInput');
    let currentSize = parseFloat(fontInput.value) || 1;
    let newSize = Math.max(0.5, Math.min(3, currentSize + delta));
    
    // Update the input value
    fontInput.value = newSize.toFixed(1);
    
    Array.from(tableCards).forEach(card => {
        card.setAttribute("data-base-font", newSize);
        card.style.fontSize = `${newSize}em`;
    });
}

function setAllTablesFontSize(size) {
    console.log("starting: function setAllTablesFontSize(size)");
    const tableCards = document.getElementsByClassName("yrTableCard");
    const newSize = Math.max(0.5, Math.min(3, parseFloat(size)));
    Array.from(tableCards).forEach(card => {
        card.setAttribute("data-base-font", newSize);
        card.style.fontSize = `${newSize}em`;
    });
}

function adjustAllQueryInterfacesFontSize(delta) {
    console.log("starting: function adjustAllQueryInterfacesFontSize(delta)");
    const queryInterfaces = document.getElementsByClassName("yrQueryInterface");
    // Find the font size input control
    const fontInput = document.querySelector('#sqlCommandsHeader + .yrFontControl .yrFontInput');
    let currentSize = parseFloat(fontInput.value) || 1;
    let newSize = Math.max(0.5, Math.min(3, currentSize + delta));
    
    // Update the input value
    fontInput.value = newSize.toFixed(1);
    
    Array.from(queryInterfaces).forEach(queryInterface => {
        queryInterface.setAttribute("data-base-font", newSize);
        queryInterface.style.fontSize = `${newSize}em`;
    });
}

function setAllQueryInterfacesFontSize(size) {
    console.log("starting: function setAllQueryInterfacesFontSize(size)");
    const queryInterfaces = document.getElementsByClassName("yrQueryInterface");
    const newSize = Math.max(0.5, Math.min(3, parseFloat(size)));
    Array.from(queryInterfaces).forEach(queryInterface => {
        queryInterface.setAttribute("data-base-font", newSize);
        queryInterface.style.fontSize = `${newSize}em`;
    });
}

function autoResize(textarea) {
    console.log("starting: autoResize(textarea)");
    const EXTRA_SPACE = 50; // Extra pixels to add for width
    const WIDTH_THRESHOLD = 30; // Minimum change in width before adjusting
    const MIN_WIDTH = 100;
    const MAX_WIDTH = Math.min(800, window.innerWidth - 40);

    // Create hidden div for measurement if it doesn't exist
    let helper = document.getElementById("textarea-helper");
    if (!helper) {
        helper = document.createElement("div");
        helper.id = "textarea-helper";
        helper.style.position = "absolute";
        helper.style.visibility = "hidden";
        helper.style.whiteSpace = "pre";
        document.body.appendChild(helper);
    }

    // Copy relevant styles
    const styles = window.getComputedStyle(textarea);
    helper.style.fontSize = styles.fontSize;
    helper.style.fontFamily = styles.fontFamily;
    helper.style.padding = styles.padding;
    helper.style.border = styles.border;

    // Measure content
    helper.textContent = textarea.value;
    const newWidth = helper.offsetWidth + EXTRA_SPACE;
    const currentWidth = parseInt(textarea.style.width) || textarea.offsetWidth;

    // Only adjust width if change is significant
    if (Math.abs(newWidth - currentWidth) > WIDTH_THRESHOLD) {
        textarea.style.width = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth)) + "px";
    }

    // Adjust height
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

// Export the functions to make them available to the main file
export {
    adjustFontSize,
    adjustAllTablesFontSize,
    setAllTablesFontSize,
    adjustAllQueryInterfacesFontSize,
    setAllQueryInterfacesFontSize,
    autoResize
}; 