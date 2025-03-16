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
        url: '/usermanage/logout/',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }  // 添加 token 到 header
    });
}


// 获取用户昵称
// export async function GetNickname() {
//     try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             throw new Error("发生错误，请重新登录");
//         }
//
//         const response = await service({
//             method: 'get',
//             url: '/usermanage/get-nickname/',
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data.nickname;
//     } catch (error) {
//         console.error("获取用户昵称时出错：", error);
//         if (error.response && error.response.status === 401) {
//             // alert("请重新登录");
//             await router.push('/login');
//         }
//         throw error;
//     }
// }

// 获取用户信息
export async function GetUserProfile() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("请先登录！");
        }

        const response = await service({
            method: 'get',
            url: '/usermanage/get-profile/',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("获取用户信息时出错：", error);
        if (error.response && error.response.status === 401) {
            await router.push('/login');
        } else {
            alert("发生了未知错误，请稍后重试！");
        }
        throw error;
    }
}


// 更新个人资料
export async function UpdateUserProfile(nickname, introduction) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'put',
            url: 'usermanage/edit-profile/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                nickname,
                introduction,
                // avatar,
            },
        });

        return response.data;
    } catch (error) {
        console.error('更新个人资料时出错:', error);
        alert('更新失败，请稍后重试！');
        throw error;
    }
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
