import { useEffect, useState } from "react"
import Button from "../UI/Button"
import { addComment, getComments } from "../../services";
import { useTaskStore } from "../../store/useTaskStore";

function CommentSection({ task }: { task: DetailTask }) {
    const [commentValue, setCommentValue] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [activeReply, setActiveReply] = useState<number | null>(null);
    const [replyValue, setReplyValue] = useState("");
    const { tasks, updateTaskComments, fetchTasks } = useTaskStore();

    useEffect(() => {
        async function fetchComments() {
            const response = await getComments(task.id);
            setComments(response.map((c: Comment) => ({
                ...c,
                sub_comments: c.sub_comments || []
            })));
        }
        fetchComments();
    }, [task.id])


    async function handleSubmitComment(parentId: null | number = null) {
        try {
            if (commentValue.trim().length === 0) return;
            const response = await addComment(task.id, commentValue, parentId);
            setCommentValue("");

            const commentWithSubs = { ...response, sub_comments: response.sub_comments || [] };

            if (parentId) {
                setComments(prev => prev.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            sub_comments: [...(comment.sub_comments || []), commentWithSubs]
                        };
                    }
                    return comment;
                }));
            } else {
                setComments(prev => [...prev, commentWithSubs]);
            }
            const newTotal = comments.length + comments.reduce((acc, c) => acc + c.sub_comments?.length, 0) + 1;
            updateTaskComments(task.id, newTotal);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }

    async function handleSubmitReply(parentId: number) {
        try {
            if (replyValue.trim().length === 0) return;
            const response = await addComment(task.id, replyValue, parentId);
            setReplyValue("");
            setActiveReply(null);

            setComments(prev => prev.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        sub_comments: [...comment.sub_comments, response]
                    };
                }
                return comment;
            }));

            const newTotal = comments.length + 1 + comments.reduce((acc, c) => acc + c.sub_comments?.length, 0);
            updateTaskComments(task.id, newTotal);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])
    const totalCommentsFromStore = tasks.find((item) => item.id === task.id)?.total_comments || 0;

    function handlingReply(id: number) {
        setActiveReply(prev => prev === id ? null : id);
        setReplyValue("");
    }

    return (
        <div className="mt-[59px]">
            <div className="border-solid border-[0.3px] border-[#DDD2FF]  bg-[#F8F3FE] rounded-[10px] py-[40px] px-[45px] ">
                <div className="relative mb-[60px]">
                    <textarea value={commentValue} onChange={(e) => setCommentValue(e.target.value)} className="relative inset-0 outline-none py-[18px] px-[20px] border-[0.3px] resize-none w-[100%] h-[135px] border-[#DDD2FF] rounded-[10px] bg-white placeholder:text-[#898989] placeholder:text-[14px]" placeholder="დაწერე კომენტარი">

                    </textarea>
                    <div className="absolute bottom-[20px] right-[20px] *:font-[400]">
                        <Button disabled={commentValue.length === 0} type="submit" variant="primary" shape="pill" padding="compact" onClick={() => handleSubmitComment()}>დააკომენტარე</Button>
                    </div>
                </div>
                <div className="mb-[40px]"><h2 className="text-[20px] text-[#000] font-[500] flex gap-[10px] items-center">კომენტარები <span className="w-[30px] grid place-items-center h-[22px] bg-[#8338ec]  rounded-[30px] text-[14px] text-white">{totalCommentsFromStore} </span> </h2></div>
                <div className="flex flex-col gap-[38px] max-h-[734px] overflow-auto">
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id}>

                                <div className="flex gap-[12px]"><img className="w-[38px] h-[38px]" src={comment.author_avatar} />
                                    <div className="grow-1">
                                        <div>
                                            <h2 className=" text-[#021526] text-[16px] font-medium">{comment.author_nickname}</h2>
                                            <p className="text-[#343a40] text-[16px] mt-[8px] mb-[8px]">{comment.text}</p>
                                            <div onClick={() => handlingReply(comment?.id)} className="flex gap-[6px] items-center cursor-pointer"><img src="/svg/replyIcon.svg" alt="" /> <span className="text-[12px] text-[#8338ec]">უპასუხე</span></div>
                                        </div>

                                        {activeReply === comment.id && (
                                            <div className="mt-[12px]">
                                                <div className="relative">
                                                    <textarea
                                                        value={replyValue}
                                                        onChange={(e) => setReplyValue(e.target.value)}
                                                        placeholder="დაწერეთ პასუხი"
                                                        className="outline-none py-[18px] px-[20px] border-[0.3px] resize-none w-[100%] h-[135px] border-[#DDD2FF] rounded-[10px] bg-white placeholder:text-[#898989] placeholder:text-[14px]"

                                                    ></textarea>
                                                    <div className="absolute bottom-[20px] right-[20px] *:font-[400]">
                                                        <Button disabled={replyValue.length === 0} type="submit" variant="primary" shape="pill" padding="compact" onClick={() => handleSubmitReply(comment.id)}>დააკომენტარე</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {comment.sub_comments?.length > 0 && comment.sub_comments.map((sub_comment) => {
                                            return (
                                                <div key={sub_comment.id} className="flex gap-[12px] mt-[20px]">
                                                    <img className="w-[38px] h-[38px] " src={sub_comment?.author_avatar} alt="" />
                                                    <div>
                                                        <h2 className=" text-[#021526] text-[16px] font-medium">{sub_comment?.author_nickname}</h2>
                                                        <p className="text-[#343a40] text-[16px] mt-[8px] mb-[8px]">{sub_comment?.text}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default CommentSection
