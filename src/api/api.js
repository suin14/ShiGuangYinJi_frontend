import service from "@/api/service.js";

// 注册
export function Register(data) {
    return service({
        method: 'post',
        url: 'usermanage/register/',
        data
    })
}

// 检查用户名是否已存在
export function CheckUsernameExist(username) {
    return service({
        method: 'post',
        url: 'usermanage/check-username/',
        data: { username },
        headers: { 'Content-Type': 'application/json' }
    })
}

// 检查手机号是否已存在
export function CheckPhoneExist(phone) {
    return service({
        method: 'post',
        url: 'usermanage/check-phone/',
        data: { phone },
        headers: { 'Content-Type': 'application/json' }
    });
}

// 登录
export function Login(data) {
    return service({
        method: 'post',
        url: 'usermanage/login/',
        data
    })
}


// 登出
export function Logout() {
    return service({
        method: 'post',
        url: '/usermanage/logout/',  // 登出接口
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }  // 添加 token 到 header
    });
}


//开始智能体对话
export async function AichatStart() {
    try {
        const res = await service({
            method: 'get',
            url: '/aichat/start/',
        });
        return res.data;
    } catch (error) {
        console.error("请求失败:", error);
        throw error;
    }
}

//对话智能体
export async function AichatAsk(question, user, conversation_id) {
    try {
        const formData = new FormData();
        formData.append('question', question);
        formData.append('user', user);
        formData.append('conversation_id', conversation_id);

        const res = await service({
            method: 'post',
            url: '/aichat/start/',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return res.data;
    } catch (error) {
        console.error("请求失败:", error);
        throw error;
    }
}
