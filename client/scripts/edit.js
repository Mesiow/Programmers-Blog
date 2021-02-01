

$(document).ready(function(){
    $("#file-img").change(function() {
        if(this.files && this.files[0]){
            let reader = new FileReader();
            reader.onload = function(e) {
                $("#image").attr("src", e.target.result);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    //Copy path to text input for comparing later
    /*$("#file-img").change(function(){
        $("#copy-img").val($("#file-img").val());
        let path = $("#copy-img").val();
        let parsed = path.slice(12, path.length);
        $("#copy-img").val(parsed);
    });*/
});