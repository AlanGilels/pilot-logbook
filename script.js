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
    console.log("🔄 buildTotalsFooter started -", flights.length, "flights");

    let xcDayDual = 0;

    flights.forEach(f => {
        xcDayDual += parseFloat(f.xcDayDual || 0);
    });

    // Very simple test grid - only showing XC Day Dual for now
    document.getElementById('totals-grid').innerHTML = `
        <div style="background:#fef3c7; padding:12px; border-radius:8px; border:2px solid #f59e0b;">
            <strong>XC Day Dual:</strong> ${xcDayDual.toFixed(1)}
        </div>
        <div><strong>Test - Totals are working</strong></div>
    `;

    console.log("✅ XC Day Dual value =", xcDayDual.toFixed(1));
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
