function BMR(){
    var w=document.getElementById('weight').value;
    var h=document.getElementById('height').value;
    var a=document.getElementById('age').value;
    if(document.getElementById('gender').value=="Nam"){
        var bmr= 66 + (13.7*weight) + (5*height)-(6.8*aage) ;
        var bmro=(bmr.toFixed(2));
        document.getElementById("result1").innerHTML="Chỉ số BMR của bạn là: " + bmro +" calories";
    }
    if(document.getElementById('gender').value=="Nu"){
        var bmr= 655 + (9.6*w) + (1.8*h)-(4.7*a) ;
        var bmro=(bmr.toFixed(2));
        document.getElementById("result1").innerHTML="Chỉ số BMR của bạn là: " + bmro +" calories";
    }
    }
    
    
    function TDEE(){
        var bmr=document.getElementById('bmr').value;
        if(document.getElementById('dot1').checked==true){
            var tdee= bmr*1.2;
            var tdeeo=(tdee.toFixed(2));
        }
        if(document.getElementById('dot2').checked==true){
            var tdee= bmr*1.4;
            var tdeeo=(tdee.toFixed(2));
        }
        if(document.getElementById('dot3').checked==true){
            var tdee= bmr*1.6;
            var tdeeo=(tdee.toFixed(2));
        }
        if(document.getElementById('dot4').checked==true){
            var tdee= bmr*1.75;
            var tdeeo=(tdee.toFixed(2));
        }
        if(document.getElementById('dot1goal').checked==true){
            var result=tdeeo - 150;
            document.getElementById('result2').innerHTML="TDEE 1 ngày để bạn giảm cân: " + result + " calories";
        }
        if(document.getElementById('dot2goal').checked==true){
            var result=tdeeo;
            document.getElementById('result2').innerHTML="TDEE 1 ngày để bạn tăng cân: " + result + " calories";
        }
        if(document.getElementById('dot3goal').checked==true){
            var result=tdeeo + 150;
            document.getElementById('result2').innerHTML="TDEE 1 ngày để bạn duy trì cân: " + result + " calories";
        }
    
    }