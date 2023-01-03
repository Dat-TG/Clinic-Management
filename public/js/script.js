var usernameProfile = "";
var NamePatient = "";
$(function () {
    $("#name").on('input', function () {
        var ok = checkUpperCase($(this).val());
        if (ok == 1) {
            $("#name").get(0).setCustomValidity("Chữ cái đầu tiên của mỗi từ phải viết hoa");
            $("#name").get(0).reportValidity();
        }
        else {
            $("#name").get(0).setCustomValidity("");
            $("#name").get(0).reportValidity();
        }
    });
    $("#username").on('input', function () {
        var ok = checkUserName($(this).val());
        if (ok == 0) {
            $("#username").get(0).setCustomValidity("");
            $("#username").get(0).reportValidity();
        }
        else if (ok == 1) {
            $("#username").get(0).setCustomValidity("Username không được chứa khoảng trắng");
            $("#username").get(0).reportValidity();
        }
        else if (ok == 2) {
            $("#username").get(0).setCustomValidity("Username chỉ được chứa chữ cái, số, hoặc dấu gạch dưới");
            $("#username").get(0).reportValidity();
        }
        else if (ok == 3) {
            $("#username").get(0).setCustomValidity("Username không được bắt đầu bằng số");
            $("#username").get(0).reportValidity();
        }
    });
    $("#password").on('input', function () {
        var ok = checkPassWord($(this).val());
        if (ok == 1) {
            $("#password").get(0).setCustomValidity("Mật khẩu phải dài ít nhất 6 ký tự");
            $("#password").get(0).reportValidity();
        }
        else {
            $("#password").get(0).setCustomValidity("");
            $("#password").get(0).reportValidity();
        }
    });
    $("#newpassword").on('input', function () {
        var ok = checkPassWord($(this).val());
        if (ok == 1) {
            $("#newpassword").get(0).setCustomValidity("Mật khẩu phải dài ít nhất 6 ký tự");
            $("#newpassword").get(0).reportValidity();
        }
        else {
            $("#newpassword").get(0).setCustomValidity("");
            $("#newpassword").get(0).reportValidity();
        }
    });
    $("#retype_password").on('input', function () {
        var ok = checkPassWordRetype($(this).val(), $("#password").val());
        if (ok == 1) {
            $("#retype_password").get(0).setCustomValidity("Mật khẩu không khớp");
            $("#retype_password").get(0).reportValidity();
        }
        else {
            $("#retype_password").get(0).setCustomValidity("");
            $("#retype_password").get(0).reportValidity();
        }
    });
    var table = $('#example').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'colvis']
    });

    table.buttons().container()
        .appendTo('#example_wrapper .col-md-6:eq(0)');

    var table1 = $('#table_appointment').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'colvis']
    });

    table1.buttons().container()
        .appendTo('#table_appointment_wrapper .col-md-6:eq(0)');
    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        console.log("click");
        $('html, body').animate({ scrollTop: 0 }, 0, 'easeInOutExpo');
        return false;
    });

    // Price carousel
    $(".price-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });


    // Team carousel
    $(".team-carousel, .related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    $("#btnChangePassword").click(function () {
        if ($("#changePasswordForm").hasClass("d-none")) {
            $("#changePasswordForm").removeClass("d-none");
            $("#changePasswordForm").addClass("d-block");
        } else {
            $("#changePasswordForm").removeClass("d-block");
            $("#changePasswordForm").addClass("d-none");
        }
    });
    $('.changeStatus').on('change', function () {
        $.post("/tai-lieu/trang-thai-phieu-hen",
            {
                ID: $(this).attr('id'),
                Status: $(this).val()
            },
            function (data, status) {
                console.log(data);
            });
    })
    $('input[list="patients"]').on('input', onInput);
    $("#btnPrint").on("click", function () {
        console.log('print');
        const data = $("#printPDF").html();
        var mywindow = window.open('', 'HÓA ĐƠN KHÁM BỆNH', 'height=800,width=600');
        mywindow.document.write('<html><head><title>HÓA ĐƠN KHÁM BỆNH</title>');
        mywindow.document.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"> <link rel="stylesheet" href="../css/style.css"> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css"><link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.3.2/css/buttons.bootstrap5.min.css"><link href="img/favicon.ico" rel="icon"> <link rel="preconnect" href="https://fonts.gstatic.com"> <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css" rel="stylesheet"><link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"><link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet"><link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />');
        mywindow.document.write('</head><body>');
        mywindow.document.write(data);
        mywindow.document.write('<script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script> <script src="../js/script.js"></script> <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script> <script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap5.min.js"></script> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> <script src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.bootstrap5.min.js"></script> <script src="https://cdn.datatables.net/buttons/2.3.2/js/dataTables.buttons.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script> <script src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.print.min.js"></script> <script src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.html5.min.js"></script> <script src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.colVis.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script> <script src="/lib/easing/easing.min.js"></script> <script src="/lib/waypoints/waypoints.min.js"></script> <script src="/lib/owlcarousel/owl.carousel.min.js"></script> <script src="/lib/tempusdominus/js/moment.min.js"></script> <script src="/lib/tempusdominus/js/moment-timezone.min.js"></script> <script src="/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>');
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.print();
        $.post("/tai-lieu/xuat-hoa-don",
            {
                Patient: usernameProfile,
                Name: NamePatient,
                Doctor: $('#DoctorName').html(),
                DoctorID: $('#DoctorID').html(),
                Diagnosis: $('#Res').val(),
                Date: $('#Date').html(),
                Time: $('#Time').html(),
                Fee: $("#AllTotal").html(),
                Content: data
            },
            function (data, status) {
                console.log(data);
            });
    });
    $('input').on('input', function () {
        var val = $(this).val();
        $(this).attr('value', val);
    });
    var animateButton = function (e) {

        e.preventDefault;
        //reset animation
        e.target.classList.remove('animate');

        e.target.classList.add('animate');

        e.target.classList.add('animate');
        setTimeout(function () {
            e.target.classList.remove('animate');
        }, 4000);
    };

    var classname = document.getElementsByClassName("button");

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', animateButton, false);
    }
    $("#editSchedule").click(function () {
        $("#saveSchedule").removeClass("d-none");
        $("#saveSchedule").addClass("d-block");
        $("#editSchedule").removeClass("d-block");
        $("#editSchedule").addClass("d-none");
        $('.schedule-cell').click(function(){
            console.log('cell click');
            let items=["accent-pink-gradient","accent-orange-gradient","accent-green-gradient","accent-cyan-gradient","accent-blue-gradient","accent-purple-gradient"];
            let item = items[Math.floor(Math.random()*items.length)];
            if ($(this).html()=="") {
                $(this).html("<div class='"+item+"'></div>");
            }
            else {
                $(this).html("");
            }
        })
    });
    $("#saveSchedule").click(function () {
        $('.schedule-cell').off("click");
        $.post("/chinh-sua/lich-lam-viec",
            {
                schedule: $('#WorkSchedule').html()
            },
            function (data, status) {
                //console.log(data);
            });
        $("#editSchedule").removeClass("d-none");
        $("#editSchedule").addClass("d-block");
        $("#saveSchedule").removeClass("d-block");
        $("#saveSchedule").addClass("d-none");
    });
})

