
// -------- Form Uygulama --------

function kontrolEt() {
    let tc = document.getElementById("tc").value.trim();

    if (tc.length != 11 || isNaN(tc)) {
        alert("TC niz eksik veya hatalı!")
        return false;
    }
    alert("Doğru Girildi")
}
