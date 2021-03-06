// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { findNext, getFocus, setFocus } from "./FocusHelper";

// BEGIN EXTRA CODE
function focusPrevious(): void {
    const previous = findNext(getFocus(), true);
    if (previous) {
        setFocus(previous);
    }
}
// END EXTRA CODE

/**
 * Move the keyboard focus to the previous element that can be focused.
 * @returns {Promise.<void>}
 */
export async function FocusPrevious(): Promise<void> {
    // BEGIN USER CODE
    focusPrevious();
    return Promise.resolve();
    // END USER CODE
}
