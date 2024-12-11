//import { 
//    createSqlInterfaceHTML,
//   addSqlInterface,
//    clearAllInterfaces,
//    ensureOneBlankInterface,
//    resetLastInterfaceId,
//    getLastInterfaceId
// } from "./interfaceManager.js";

//let isRestoringSession = false;


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

/*
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
*/

export {
    createTableCardHTML,
    addTableCard,
//    beginSessionRestore,
//    endSessionRestore,
}; 