function checkUpperCase(name) {
    var splitStr = name.split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        if (splitStr[i].charAt(0) != splitStr[i].charAt(0).toUpperCase()) {
            return 1;
        }
    }
    return 0;
}

function checkUserName(name) {
    if (name.indexOf(' ') >= 0) {
        return 1;
    }
    if (!(/^[A-Za-z0-9_]*$/.test(name))) {
        return 2;
    }
    if (name.charAt(0) >= '0' && name.charAt(0) <= '9') {
        return 3;
    }
    return 0;
}

function checkPassWord(password) {
    if (password.length < 6) {
        return 1;
    }
    else {
        return 0;
    }
}

function checkPassWordRetype(pass_retype, pass) {
    if (pass_retype.length > 0 && pass != pass_retype) {
        return 1;
    }
    else {
        return 0;
    }
}

function onInput(e) {
    console.log('input');
    var input = e.target,
        val = input.value;
    list = input.getAttribute('list'),
        options = document.getElementById(list).childNodes;

    var ok = false;

    for (var i = 0; i < options.length; i++) {
        if (options[i].innerText === val) {
            console.log("match");
            usernameProfile = options[i].getAttribute('data-username');
            NamePatient = options[i].getAttribute('data-name');
            $.post("/tai-lieu/xuat-hoa-don",
                {
                    username: options[i].getAttribute('data-username')
                },
                function (data, status) {
                    $('#DOB').attr('value', data.user.DOB);
                    document.getElementById('DOB').value = data.user.DOB;
                    $('#Address').attr('value', data.user.Address);
                    document.getElementById('Address').value = data.user.Address;
                });
            // An item was selected from the list!
            // yourCallbackHere()
            //alert('item selected: ' + val);
            ok = true;
            break;
        }
    }
    if (!ok) {
        usernameProfile = "123";
        NamePatient = val;
    }
}

