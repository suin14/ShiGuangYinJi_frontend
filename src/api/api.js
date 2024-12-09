import service from "@/api/service.js";

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
