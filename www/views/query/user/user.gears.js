var script = new Script();
function User () {
    this.showUserResult = function (){
        var that = this;
        $("#excelDataTable").find("tbody").remove();
        var data = {
            UserStatus: $('#UserStatus').val(),
            UserOrder: $('#UserOrder').val()
        };
        $.ajax({
            method: "POST",
            url: "/user/result",
            data: data,
            complete: function(data){
                if(data.status !== 500){
                    data = data.responseJSON;
                    data = JSON.parse(data);
                    console.log(data);
                    script.buildHtmlTable(data);
                }
            },
            error: function (data){
                alert("ERROR " + data);
            }
        });
    }
    this.showAllUserStatus = function (){
        var that = this;
        $.ajax({
            method: "GET",
            url: "/user/status",
            complete: function(data){
                if(data.status !== 500){
                    data = data.responseJSON;
                    data = JSON.parse(data);
                    var template = "{{#.}}" +
                        "<option>{{статус клієнта}}</option>" +
                        "{{/.}}";
                    var rendered = Mustache.render(template, data);
                    $('#UserStatus').append(rendered);
                }
            }
        });
    }
    this.showAllUserOrder = function (){
        var that = this;
        $.ajax({
            method: "GET",
            url: "/user/order",
            complete: function(data){
                if(data.status !== 500){
                    data = data.responseJSON;
                    data = JSON.parse(data);
                    var template = "{{#.}}" +
                        "<option>{{назва послуги}}</option>" +
                        "{{/.}}";
                    var rendered = Mustache.render(template, data);
                    $('#UserOrder').append(rendered);
                }
            }
        });
    }
}