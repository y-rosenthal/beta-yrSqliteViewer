let isRestoringSession = false;

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

export { beginSessionRestore, endSessionRestore, isRestoringSession }; 