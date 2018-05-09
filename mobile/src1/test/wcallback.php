public function creatqrAction(){
    if($_GET['app']){
        $wtoken=$_COOKIE['wtoken'];
        $postdata=$_SESSION['w_state'];
        if($wtoken){
            $postdata=$wtoken;
        }
        include CONFIG_PATH . 'phpqrcode/'.'phpqrcode.php'
        $sh=$this->shar1();
        $value="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx138697ef383a9167&redirect_uri=http://www.xxx.net/login/wcallback&response_type=code&scope=snsapi_userinfo&state=".$postdata."&connect_redirect=1#wechat_redirect";
        $errorCorrectionLevel = "L";
        $matrixPointSize = "5";
        QRcode::png($value, false, $errorCorrectionLevel, $matrixPointSize);
    }
}