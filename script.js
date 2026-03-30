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
    console.log("🔄 buildTotalsFooter called");

    const banner = document.getElementById('debug-banner');
    if (banner) {
        banner.style.background = '#ecfdf5';
        banner.style.color = '#10b981';
        banner.style.borderColor = '#10b981';
        banner.innerHTML = '✅ Totals system is running - XC Day Dual should appear below';
    }

    let xcDayDual = 0;
    flights.forEach(f => {
        xcDayDual += parseFloat(f.xcDayDual || 0);
    });

    document.getElementById('totals-grid').innerHTML = `
        <div style="background:#fef3c7; padding:16px; border:3px solid #f59e0b; border-radius:12px; font-size:15px;">
            <strong>XC Day Dual:</strong> ${xcDayDual.toFixed(1)}
        </div>
        <div style="margin-top:12px; color:#0a2540; font-weight:600;">
            If you see this yellow box, the totals are working.
        </div>
    `;
}

    function updateAllTotals() {
        renderTable();
        buildTotalsFooter();
    }

    // Paste all your other functions here (showAddModal, hideModal, editFlight, deleteFlight, handleFormSubmit, exportToPDF, etc.)
    // from your previous full code

        window.onload = () => {
        console.log("🚀 Window onload triggered");
        loadFromFirebase().then(() => {
            console.log("✅ loadFromFirebase finished");
            updateAllTotals();
            // Force totals again after a short delay
            setTimeout(() => {
                console.log("🔄 Forcing totals update again");
                buildTotalsFooter();
            }, 800);
        }).catch(err => {
            console.error("Load failed:", err);
        });
    };
