$('#hr_content').on("click",'.appPing',function(){
    window.location.href = './appPing.html'
}).on("click",'.appPerson',function(){
    window.location.href = './appPerson.html'
}).on("click",'.appManage',function(){
    window.location.href = './appManage.html'
});
$('#foot').on('click','.app',function(){
    window.open('http://a.app.qq.com/o/simple.jsp?pkgname=com.aiju.hrm');
})
$('.register').click(function(){
    window.location.href =  './register.html'
})


