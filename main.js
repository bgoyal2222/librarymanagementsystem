(function (window, document) {
    let data = [
        // { title: 'Book1', author: 'Author1', lender: 'userc', borrower: 'userb', requestBy: '' },
        // { title: 'Book2', author: 'Author2', lender: 'userc', borrower: '', requestBy: '' },
        // { title: 'Book3', author: 'Author3', lender: 'userd', borrower: 'userc', requestBy: '' },
        // { title: 'Book4', author: 'Author4', lender: 'usera', borrower: '', requestBy: '' },
        // { title: 'Book5', author: 'Author5', lender: 'usera', borrower: '', requestBy: '' },
        // { title: 'Book6', author: 'Author6', lender: 'userb', borrower: 'usera', requestBy: '' }
    ];
    var usrname = '';
    function populateData() {
        let table = document.getElementById('myTable');
        let length = table.rows.length;
        if (table.rows.length > 1) {
            for (let i = 0; i < length - 1; i++) {
                table.deleteRow(1);
            }
        }
        data.forEach((item, index) => {
            let row = table.insertRow(-1);
            let btn = document.createElement("BUTTON");

            row.insertCell(0).innerHTML = index + 1;
            row.insertCell(1).innerHTML = item.title;
            row.insertCell(2).innerHTML = item.author;
            row.insertCell(3).innerHTML = item.lender;
            row.insertCell(4).innerHTML = item.borrower;
            if (usrname == '') {
                btn.disabled = true;
            }
            if (item.borrower === '' && item.lender !== usrname) {
                btn.innerHTML = "Borrow";
                btn.onclick = function () {
                    data[index].borrower = usrname;
                    populateData();
                    setTimeout(() => {
                        if (item.requestBy === '') {
                            data[index].borrower = '';
                        } else {
                            data[index].borrower = item.requestBy;
                            data[index].requestBy = '';
                        }
                        populateData();
                    }, 120 * 1000);
                }
                row.insertCell(5).appendChild(btn);
            } else if (item.borrower === usrname) {
                btn.innerHTML = "Return";
                btn.onclick = function () {
                    if (item.requestBy === '') {
                        data[index].borrower = '';
                    } else {
                        data[index].borrower = item.requestBy;
                        data[index].requestBy = '';
                    }
                    populateData();
                }
                row.insertCell(5).appendChild(btn);
            }
            else if (usrname && item.borrower && item.borrower !== usrname && item.lender !== usrname && item.requestBy === '') {
                btn.innerHTML = "Request Next";
                btn.onclick = function () {
                    data[index].requestBy = usrname;
                    populateData();
                }
                row.insertCell(5).appendChild(btn);
            }
            else if (item.requestBy !== '') {
                row.insertCell(5).innerHTML = "Requested by " + item.requestBy;
            }
            else {
                row.insertCell(5).innerHTML = '-';
            }

        });
        if (usrname && usrname !== '') {
            let btn1 = document.createElement("BUTTON");
            let row = table.insertRow(-1);
            row.insertCell(0).innerHTML = data.length + 1;
            row.insertCell(1).innerHTML = "<input id='title' type='text' placeholder='title' />";
            row.insertCell(2).innerHTML = "<input id='author' type='text' placeholder='author' />";
            row.insertCell(3).innerHTML = usrname;
            row.insertCell(4).innerHTML = '-';
            btn1.innerHTML = 'Add book';
            btn1.onclick = function () {
                let title = document.getElementById('title') && document.getElementById('title').value;
                let author = document.getElementById('author') && document.getElementById('author').value;
                if (title && author) {
                    data.push({
                        title: title, author: author, lender: usrname, borrower: '', requestBy: ''
                    });
                    populateData();
                }
            };
            row.insertCell(5).appendChild(btn1);
        }
    }

    function addFunctionality() {
        let userBtn = document.getElementById('submit-user');
        let userInput = document.getElementById('username');
        userBtn && userBtn.addEventListener('click', function () {
            if (userInput && userInput.value !== '') {
                usrname = userInput.value;
                populateData();
            }
            else {
                populateData();
            }
        });
    }

    window.onload = function () {
        populateData();
        addFunctionality();
    };

}(window, document));