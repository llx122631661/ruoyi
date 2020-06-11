
$(function() {
	if ($.cookie("rmbUser") == "true") {
	        $("#username").val($.cookie("username"));
	        $("#password").val($.cookie("password"));
        }

	validateKickout();
    validateRule();
	$('.imgcode').click(function() {
		var url = ctx + "captcha/captchaImage?type=" + captchaType + "&s=" + Math.random();
		$(".imgcode").attr("src", url);
	});
});

$.validator.setDefaults({
    submitHandler: function() {
		login();
    }
});

function login() {
		$.modal.loading($("#btnSubmit").data("loading"));
		var username = $.common.trim($("input[name='username']").val());
	    var password = $.common.trim($("input[name='password']").val());
	    var validateCode = $("input[name='validateCode']").val();
	    var rememberMe = $("input[name='rememberme']").is(':checked');
	    $.ajax({
	        type: "post",
	        url: ctx + "login",
	        data: {
	            "username": username,
	            "password": password,
	            "validateCode": validateCode,
	            "rememberMe": rememberMe
	        },
	        success: function(r) {
	            if (r.code == 0) {
	            	saveCookie(username,password);
	                location.href = ctx + 'index';
	            }else if("userNameError" == r.msg){
	            	$.modal.closeLoading();
	            	$('.imgcode').click();
	            	$(".code").val("");
	            	$("#username").tips({
						side : 1,
						msg : "用户不存在",
						bg : '#FF5080',
						time : 10
					});
	            }else if("passwordError" == r.msg){
	            	$.modal.closeLoading();
	            	$('.imgcode').click();
	            	$(".code").val("");
	            	$("#password").tips({
						side : 1,
						msg : "密码错误",
						bg : '#FF5080',
						time : 10
					});
	            }else if("usernotuseerror" == r.msg){
	            	$.modal.closeLoading();
	            	$('.imgcode').click();
	            	$(".code").val("");
	            	$("#username").tips({
						side : 1,
						msg : "用户被锁定,请联系管理员",
						bg : '#FF5080',
						time : 10
					});
	            }else {
	            	$.modal.closeLoading();
	            	$('.imgcode').click();
	            	$(".code").val("");
	            	//$.modal.msg(r.msg);
	            	$("#username").tips({
						side : 1,
						msg : "登录失败,请重新登录",
						bg : '#FF5080',
						time : 10
					});
	            }
	            
	            
	        }
	    });
}
function saveCookie(username,password){
	
	if($("#rememberme").attr("checked")){
		$.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
		$.cookie("username", username, { expires: 7 });
        $.cookie("password", password, { expires: 7 });
	}
}



function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
        	
            username: {
                required: icon + "请输入您的用户名",
            },

            password: {
                required: icon + "请输入您的密码",
            }
        }
    })
}

function validateKickout() {
	if (getParam("kickout") == 1) {
	    layer.alert("<font color='red'>您已在别处登录，请您修改密码或重新登录</font>", {
	        icon: 0,
	        title: "系统提示"
	    },
	    function(index) {
	        //关闭弹窗
	        layer.close(index);
	        if (top != self) {
	            top.location = self.location;
	        } else {
	            var url  =  location.search;
	            if (url) {
	                var oldUrl  = window.location.href;
	                var newUrl  = oldUrl.substring(0,  oldUrl.indexOf('?'));
	                self.location  = newUrl;
	            }
	        }
	    });
	}
}

function getParam(paramName) {
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}