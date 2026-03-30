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
    let seDayPic = 0, seDayDual = 0, seNightPic = 0, seNightDual = 0, seCo = 0;
    let meDayPic = 0, meDayDual = 0, meNightPic = 0, meNightDual = 0, meCo = 0;
    let xcDayPic = 0, xcDayDual = 0, xcNightPic = 0, xcNightDual = 0;
    let actualIMC = 0, hood = 0, ftd = 0, ifrAppr = 0;
    let nightLandings = 0;
    let grandTotal = 0;

    flights.forEach(f => {
        seDayPic += parseFloat(f.seDayPic || 0);
        seDayDual += parseFloat(f.seDayDual || 0);
        seNightPic += parseFloat(f.seNightPic || 0);
        seNightDual += parseFloat(f.seNightDual || 0);
        seCo += parseFloat(f.seCo || 0);

        meDayPic += parseFloat(f.meDayPic || 0);
        meDayDual += parseFloat(f.meDayDual || 0);
        meNightPic += parseFloat(f.meNightPic || 0);
        meNightDual += parseFloat(f.meNightDual || 0);
        meCo += parseFloat(f.meCo || 0);

        xcDayPic += parseFloat(f.xcDayPic || 0);
        xcDayDual += parseFloat(f.xcDayDual || 0);   // ← XC Day Dual added
        xcNightPic += parseFloat(f.xcNightPic || 0);
        xcNightDual += parseFloat(f.xcNightDual || 0);

        actualIMC += parseFloat(f.actualIMC || 0);
        hood += parseFloat(f.hood || 0);
        ftd += parseFloat(f.ftd || 0);
        ifrAppr += parseFloat(f.ifrAppr || 0);

        nightLandings += parseInt(f.nightLandings || 0);

        grandTotal += parseFloat(f.seDayPic || 0) + parseFloat(f.seDayDual || 0) + parseFloat(f.seNightPic || 0) + parseFloat(f.seNightDual || 0) + parseFloat(f.seCo || 0) +
                      parseFloat(f.meDayPic || 0) + parseFloat(f.meDayDual || 0) + parseFloat(f.meNightPic || 0) + parseFloat(f.meNightDual || 0) + parseFloat(f.meCo || 0);
    });

    document.getElementById('totals-grid').innerHTML = `
        <div><strong>SE Day PIC:</strong> ${seDayPic.toFixed(1)}</div>
        <div><strong>SE Day Dual:</strong> ${seDayDual.toFixed(1)}</div>
        <div><strong>ME Day PIC:</strong> ${meDayPic.toFixed(1)}</div>
        <div><strong>ME Day Dual:</strong> ${meDayDual.toFixed(1)}</div>
        <div><strong>XC Day PIC:</strong> ${xcDayPic.toFixed(1)}</div>
        <div><strong>XC Day Dual:</strong> ${xcDayDual.toFixed(1)}</div>
        <div><strong>Actual IMC:</strong> ${actualIMC.toFixed(1)}</div>
        <div><strong>Hood:</strong> ${hood.toFixed(1)}</div>
        <div><strong>FTD:</strong> ${ftd.toFixed(1)}</div>
    `;

    document.getElementById('grand-total-time').textContent = grandTotal.toFixed(1);

    document.getElementById('logbook-tfoot').innerHTML = `
        <tr class="bg-slate-100 font-semibold border-t-4 border-[#0a2540]">
            <td colspan="5" class="text-left pl-8">TOTALS →</td>
            <td>${seDayPic.toFixed(1)}</td>
            <td>${seDayDual.toFixed(1)}</td>
            <td>0.0</td><td>0.0</td><td>0.0</td>
            <td>${meDayPic.toFixed(1)}</td>
            <td>${meDayDual.toFixed(1)}</td>
            <td>0.0</td><td>0.0</td><td>0.0</td>
            <td>${xcDayPic.toFixed(1)}</td>
            <td>${xcDayDual.toFixed(1)}</td>
            <td>0.0</td><td>0.0</td>
            <td>${actualIMC.toFixed(1)}</td>
            <td>${hood.toFixed(1)}</td>
            <td>${ftd.toFixed(1)}</td>
            <td>0.0</td>
            <td>${nightLandings}</td>
            <td></td>
            <td class="no-print"></td>
        </tr>`;
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
