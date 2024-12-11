import { 
    clearEditors, 
    getEditor,
} from './editor.js';

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

// Clear all SQL interfaces
function clearAllInterfaces() {
    document.getElementById("queryInterfaces").innerHTML = "";
    //editors = {};
    clearEditors();
    lastInterfaceId = 0;
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
//    lastInterfaceId
}; 