// Sayfa Yüklenince Yapılacaklar
window.onload = function() {
    // Butonlara tıklama olayları ekleyelim
    document.getElementById('btnKayit').addEventListener('click', openKayitForm);
    document.getElementById('btnVeriGirisi').addEventListener('click', openVeriGirisiForm);
    document.getElementById('btnVeriGoruntule').addEventListener('click', openVeriGoruntuleForm);
    document.getElementById('btnTotalAtik').addEventListener('click', showTotalAtik);
};

// Kayit Formunu Aç
function openKayitForm() {
    let modal = createModal('Kayit Formu');
    modal.innerHTML = `
        <h2>Okul ve Öğrenci Kaydı</h2>
        <form id="kayitForm">
            <label for="okulAdi">Okul Adı:</label>
            <input type="text" id="okulAdi" placeholder="Okul Adını Girin" required>
            
            <label for="ogrenciAdi">Öğrenci Adı:</label>
            <input type="text" id="ogrenciAdi" placeholder="Öğrenci Adını Girin" required>

            <label for="ogrenciSoyadi">Öğrenci Soyadı:</label>
            <input type="text" id="ogrenciSoyadi" placeholder="Öğrenci Soyadını Girin" required>

            <button type="submit" class="submit">Kaydet</button>
        </form>
    `;
    document.body.appendChild(modal);
    document.getElementById('kayitForm').addEventListener('submit', saveKayit);
}

// Veri Girişi Formunu Aç
function openVeriGirisiForm() {
    let modal = createModal('Veri Girişi');
    modal.innerHTML = `
        <h2>Atık Girişi</h2>
        <form id="veriGirisiForm">
            <label for="atikTuru">Atık Türü:</label>
            <select id="atikTuru" required>
                <option value="Kağıt">Kağıt</option>
                <option value="Plastik">Plastik</option>
                <option value="Metal">Metal</option>
                <option value="Cam">Cam</option>
                <option value="Yağ">Yağ</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Tekstil">Tekstil</option>
                <option value="Pil">Pil</option>
            </select>
            
            <label for="atikAğırlık">Atık Ağırlığı (kg):</label>
            <input type="number" id="atikAğırlık" placeholder="Atık Ağırlığını Girin" required>

            <button type="submit" class="submit">Veriyi Kaydet</button>
        </form>
    `;
    document.body.appendChild(modal);
    document.getElementById('veriGirisiForm').addEventListener('submit', saveVeriGirisi);
}

// Veri Görüntüleme
function openVeriGoruntuleForm() {
    let modal = createModal('Veri Görüntüle');
    modal.innerHTML = `
        <h2>Verilerinizi Görüntüleyin</h2>
        <p>Toplam Atık: ${localStorage.getItem('totalAtik')} kg</p>
    `;
    document.body.appendChild(modal);
}

// Toplam Atık
function showTotalAtik() {
    let totalAtik = localStorage.getItem('totalAtik') || 0;
    alert("Toplam Atık: " + totalAtik + " kg");
}

// Modal Oluşturma
function createModal(title) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = `
        <button class="close-btn">X</button>
        <h2>${title}</h2>
    `;
    modalContent.querySelector('.close-btn').addEventListener('click', () => modal.remove());
    modal.appendChild(modalContent);
    return modal;
}

// Kayıt Verisini Kaydet
function saveKayit(event) {
    event.preventDefault();
    let okulAdi = document.getElementById('okulAdi').value;
    let ogrenciAdi = document.getElementById('ogrenciAdi').value;
    let ogrenciSoyadi = document.getElementById('ogrenciSoyadi').value;
    localStorage.setItem('okulAdi', okulAdi);
    localStorage.setItem('ogrenciAdi', ogrenciAdi);
    localStorage.setItem('ogrenciSoyadi', ogrenciSoyadi);
    alert("Kayıt başarıyla tamamlandı!");
    document.querySelector('.modal').remove();
}

// Veri Girişini Kaydet
function saveVeriGirisi(event) {
    event.preventDefault();
    let atikTuru = document.getElementById('atikTuru').value;
    let atikAğırlık = parseFloat(document.getElementById('atikAğırlık').value);

    // Kullanıcı verisini localStorage'da saklayacağız
    let studentData = JSON.parse(localStorage.getItem('studentData')) || [];

    let atikVerisi = {
        atikTuru: atikTuru,
        atikAğırlık: atikAğırlık,
        tarih: new Date().toLocaleString()
    };

    studentData.push(atikVerisi);

    // Öğrenci verilerini güncelle
    localStorage.setItem('studentData', JSON.stringify(studentData));

    // Atık sayacı güncelle
    let totalAtik = studentData.reduce((total, data) => total + data.atikAğırlık, 0);
    localStorage.setItem('totalAtik', totalAtik);

    alert("Atık başarıyla kaydedildi!");
    document.querySelector('.modal').remove();
}

// Öğrenci Verilerini Görüntüle
function openVeriGoruntuleForm() {
    let modal = createModal('Veri Görüntüle');
    let studentData = JSON.parse(localStorage.getItem('studentData')) || [];
    let totalAtik = localStorage.getItem('totalAtik') || 0;

    let veriListesiHTML = "<h3>Atıklarınız:</h3><ul>";
    studentData.forEach((data) => {
        veriListesiHTML += `<li>${data.tarih} - ${data.atikTuru}: ${data.atikAğırlık} kg</li>`;
    });
    veriListesiHTML += "</ul>";

    modal.innerHTML = `
        <h2>Verilerinizi Görüntüleyin</h2>
        ${veriListesiHTML}
        <p>Toplam Atık: ${totalAtik} kg</p>
    `;
    document.body.appendChild(modal);
}

// Modal'ı kapatmak için tıklama olayını ekleyelim
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-btn')) {
        e.target.closest('.modal').remove();
    }
});

// Diğer form işlemleri ve işlevsellikler için eklemeler yapıldı

// Toplam Atık Sayacı
function showTotalAtik() {
    let totalAtik = localStorage.getItem('totalAtik') || 0;
    alert("Toplam Atık: " + totalAtik + " kg");
}

// Ek Özellikler - Unvan Sistemi
function calculateUnvan() {
    let totalAtik = parseFloat(localStorage.getItem('totalAtik')) || 0;
    let unvan = '';

    if (totalAtik < 5) {
        unvan = 'Başlangıç Seviyesi';
    } else if (totalAtik < 10) {
        unvan = 'Yeşil Savaşçı';
    } else if (totalAtik < 20) {
        unvan = 'Atık Kahramanı';
    } else {
        unvan = 'Ekolojik Lider';
    }

    return unvan;
}

// Unvan Görüntüleme
function showUnvan() {
    let unvan = calculateUnvan();
    alert("Unvanınız: " + unvan);
}

// Kayıt ve Veri Girişi, Veri Görüntüle Butonlarıyla İlgili işlemler
document.getElementById('btnKayit').addEventListener('click', openKayitForm);
document.getElementById('btnVeriGirisi').addEventListener('click', openVeriGirisiForm);
document.getElementById('btnVeriGoruntule').addEventListener('click', openVeriGoruntuleForm);
document.getElementById('btnTotalAtik').addEventListener('click', showTotalAtik);
document.getElementById('btnShowUnvan').addEventListener('click', showUnvan);
