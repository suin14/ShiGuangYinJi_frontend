import service from "@/api/service.js";
import router from "@/router/index.js";
import axios from "axios";

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
            router.push('/login');
        } else {
            alert("发生了未知错误，请稍后重试！");
        }
        throw error;
    }
}


// 搜索文档
export async function SearchDocuments(query) {
    try {
        if (!query.trim()) {
            throw new Error("搜索关键字不能为空！");
        }

        const response = await service({
            method: 'get',
            url: '/docs/search/',
            params: { q: query }
        });

        return response.data;
    } catch (error) {
        console.error("搜索文档时出错：", error);
        alert("搜索失败，请稍后重试！");
        throw error;
    }
}

// 更新个人资料
export async function UpdateUserProfile(nickname, introduction, avatar) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const formData = new FormData();
        formData.append('nickname', nickname);
        formData.append('introduction', introduction);

        if (avatar) {
            formData.append('avatar', avatar);
        }

        const response = await service({
            method: 'put',
            url: 'usermanage/edit-profile/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        });

        return response.data;
    } catch (error) {
        console.error('更新个人资料时出错:', error);
        alert('更新失败，请稍后重试！');
        throw error;
    }
}

// 获取用户头像
export async function GetUserAvatar() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: 'usermanage/get-avatar/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response)
        return response.data;
    } catch (error) {
        console.error('获取头像时出错:', error);
        // alert('获取头像失败，请稍后重试！');
        throw error;
    }
}

// 创建文档
export async function createDocument(title, content) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const res = await service({
            method: 'post',
            url: '/docs/create/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { title, content }
        });
        return res.data;
    } catch (error) {
        console.error("创建文档失败:", error);
        throw error;
    }
}

// 获取当前用户创建的文档列表
export async function getUserDocuments() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const res = await service({
            method: 'get',
            url: '/docs/myDocs/',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error("获取文档列表失败:", error);
        throw error;
    }
}


// 删除文档
export async function deleteUserDocument(docId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const res = await service({
            method: 'delete',
            url: `/docs/delete/${docId}/`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return res.data;
    } catch (error) {
        console.error("删除文档失败:", error);
        throw error;
    }
}

// 编辑文档
export async function editDocument(docId, data) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'put',
            url: `/docs/edit/${docId}/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
        });
        return response.data;
    } catch (error) {
        console.error('更新文档失败:', error);
        throw error;
    }
}

// 获取文档创建日期
export async function getUserDocumentCreationTimes() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: 'docs/get_created_at/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.created_at;
    } catch (error) {
        console.error('获取创建时间失败:', error);
        throw error;
    }
}

// 获取用户所选日期的文章
export async function getDocsByDate(date) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: `/docs/list_docs_by_date/${date}/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('获取文章失败:', error);
        throw error;
    }
}

export async function getDocById(docId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: `/docs/get_document/${docId}/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('获取文档失败:', error);
        throw error;
    }
}


// 根据id获取用户信息
export async function GetUserById(userId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: `usermanage/user/${userId}/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('获取用户信息失败:', error);
        throw error;
    }
}

// 点赞文章
export const likeDoc = async (docId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'post',
            url: `/docs/${docId}/like/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('点赞文章失败:', error);
        throw error;
    }
};

// 查询点赞数量
export const getDocLikeCount = async (docId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: `/docs/${docId}/like/count/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('获取点赞数失败:', error);
        throw error;
    }
};


// 查询是否点赞
export const getUserLikeStatus = async (docId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: `/docs/${docId}/like/check/`,  // API 路径
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.is_liked;  // 只返回点赞状态
    } catch (error) {
        console.error('获取用户点赞状态失败:', error);
        throw error;
    }
};

// 收藏文章
export const addFavorite = async (docId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'post',
            url: `/docs/${docId}/favorite/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('收藏文章失败:', error);
        throw error;
    }
};

// 检查用户是否已收藏
export const checkUserFavorite = async (docId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: `/docs/${docId}/favorite/check/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('检查收藏状态失败:', error);
        throw error;
    }
};


//获取用户收藏的所有文章
export const getUserFavorites = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: `/docs/favorites/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('获取收藏列表失败:', error);
        throw error;
    }
};


//获取文章评论列表
export async function getArticleComments(docId) {
    try {
        const res = await service({
            method: 'get',
            url: `/docs/${docId}/comments/`,
        });
        return res.data;
    } catch (error) {
        console.error("获取评论失败:", error);
        throw error;
    }
}

// 提交文章评论
export async function postArticleComment(docId, content) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('请先登录');
    }

    const res = await service({
        method: 'post',
        url: `/docs/${docId}/comments/`,
        data: { content },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}


export async function GetRandomDocuments(count = 10) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('请先登录');
        }

        const response = await service({
            method: 'get',
            url: `/docs/random-docs/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('获取随机文档失败:', error);
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