function autoGenerate() {
    let index = document.getElementsByTagName("tbody")[0].childElementCount;
    $('table tbody').append(`
    <tr>
      <th scope="row">${index + 1}</th>
      <td> <input type="text" list="drugs" data-index="${index + 1}" value="" class="form-control mx-sm-3 border-0"> </td>
      <td id="Unit${index + 1}"></td>
      <td> <input type="number" data-index="${index + 1}" id="Quantity${index + 1}" value=1 min=1 class="form-control mx-sm-3 border-0"> </td>
      <td id="Price${index + 1}"></td>
      <td id="Total${index + 1}"></td>
    </tr>
        `);
    var x = document.querySelectorAll('input[list="drugs"]');
    for (let i = 0; i < x.length; i++) {
        x[i].addEventListener('input', onInput1);

    }
    var y = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i < y.length; i++) {
        y[i].addEventListener('input', onInput2);
    }
    $('input').on('input', function () {
        var val = $(this).val();
        $(this).attr('value', val);
        $(this).attr('width', val.length + 1);
    });
}

function onInput1(e) {
    console.log('input');
    var input = e.target,
        val = input.value;
    list = input.getAttribute('list'),
        options = document.getElementById(list).childNodes;

    console.log('index', input.getAttribute("data-index"));
    var index = input.getAttribute("data-index");

    for (var i = 0; i < options.length; i++) {
        if (options[i].innerText === val) {
            $.post("/tai-lieu/xuat-hoa-don",
                {
                    name: val,
                },
                function (data, status) {
                    console.log(data);
                    $('#Unit' + index).html(data.drug.Unit);
                    $('#Unit' + index).val(data.drug.Unit);
                    $('#Price' + index).html(data.drug.Price);
                    let quantity = $('#Quantity' + index).val();
                    let curTotal = parseInt($("#AllTotal").html());
                    let oldTotal = parseInt($('#Total' + index).html());
                    if (oldTotal > 0) curTotal -= oldTotal;
                    $('#Total' + index).html(parseInt(data.drug.Price) * parseInt(quantity));
                    curTotal += parseInt(data.drug.Price) * parseInt(quantity);
                    $('#AllTotal').html(curTotal);
                });
            // An item was selected from the list!
            // yourCallbackHere()
            //alert('item selected: ' + val);
            break;
        }
    }
}

function onInput2(e) {
    console.log('input');
    var input = e.target,
        val = input.value;

    console.log('index', input.getAttribute("data-index"));
    var index = input.getAttribute("data-index");
    const unitPrice = $("#Price" + index).html();
    var allTotal = parseInt($("#AllTotal").html());
    allTotal -= parseInt($("#Total" + index).html());
    const total = parseInt(val) * parseInt(unitPrice);
    allTotal += total;
    console.log(val, unitPrice, total);
    $("#Total" + index).html(total);
    $("#AllTotal").html(allTotal);
}

function autoGeneratePatientList() {
    let index = document.getElementsByTagName("tbody")[0].childElementCount;
    $('table tbody').append(`
    <tr>
      <th class="col-1 text-center">${index + 1}</th>
      <td class="col-3 text-center"> <input type="text" data-index="${index + 1}" list="patients" id="Name${index + 1}" name="Name"  class="form-control mx-sm-3 border-0" value=""> </td>
      <td class="col-1 text-center"><input type="text" id="Gender${index + 1}" data-index="${index + 1}" class="form-control mx-sm-3 border-0"></td>
      <td class="col-2 text-center"><input type="text" id="DOB${index + 1}" data-index="${index + 1}" id="DOB" class="form-control mx-sm-3 border-0" value=""></td>
      <td class="col-4 text-center">  <input type="text" id="Address${index + 1}" data-index="${index + 1}" class="form-control mx-sm-3 border-0" value=""> </td>
      <td class="col-1 text-center"><input type="time" id="Time${index + 1}" data-index="${index + 1}" class="form-control mx-sm-3 border-0"></td>
      <td class="d-none"><input id="Username${index + 1}" class="d-none" type="text"></td>
      </tr>
        `);
    var x = document.querySelectorAll('input[list="patients"]');
    for (let i = 0; i < x.length; i++) {
        x[i].addEventListener('input', onInputPatientList);
    }
}

