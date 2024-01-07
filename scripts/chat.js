// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username 
// updating the room

class Chatroom { // responsible for managing the chat data
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats'); // storing reference to chat collections
        this.unsub;
    }
    async addChat(message){
        // format a chat object
        const now = new Date(); // when user submited a chat
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document 
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room) // takes 3pr, get certain document from a collection where a certain condition is true
            .orderBy('created_at') // order by time
            .onSnapshot((snapshot) => { // setting up the real-time listener
                snapshot.docChanges().forEach((change) => { // to get all changes
                    if(change.type === 'added'){
                        // updating ui
                        callback(change.doc.data());
                    }
                }); 
            });
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username); // local storage for a name
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub(); // unsub from the changes
        }
    }
};