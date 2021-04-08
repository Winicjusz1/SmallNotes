const addBtn = document.querySelector('.add');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtns = document.getElementsByClassName('delete-note'); /* w związku że nowe notatki tworzą 'żywe kolekcje' aby je wyłapać  w js zamiast querySelectorAll trzeba zastosować getElementsByClassName !!!!!!!!! */
const deleteAllBtn = document.querySelector('.delete-all');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const category = document.querySelector('#category');
const textarea = document.querySelector('#text');
const error = document.querySelector('.error');

let selectedValue;
let cardID = 0;

const openPanel = () => {
    notePanel.style.display = 'flex'; /* ta funkcja zmiania  dysplay - none  w notePanel  na display - flex po nacciśnieciu prawego gornego przycisku Dodaj i po naopistaniu tej funkcji trzeba  odrazu na dole  napisać nasłuchiwacza na click na ten przycisk z parametrem w postaci wywołania w/w funkcji openPanel  - jest to standardowe podpięcie przycisku i  reakcji na jego przciśnięcie  */
}

const closePanel = () => {  /* ta funkcja  zamyka panel notatki dodajac w stylach display none oraz ukrywa  komunikat errora  a następnie czyści pole textarea ale nie przez textContent a przez value bo tak trzeba w textarea !!!!!!   i ustawia category.selectIndex na 0 aby  poponownym uruchomeiniu panelu  wyskakiwał napis wybierz kategorią a nie to co pozostało z poprzedniego wywołania !!!!!!!!     a  następnie  na dole piszemy nasłuchiwacz na przycisk cancel.Btn na uruchomienie tej funkcji !!!!!!!!!!!*/
    notePanel.style.display = 'none';
    error.style.visibility = 'hidden';
    textarea.value = '';
    category.selectedIndex = 0;
}

const addNote = () => {/* funkcja podpieta pod przycisk zapisz w panelu notatki, */
    if (textarea.value !== '' && category.options[category.selectedIndex].value !== /* !!!!!!!!!! */ '0') {
        createNote(); /* sprawdza czy pole jest rózne od pustego stringa i categoryy różne od 0 i wówczas ustawia w error na hiden a  innym przypadku - else  ustawia errrora na visible !!!!!! */
        error.style.visibility = 'hidden';
    } else {
        error.style.visibility = 'visible';
    }
}

const createNote = () => {  /* tworzy nową notatkę ale nie chcemy zbyt dużo zagnieżdżeń dlatego robimy to tak:  */
    const newNote = document.createElement('div');
    newNote.classList.add('note'); /* dodajemy kalse do w/w diva*/
    newNote.setAttribute('id', cardID); /* dodajemy ID i jako wartośc  do tego atrybutu  ustawimy to będzie wartosć zmiennej cardID bo bedzie się ona dynamicznie w zależności od ilosci notatek zmieniać, to wszystko storzyl diva z klasą note o ID równe 0 i teraz dodajemy to do noteArea*/

    /* a tu poniżej  w template stringu dodajemy cały szkodlet notatki z wzorca w Html aby za duzo nie zagnieżdżać a w nim chwytamy na on clicka - w krzyżyku -  wywołanie funkcji deleteNote i przechwycenie ID card i na dole przekazanie tego id do w/w funkcji */
    newNote.innerHTML = `  
        <div class="note-header">
        <h3 class="note-title">${selectedValue}</h3>
        <button class="delete-note" onclick="deleteNote(${cardID})">
            <i class="fas fa-times icon"></i>
        </button>
        </div>
        <div class="note-body">
            ${textarea.value} 
        </div>  
    `

    noteArea.appendChild(newNote);
    cardID++; /* inkrementacja  liczby ID przy każdej notatce */
    textarea.value = '';
    category.selectedIndex = 0;
    notePanel.style.display = 'none';
    checkColor(newNote) /* wywołanie funkcji sprawdzajacej  kolor i wartość kategorii  a nastepnie podstawiajacej własciwy kolor dla własciwej kategorii */
}


const selectValue = () => { /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ta funkcja  z panelu notatki wbija nam do heda notatki wybraną kategorię */
    selectedValue = category.options[category.selectedIndex].text; /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!w zmiennej selectedValue zadeklarowanej u góry, przechowujemy pobrany tekst z panelu notatki z options - tj. kategorę  tą sama metodą co ID ale na końcu wpiszemy text i otrzymamy przechowywany w tym polu tekst a anstepnie zmienną selectedValue dajemy wyżej do templet stringa w text aby nam wppisał tresc wybranej kategorii w heda notatki !!!!!!!!!!!!!!!!!  a teraz musimy stworzyć nasłuchiwacza na onchance w Htmlu tj. na zmianę wartości  wybranej opcji czyli tekstu i dopiero to wywołać funkcją  tak aby wbić to heda notatki, po prostu onchange za kazdym wychwyceniem zmiany  w kategorii wywołuje funkcę  selectValue i podstawia wybrany w tym momencie tekst !!!!!!! */
}

const checkColor = (note) => {
    switch (selectedValue) { /* zamast fi else ifów posłużymy się switchem. Szukaną wartością do przełaczania jest w/w zmienna selectedValue i dajemy ją do argumentu w/w switcha,    */
        case 'Zakupy': /* jeśli będzie wybrana wartośc zakupy to  w stylach ustawiamy wartosć background Color na uprzednioustaloną przez  nas !!!!!!!!! a całą funkcję  chekColor wywołujemy w funkcji createNote aby przybrała ona właciwy kolor  */
            note.style.backgroundColor = 'rgb(255, 151, 14)';
            break;
        case 'Praca':
            note.style.backgroundColor = 'rgb(14, 179, 255)'
            break;
        case 'Inne':
            note.style.backgroundColor = 'rgb(14, 255, 46)';
            break;
    }
}

const deleteNote = id => { /* funkcja przyjmuje parametr id a następnie przeszukuje cały dokument i po odszukaniu notatki z danym id dokonuje metody remove w noteArea  usuwając tym samym notatkę  z podanym id */
    const noteToDelete = document.getElementById(id);
    noteArea.removeChild(noteToDelete)
}

const deleteAllNotes = () => { /* ta funkcja  uruchmia standardowy czyszczacz - czyści nam cały div noteArea i jest jej wywołanie podpięte do przycisku w menu w prawym rogu   - usuń wszystkie - prechowywany w zmiennej deleteAllBtn */
    noteArea.textContent = ''
}
/* nasłuchowacze*/
addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
deleteAllBtn.addEventListener('click', deleteAllNotes);
