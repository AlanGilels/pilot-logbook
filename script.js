const firebaseConfig = {
  apiKey: "AIzaSyDXNNLgbrkYWbn32D34IBl18J7F1wcyJHQ",
  authDomain: "canadian-pilot-logbook.firebaseapp.com",
  projectId: "canadian-pilot-logbook",
  storageBucket: "canadian-pilot-logbook.firebasestorage.app",
  messagingSenderId: "74288469835",
  appId: "1:74288469835:web:c8c3dbe90e65a69a9bbace",
  measurementId: "G-VF4JDKXP42"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let flights = [];
let editId = null;

// showToast, loadFromFirebase, parseCustomDate, sortFlightsByDate, renderTable, showAddModal, hideModal, editFlight, deleteFlight, handleFormSubmit, exportToPDF 
// → paste all your existing functions here from the previous full code

function buildTotalsFooter() {
    console.log("🔄 buildTotalsFooter running with", flights.length, "flights");

    let xcDayDual = 0;
    flights.forEach(f => {
        xcDayDual += parseFloat(f.xcDayDual || 0);
    });

    // Force a very visible test
    const grid = document.getElementById('totals-grid');
    if (grid) {
        grid.innerHTML = `
            <div style="background:#fef3c7; padding:16px; border:3px solid #f59e0b; border-radius:12px; font-size:15px;">
                <strong>XC Day Dual Test:</strong> ${xcDayDual.toFixed(1)}
            </div>
            <div style="margin-top:12px; color:#0a2540;">
                If you see this yellow box, the totals system is working.
            </div>
        `;
        console.log("✅ Grid updated with yellow box - XC Day Dual =", xcDayDual.toFixed(1));
    } else {
        console.error("❌ totals-grid element not found!");
    }

    // Also update grand total
    document.getElementById('grand-total-time').textContent = "0.0";
}


    function updateAllTotals() {
        renderTable();
        buildTotalsFooter();
    }

    // Paste all your other functions here (showAddModal, hideModal, editFlight, deleteFlight, handleFormSubmit, exportToPDF, etc.)
    // from your previous full code

    window.onload = () => {
        loadFromFirebase();
    };
