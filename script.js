//------Variables-----
var form = document.getElementById('add-frm');
var items = document.getElementById('items');
var ntitle = document.getElementById('n-title');
var nbody = document.getElementById('n-body');
var tableDiv = document.getElementById('tbl-div');
var search = document.getElementById('srch');
var resetBtn = document.getElementById('reset');

var noteCount = 0;
var newNote = '';
var isUpdate = false;
var record = '';
var note = '';
var body = '';

//-----Events-----

     //for page loads
window.onload = updateTable;

    //for form submission
form.addEventListener('submit', addNote);

    //for search
search.addEventListener('keyup', searchNotes);

    //for remove
items.addEventListener('click', removeNote);

    //for view and update
items.addEventListener('click',viewUpdateNote);

    //for reset
resetBtn.addEventListener('click', resetAll);

//-----Functions-----

//Update table
function updateTable(){
    //Display the table when notes get added
    if(noteCount > 0){
        tableDiv.style.display = ''; //if noteCount > 0 then rows display if not rows diapear
        
        //update note
        if(isUpdate){
            note.firstChild.textContent = ntitle.value;
            note.lastChild.textContent = nbody.value;

            // reset update and note count
            isUpdate = false;
            noteCount--;
        }
        else{
            //add new note
            items.appendChild(newNote);
        }
    }
    else{
        tableDiv.style.display = 'none';
    }
}


//Add note
function addNote(e){
    e.preventDefault(); //Stop initial behavior

    //validation inputs
    if(ntitle.value == '' || nbody.value == ''){
        alert('Please Fill All Fields!');
    }
    else{
        //Create a new note record

        //New tr
        var tr = document.createElement('tr');
        tr.className = 'item';

        //New td for title and body
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(ntitle.value));
        var span = document.createElement('span');
        span.className = 'note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);

        //New td for view
        var td2 = document.createElement('td');
        td2.className = 'btcellv';
        var btn1 = document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id', 'vw');
        td2.appendChild(btn1);

        //New td for delete
        var td3 = document.createElement('td');
        td3.className = 'btcelld';
        var btn2 = document.createElement('button');
        btn2.appendChild(document.createTextNode('Delete'));
        btn2.setAttribute('id', 'del');
        td3.appendChild(btn2);


        //Add all tds to here
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        //Increment note count
        noteCount++;

        //Set new note
        newNote = tr;

        //Add or update the note of the table
        updateTable();
    }

    //reset all 
    resetAll();
}

//Search Notes
function searchNotes(e){
    //Text to lowercase
    var searchText = e.target.value.toLowerCase();
    
    //get list
    var list = items.getElementsByClassName('item');
    
    //convert to an array
    var listArr = Array.from(list);
    listArr.forEach(function(item){
        //get title
        var noteTitle = item.firstChild.textContent;
        //match (compare note title and search text)
        if(noteTitle.toLowerCase().indexOf(searchText) != -1){
            item.style.display = '';
        }
        else{
            item.style.display = 'none';
        }

    });
}

//remove note
function removeNote(e){
    if(e.target.id == 'del'){
        if(confirm('Are you sure?')){
            //Delete notes

            var tr = e.target.parentElement.parentElement;
            items.removeChild(tr);
            
            //update table
            noteCount--;
            if(noteCount == 0){
                updateTable();
            }
        }
    }
}


//view and update note
function viewUpdateNote(e){
    if(e.target.id == 'vw'){
        //Get the element values & update input fields
        record = e.target.parentElement.parentElement;
        note = record.firstChild;
        ntitle.value = note.firstChild.textContent;
        nbody.value = note.lastChild.textContent;
        isUpdate = true;
    }
}

//reset all
function resetAll(e){
    ntitle.value = '';
    nbody.value= '';
    isUpdate = false;
    newNote = '';
}