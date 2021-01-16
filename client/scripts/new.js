

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
});