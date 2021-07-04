import firebase from './firebase.js';
import Comment from './Comment.js';

let counter = 0;
let commentsList = document.getElementById('commentsList');
// Подгружаем комментарии из firebase
const ref = firebase.database().ref('Comments');

ref.orderByKey().on('child_added', function (snapshot) {
    const comment = snapshot.val();
    const keys = Object.keys(comment);
    counter++;
    const email = keys[0];
    const id = keys[1];
    const name = keys[2];
    const text = keys[3];
    const isColor = !(counter % 2);
    const markup =
        `<div class="comment col-xxl-3 col-lg-3 col-md-3 col-sm-3 ${isColor ? "comment--color" : ""}" id="${comment[id]}">
            <div class="comment__title ${isColor ? "comment__title--color" : ""}">
            ${comment[name]}
            </div>
            <span class="comment__email ${isColor ? "comment__email--color" : ""}">${comment[email]}</span>
            <span class="comment__text ${isColor ? "comment__text--color" : ""}">${comment[text]}</span>
        </div>`;
    commentsList.insertAdjacentHTML('beforeend', markup);
});

// подписываемся на отправку формы
const form = document.forms.addingComment;
const submit = (e) => {
    e.preventDefault();
    const name = form.elements.name?.value;
    const email = form.elements.email?.value;
    const text = form.elements.text?.value;
    const comment = new Comment(name, email, text);
    const newPostKey = firebase.database().ref().child('Comments').push().key;
    const updates = {};
    updates['/Comments/' + newPostKey] = comment;
    firebase.database().ref().update(updates).then(() => {
        counter++;
        form.reset();
    });

}

// подписываемся на отправку формы
form.addEventListener('submit', submit);


