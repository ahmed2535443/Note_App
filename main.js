const nameInp = document.getElementById('nameInp');
const phoneInp = document.getElementById('phoneInp');
const saveBtn = document.getElementById('saveBtn');
const catInp = document.getElementById('catInp');
const list = document.getElementById('contactsList');
const title = document.getElementById('title');
const searchInp = document.getElementById('searchInp');

let contacts = JSON.parse(localStorage.getItem('persons')) || [];
title.innerText = localStorage.getItem('newTitle') || 'My Contacts 📱';

function change_title(el) {
    localStorage.setItem('newTitle', el.innerText.trim());
}

saveBtn.onclick = function() {
    if (!nameInp.value.trim() || !phoneInp.value.trim()) {
        alert("يرجى إدخال الاسم والرقم!");
        return;
    }
    
    const person = {
        id: Date.now(),
        name: nameInp.value,
        phone: phoneInp.value,
        category: catInp.value
    };
    
    contacts.push(person);
    localStorage.setItem('persons', JSON.stringify(contacts));
    show_Contacts();
    nameInp.value = "";
    phoneInp.value = "";
};

function show_Contacts(data = contacts) {
    list.innerHTML = data.map(per => `
        <div class="contact-card">
            <div class="info">
                <strong contenteditable="true" onblur="edit(${per.id}, this.innerText, 'name')">${per.name}</strong>
                <span contenteditable="true" onblur="edit(${per.id}, this.innerText, 'phone')">📞 ${per.phone}</span>
                <span class="tag">${per.category}</span>
            </div>
            <button class="del-btn" onclick="delete_person(${per.id})">Delete</button>
        </div>
    `).join('');
}

function edit(id, text, key) {
    let person = contacts.find(p => p.id === id);
    if (person) {
        person[key] = text.replace('📞', '').trim();
        localStorage.setItem('persons', JSON.stringify(contacts));
    }
}

function delete_person(id) {
    contacts = contacts.filter(p => p.id !== id);
    localStorage.setItem('persons', JSON.stringify(contacts));
    show_Contacts();
}

function searchbyNumorName() {
    const val = searchInp.value.toLowerCase().trim();
    show_Contacts(contacts.filter(p =>
        p.name.toLowerCase().includes(val) || p.phone.includes(val)
    ));
}

function filterBy(cate) {
    if (cate === 'All') show_Contacts(contacts);
    else show_Contacts(contacts.filter(p => p.category === cate));
}

show_Contacts();