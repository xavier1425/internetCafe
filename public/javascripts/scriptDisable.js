function Edit(id) {
	window.location.href = "/userEdit/" + id;
}

function Delete(id) {
	var rs = confirm('Confirm to delete?');
	if (rs) {
		window.location.href = "/userDelete/" + id;
	}
}

function Check() {

	var id = document.getElementsByName('userid')[0].value;
	var pwd = document.getElementsByName('password')[0].value;
	var mail = document.getElementsByName('email')[0].value;
	if (id && pwd && mail) {
		return true;
	}
	alert('please input the info.');
	return false;

}