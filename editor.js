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

//export { initializeCodeMirror, getEditor, editors }; 


// Clear all editor instances
/*
function clearEditors() {
    for (let key in editors) {
        if (editors.hasOwnProperty(key)) {
            delete editors[key];
        }
    }
}
*/
function clearEditors() {
    editors = {};
}

// Delete a specific editor instance
function deleteEditor(elementId) {
    delete editors[elementId];
}

// Get editor instance
function getEditor(interfaceId) {
    return editors[`sqlQuery${interfaceId}`];
}

// Check if editor is empty
function isEditorEmpty(elementId) {
    const editor = getEditor(elementId);
    return editor ? editor.getValue().trim() === '' : true;
}

export { initializeCodeMirror, clearEditors, deleteEditor, getEditor, isEditorEmpty };
