var CheckMenu = [];
var Listmenu = [];
var CheckOut = 0;
var DaftarMenu = 0;
var Total = 0;

function tambah(Menu, Harga, img) {
    if (!CheckMenu.includes(Menu)) {
        CheckOut += 1;
        DisplayCheckOut();
        CheckMenu.push(Menu);
        Listmenu.push([Menu, Harga, img, Harga, 1]);
        ShowMenu();
    }
}

function DisplayCheckOut() {
    document.getElementById("CheckOut").innerHTML = CheckOut;
}

DisplayCheckOut();

function Update(id, opsi = null, price) {
    const inputNum = document.getElementById(`input-num-${id}`)
    if (Number(inputNum.value) < 1) inputNum.value = 1
    if (opsi == 'plus') inputNum.value = Number(inputNum.value) + 1
    if (opsi == 'min') {
        inputNum.value = Number(inputNum.value) == 1 ?
            1 :
            Number(inputNum.value) - 1
    }

    let total = price * inputNum.value
    Listmenu[id] = [
        Listmenu[id][0],
        Listmenu[id][1],
        Listmenu[id][2],
        total,
        Number(inputNum.value)
    ]

    ShowMenu()
}

function ShowMenu() {
    document.getElementById('list-menu').innerHTML = ""

    Listmenu.forEach((v, i) => {
        document.getElementById('list-menu').innerHTML += `<div class = "p-2" style = "margin-left:-20px" >
                <table class = "w-100" >
                    <tbody>
                        <tr>
                            <td rowspan = "3"
                                class = "align-middle"
                                style = "min-width:90px" >
                                    <img draggable = "false"
                                        src = "assets/img/${v[2]}"
                                        class = "card-img-top mx-auto p-3" / >
                            </td> 
                            <td class = "w-100" >
                                <span class = "type" >
                                </span> 
                            </td> 
                            <td rowspan = "2"
                                class = "text-right"
                                style = "min-width: 90px;" >
                                <h6 class = "text-dark mb-0" > Rp ${v[3]} 
                                </h6> 
                            </td> 
                        </tr> 
                        <tr>
                        <td>
                            <h5 class = "f-bold"
                                style = "margin-top: 10px;" > ${v[0]} </h5> 
                        </td> 
                        </tr>
                        <tr >
                            <td >
                                <div class = "input-group input-group-sm pill-num" >
                                    <div class = "input-group-prepend" onclick = "Update(${i}, 'min', ${v[1]})" >
                                        <span class = "input-left" >
                                        <svg xmlns = "http://www.w3.org/2000/svg"
                                                width = "16"
                                                height = "16"
                                                fill = "currentColor"
                                                class = "bi bi-dash"
                                                viewBox = "0 0 16 16" >
                                        <path d = "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" / >
                                        </svg>
                                        </span>
                                    </div>
                                    <input type = "number" class = "form-num" id="input-num-${i}" value="${v[4]}">
                                    <div class = "input-group-prepend" onclick = "Update(${i}, 'plus', ${v[1]})">
                                        <span class = "input-right" >
                                        <svg xmlns = "http://www.w3.org/2000/svg"
                                                width = "16"
                                                height = "16"
                                                fill = "currentColor"
                                                class = "bi bi-plus"
                                                viewBox = "0 0 16 16" >
                                        <path d = "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" / >
                                        </svg> 
                                        </span>
                                    </div>
                                </div>
                            </td> 
                        <td class = "text-right" >
                            <svg xmlns = "http://www.w3.org/2000/svg"
                                    width = "25"
                                    height = "25"
                                    fill = "currentColor"
                                    class = "bi bi-trash"
                                    viewBox = "0 0 16 16" 
                                    onclick="deleteMenu(${i})">
                                    <path fill = "#ced4da" d = "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5  0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0   1 0V6z" >
                                    </path> 
                                    <path fill = "#ced4da"fill - rule = "evenodd"
                                        d = "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0     1 1-1h2a1 1 0 0 1 1                     1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0     1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" >
                                    </path> 
                                </svg> 
                            </td> 
                        </tr> 
                    <div class = "container" >
                        <h6 class = "text-center"
                                id = "alert" > 
                        </h6> 
                    </div> 
                </tbody> 
            </table> 
        </div>`
    });

    grandTotal()
}

function deleteMenu(id) {
    CheckMenu = CheckMenu.filter(e => e !== Listmenu[id][0])
    Listmenu.splice(id, 1)
    CheckOut -= 1
    ShowMenu()
    DisplayCheckOut()
}

function grandTotal() {
    Total = 0
    Listmenu.forEach(v => {
        Total += v[3]
    })
    document.getElementById("grand-total").innerHTML = `Rp ${Total}`
}