import React, { useState, useEffect } from 'react';
import * as Api from '../../api';
import "./LikeButton.css";

function LikeButton({ userId, projectId }) {
    const [project, setProject] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [click, setClick] = useState(0);

    useEffect(() => {
        Api.get('projects', projectId)
            .then((res) => {
                setProject(res.data)
                return Api.get('likes', userId);})
            .then((res) => {
                const likeList = res.data;
                likeList.forEach((like) => {
                    if (like.project_id === projectId) setIsLiked(true);
                })
            })
    }, [click]);

    const clickHandler = (e) => {
        e.preventDefault();
        Api.post('setlike', { user_id: userId, project_id: projectId })
            .then((res) => {
                if (res.data.type === 'create') setIsLiked(true);
                else if (res.data.type === 'delete') setIsLiked (false);
                setClick(cur => cur + 1);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <button id="like" onClick={clickHandler} style={{ border: "none", backgroundColor:"transparent" }}>
                <i className="fa-solid fa-heart" style={{ color: isLiked ? "red" : "gray" }}/></button>
            &nbsp; {project.likes}
        </div>
    );    
}

export default LikeButton;