function llenarResp() {
    var resp = document.getElementById("selectResponsable");
    var idResp = resp.value;
    var nombResp = resp.options[resp.selectedIndex].innerText;
    var hr= document.getElementById("hiddenResp")
    hr.value = idResp;
    };

    function llenarLab() {
    var lab = document.getElementById("selectLabor");
    var idLab = lab.value;
    var descLab = lab.options[lab.selectedIndex].innerText;
    var hl = document.getElementById("hiddenLab");
    hl.value = idLab;

    };