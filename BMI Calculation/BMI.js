
/* ################## VKI Hesaplama Uygulama ################## */

function kontrolEt() {
    let kg = document.getElementById("kg").value.trim();
    if (isNaN(kg) || kg === "") {
        alert("Lütfen Geçerli Bir Değer Giriniz!")
        return false;
    }
    let height = document.getElementById("height").value.trim();
    if (isNaN(height) || height === "") {
        alert("Lütfen Geçerli Bir Değer Giriniz!")
        return false;
    }

    kg = Number(kg);
    height = Number(height);

    if (height>3) {
        height = height / 100
    }

    let sonuc = kg / (height * height);

    if (sonuc < 18.5) {
        alert("İdeal Kilonun Altında : " + sonuc)
    } else if (sonuc >= 18.5 && sonuc <= 24.9) {
        alert("İdeal Kiloda : " + sonuc)
    } else if (sonuc >= 25 && sonuc <= 29.9) {
        alert("İdeal Kilonun Üstünde : " + sonuc)
    } else if (sonuc >= 30 && sonuc <= 39.9) {
        alert("Obez (Kilolu) : " + sonuc)
    } else if (sonuc >= 40) {
        alert("Morbid Obez (Aşırı Kilolu) : " + sonuc)
    }
}
