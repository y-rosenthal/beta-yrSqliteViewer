// Store CodeMirror editor instances
let editors = {};

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
    const container = document.getElementById("queryInterfaces");
    const newInterface = document.createElement("div");
    newInterface.innerHTML = createSqlInterfaceHTML(interfaceId);
    container.appendChild(newInterface);
    return initializeCodeMirror(`sqlQuery${interfaceId}`);
}

// Get editor instance
function getEditor(interfaceId) {
    return editors[`sqlQuery${interfaceId}`];
}

// Clear all SQL interfaces
function clearAllInterfaces() {
    document.getElementById("queryInterfaces").innerHTML = "";
    editors = {};
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

export {
    initializeCodeMirror,
    createSqlInterfaceHTML,
    addSqlInterface,
    getEditor,
    clearAllInterfaces,
    createTableCardHTML,
    addTableCard
}; 