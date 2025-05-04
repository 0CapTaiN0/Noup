/**
 * Main application script for Windows Update Controller
 */

// Handle application functions
function closeApp() {
    pywebview.api.exitApp();
}

function toggleUpdate(enable) {
    pywebview.api.updateStatus(enable)
        .then(result => {
            alert(result);
        })
        .catch(error => {
            alert("Error: " + error);
        });
}

function openGitHub() {
    pywebview.api.github();
}

// Ensure the canvas resizes with the window
window.addEventListener('resize', () => {
    const canvas = document.getElementById("particleCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});