function onInputPatientList(e) {
    console.log('input');
    var input = e.target,
        val = input.value;
    list = input.getAttribute('list'),
        options = document.getElementById(list).childNodes;

    var ok = false;
    console.log('index: ', input.getAttribute('data-index'));
    var index = input.getAttribute("data-index");
    var today = new Date();
    var time = today.toLocaleTimeString('it-IT');
    document.getElementById('Time' + index).value = time;

    for (var i = 0; i < options.length; i++) {
        if (options[i].innerText === val) {
            console.log("match");
            $('#Name' + index).attr('value', options[i].getAttribute('data-name'));
            document.getElementById('Name' + index).value = options[i].getAttribute('data-name');
            $.post("/tai-lieu/danh-sach-kham-benh",
                {
                    username: options[i].getAttribute('data-username')
                },
                function (data, status) {
                    if (data.user) {
                        document.getElementById('Gender' + index).value = data.user.Gender;
                        document.getElementById('DOB' + index).value = data.user.DOB;
                        document.getElementById('Address' + index).value = data.user.Address;
                        document.getElementById('Username' + index).value = options[i].getAttribute('data-username');
                    }
                });
            // An item was selected from the list!
            // yourCallbackHere()
            //alert('item selected: ' + val);
            ok = true;
            break;
        }
    }
    if (!ok) {
        usernameProfile = "123";
        NamePatient = val;
    }
}

function savePatientsList() {
    let nPatients = parseInt(document.getElementsByTagName("tbody")[0].childElementCount);
    let PatientsList = [];
    for (let i = 1; i <= nPatients; i++) {
        let x = {};
        x.Username = $('#Username' + i).val();
        x.Name = $('#Name' + i).val();
        x.Address = $('#Address' + i).val();
        x.Gender = $('#Gender' + i).val();
        x.DOB = $('#DOB' + i).val();
        x.Time = $('#Time' + i).val();
        PatientsList.push(x);
    }
    $.post("/tai-lieu/danh-sach-kham-benh",
        {
            PatientsList: PatientsList
        },
        function (data, status) {
        });
}

function CalPercent() {
    var list = document.querySelectorAll('input[name^=doanhthu]');
    var total = 0;
    for (let i = 0; i < list.length; i++) {
        total += parseInt(list[i].value) || 0;
    }
    document.getElementById('total').value = total;
    for (let i = 0; i < list.length; i++) {
        let index = i + 1;
        let res = (parseInt(list[i].value) || 0) / (parseInt(total)) * 100;
        res = res.toFixed(2);
        $('#tyle-' + index).val(res);
    }
    console.log(total);
}

function autoGenerate1() {
    let index = document.getElementsByTagName("tbody")[0].childElementCount;
    $('table tbody').append(`
    <tr>
      <th scope="row" class="text-center">${index + 1}</th>
      <td class="text-center"> <input type="text" form="drug-report" list="drugs" data-index="${index + 1}" name="Name${index + 1}" value="" class="form-control mx-sm-3 border-1 text-center"> </td>
      <td class="text-center"> <input type="text" form="drug-report" data-index="${index + 1}" value="" name="Unit${index + 1}" id="Unit${index + 1}" class="form-control mx-sm-3 border-1 text-center"> </td>
      <td class="text-center"> <input type="number" form="drug-report" data-index="${index + 1}" name="Quantity${index + 1}" id="Quantity${index + 1}" class="form-control mx-sm-3 border-1 text-center"> </td>
      <td class="text-center"> <input type="number" form="drug-report" data-index="${index + 1}" name="Used${index + 1}" id="Used${index + 1}" class="form-control mx-sm-3 border-1 text-center"> </td>
    </tr>
        `);
    var x = document.querySelectorAll('input[list="drugs"]');
    for (let i = 0; i < x.length; i++) {
        x[i].addEventListener('input', onInput1);

    }
    $('input').on('input', function () {
        var val = $(this).val();
        $(this).attr('value', val);
        $(this).attr('width', val.length + 1);
    });
}
