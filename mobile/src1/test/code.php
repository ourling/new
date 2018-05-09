public function wcallbackAction(){
    $code = $_GET['code'];
    $state = $_GET['state'];
    $setting = include CONFIG_PATH . 'setting.php';
    $appid=$setting['weixin']['appid'];
    $appsecret=$setting['weixin']['appsecret'];
    if (emptyempty($code)) $this->showMessage('授权失败');
        try{
            $token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$appsecret.'&code='.$code.'&grant_type=authorization_code';
            $token = json_decode($this->https_request($token_url));
        }
        catch(Exception $e)
        {
            print_r($e);
        }
    if (isset($token->errcode)) {
        echo '<h1>错误：</h1>'.$token->errcode;
        echo '<br/><h2>错误信息：</h2>'.$token->errmsg;
        exit;
    }
    $access_token_url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='.$appid.'&grant_type=refresh_token&refresh_token='.$token->refresh_token;
    //转成对象
    $access_token = json_decode($this->https_request($access_token_url));
    if (isset($access_token->errcode)) {
        echo '<h1>错误：</h1>'.$access_token->errcode;
        echo '<br/><h2>错误信息：</h2>'.$access_token->errmsg;
        exit;
    }
    $user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token->access_token.'&openid='.$access_token->openid.'&lang=zh_CN';
    //转成对象
    $user_info = json_decode($this->https_request($user_info_url));
    if (isset($user_info->errcode)) {
        echo '<h1>错误：</h1>'.$user_info->errcode;
        echo '<br/><h2>错误信息：</h2>'.$user_info->errmsg;
        exit;
    }
    //打印用户信息
    // echo '<pre>';
    // print_r($user_info);
    // echo '</pre>';
    //获取unionid
    $uid=$user_info->unionid;
    }
    //用户操作处理 分为再次登录和第一次登陆
    $sql="select h_user_id from dtb_user_binded as t1 left join dtb_user_weixin as t2 on t1.u_id=t2.id where t1.u_type='".
    User::$arrUtype['weixin_num_t']."' and t2.openid='$user_info->unionid'";
    $h_user_id = Core_Db::getOne($sql);
    if(!emptyempty($h_user_id)){//该weixin号再次登录

    }{//该weixin号第一次登录
}