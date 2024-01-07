// render chat templates to the DOM
// clear the list of chats (when the room changes)

class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){ // creating html template for each chat document and rendering that to the DOM
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(), // toDate() -> to convert something into a standard JavaScript Date object
            {addSuffix: true} // adds the word 'ago'
        );
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span> :
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;

        this.list.innerHTML += html;
    }
};