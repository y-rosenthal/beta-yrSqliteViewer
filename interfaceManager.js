let lastInterfaceId = 0;

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


function addSqlInterface(interfaceId) {
    // ... existing code ...
}

function ensureOneBlankInterface() {
    // ... existing code ...
}

function clearAllInterfaces() {
    // ... existing code ...
}

function resetLastInterfaceId() {
    lastInterfaceId = 0;
}

function getLastInterfaceId() {
    return lastInterfaceId;
}

export {
    createSqlInterfaceHTML,
    addSqlInterface,
    ensureOneBlankInterface,
    clearAllInterfaces,
    resetLastInterfaceId,
    getLastInterfaceId,
    lastInterfaceId
}; 