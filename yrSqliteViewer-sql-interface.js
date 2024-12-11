import { initializeCodeMirror, clearEditors, getEditor } from './editor.js';
/*
// Store CodeMirror editor instances
let editors = {};
*/

let lastInterfaceId = 0;
let isRestoringSession = false;

/*
// Initialize a new SQL interface with CodeMirror
function initializeCodeMirror(elementId) {
    const editor = CodeMirror(document.getElementById(elementId), {
        mode: "text/x-sql",
        theme: "eclipse",
        lineNumbers: true,
        lineWrapping: true,
        viewportMargin: Infinity,
        placeholder: "Enter SQL query here...",
        extraKeys: {
            "Ctrl-Enter": function (cm) {
                const id = elementId.replace("sqlQuery", "");
                window.runQuery(id);
            },
            "Cmd-Enter": function (cm) {
                const id = elementId.replace("sqlQuery", "");
                window.runQuery(id);
            },
        },
    });

    editors[elementId] = editor;
    return editor;
}
*/

// Create HTML for a new SQL interface
function createSqlInterfaceHTML(interfaceId) {
    return `
        <div class="yrQueryInterface" data-base-font="1">
            <div class="yrFlexContainer">
                <div class="yrFontControl">
                    <button onclick="adjustFontSize('query_interface_${interfaceId}', -0.1)" class="yrFontButton">A-</button>
                    <button onclick="adjustFontSize('query_interface_${interfaceId}', 0.1)" class="yrFontButton">A+</button>
                </div>
                <h3>SQL Command ${interfaceId}</h3>
            </div>
            <div id="sqlQuery${interfaceId}" class="yrQueryTextarea"></div>
            <br />
            <button onclick="runQuery(${interfaceId})" class="yrButton yrGreyButton">Run Query</button>
            <div id="output${interfaceId}" class="yrOutputContainer"></div>
        </div>
    `;
}

// Add a new SQL interface to the DOM
function addSqlInterface(interfaceId) {
    lastInterfaceId = Math.max(lastInterfaceId, interfaceId);
    
    const existingInterface = document.querySelector(`#sqlQuery${interfaceId}`);
    if (existingInterface) {
        const editor = getEditor(interfaceId);
        if (editor) return editor;
    }

    const container = document.getElementById("queryInterfaces");
    if (!container) return null;
    
    const newInterface = document.createElement("div");
    newInterface.innerHTML = createSqlInterfaceHTML(interfaceId);
    container.appendChild(newInterface);
    
    return initializeCodeMirror(`sqlQuery${interfaceId}`);
}

function ensureOneBlankInterface() {
    const container = document.getElementById("queryInterfaces");
    if (!container) return;
    
    let foundBlank = false;
    let maxId = 0;
    
    // First check all interfaces and find max ID
    const interfaces = container.querySelectorAll('.yrQueryInterface');
    interfaces.forEach(interfaceElement => {
        const textareaElement = interfaceElement.querySelector('.yrQueryTextarea');
        if (!textareaElement) return;
        
        const id = parseInt(textareaElement.id.replace('sqlQuery', ''));
        maxId = Math.max(maxId, id);
        
        /*
        const editor = editors[`sqlQuery${id}`];
        */
        const editor = getEditor(id);

        if (editor && editor.getValue().trim() === '') {
            if (foundBlank) {
                // Remove any extra blank interfaces
                interfaceElement.remove();
                //delete editors[`sqlQuery${id}`];
                deleteEditor(`sqlQuery${id}`);
            } else {
                foundBlank = true;
            }
        }
    });
    
    // Update lastInterfaceId to match the highest used ID
    lastInterfaceId = maxId;
    
    // If no blank interface exists, add one at the end
    if (!foundBlank) {
        const nextId = lastInterfaceId + 1;
        const newInterface = document.createElement("div");
        newInterface.innerHTML = createSqlInterfaceHTML(nextId);
        container.appendChild(newInterface);
        initializeCodeMirror(`sqlQuery${nextId}`);
        lastInterfaceId = nextId;
    }
}

/*
// Get editor instance
function getEditor(interfaceId) {
    return editors[`sqlQuery${interfaceId}`];
}
*/
// Clear all SQL interfaces
function clearAllInterfaces() {
    document.getElementById("queryInterfaces").innerHTML = "";
    //editors = {};
    clearEditors();
    lastInterfaceId = 0;
}

// Add this new function
function createTableCardHTML(tableName, columns) {
    return `
        <div class="yrFlexContainer">
            <div class="yrFontControl">
                <button onclick="adjustFontSize('${tableName}_card', -0.1)" class="yrFontButton">A-</button>
                <button onclick="adjustFontSize('${tableName}_card', 0.1)" class="yrFontButton">A+</button>
            </div>
            <div class="yrTableName">Table: ${tableName}</div>
        </div>
        <div class="yrTableButtons">
            <button 
                onclick="showTableStructure('${tableName}', ${JSON.stringify(columns).replace(/"/g, "&quot;")})"
                class="yrButton yrGreyButton"
            >Show Structure</button>
            <button 
                onclick="showTableData('${tableName}')"
                class="yrButton yrGreyButton"
            >Show Rows</button>
        </div>
        <div id="${tableName}_info" class="yrTableInfo"></div>
    `;
}

// Add this new function
function addTableCard(tableName, columns) {
    const tableCard = document.createElement("div");
    tableCard.className = "yrTableCard";
    tableCard.setAttribute("data-base-font", "1");
    tableCard.innerHTML = createTableCardHTML(tableName, columns);
    document.getElementById("tableList").appendChild(tableCard);
    return tableCard;
}

// Add these session management functions
function beginSessionRestore() {
    isRestoringSession = true;
}

function endSessionRestore() {
    isRestoringSession = false;
    // Ensure one blank interface after all restoration is complete
    try {
        ensureOneBlankInterface();
    } catch (e) {
        console.warn('Error ensuring blank interface after session restore:', e);
    }
}

// Add these functions to manage lastInterfaceId
function resetLastInterfaceId() {
    lastInterfaceId = 0;
}

function getLastInterfaceId() {
    return lastInterfaceId;
}

/*
export {
    initializeCodeMirror,
    createSqlInterfaceHTML,
    addSqlInterface,
    getEditor,
    clearAllInterfaces,
    createTableCardHTML,
    addTableCard,
    beginSessionRestore,
    endSessionRestore,
    ensureOneBlankInterface,
    resetLastInterfaceId,
    getLastInterfaceId
}; 
*/

export {
    createSqlInterfaceHTML,
    addSqlInterface,
    clearAllInterfaces,
    createTableCardHTML,
    addTableCard,
    beginSessionRestore,
    endSessionRestore,
    ensureOneBlankInterface,
    resetLastInterfaceId,
    getLastInterfaceId
}; 
