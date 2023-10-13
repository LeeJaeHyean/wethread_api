const writePost = async (req, res) => {
    console.log("마! 게시글 함 써보까!");
    try {
        const conn = await mysql.createConnection(connect);
        const sql = "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";
        const postInfo = {
            "title": req.body.title,
            "content": req.body.content,
            "user_id": req.body.user_id
        };
        await conn.execute(sql, [postInfo.title, postInfo.content, postInfo.user_id]);
        conn.end();
        res.status(201).json({ message: "SUCCESS!!!"});
    } catch(error) {
        console.error("Error ", error);
        res.status(500).json({message: "으악 에러야! 돔황챠!!!"});
    }
};

const showPosts = async (req, res) => {
    console.log("게시글 전체 확인");
    try{
        const conn = await mysql.createConnection(connect);
        const sql = "SELECT title, content, user_id FROM posts ";
        const result = await conn.query(sql);
        conn.end();
        res.status(200).json({ message: result});
    } catch(error) {
        res.status(500).json({ message: "으악 또 에러야!!"});
    }
};

const specificUser = async (req, res) => {
    console.log("특정 유저 게시글 확인");
    try {
        const conn = await mysql.createConnection(connect);
        const user_id = req.body.user_id;
        const sql = "SELECT users.name, posts.title, posts.content FROM posts JOIN users on users.id = posts.user_id WHERE users.id = ?";
        const result = await conn.query(sql, [user_id]);
        conn.end();
        res.status(201).json({message: result}); 

    } catch(error) {
        res.status(500).json({ message: "돔항챠 얘들아!! 에러 투성이야!!"});
    }
};

const modifyContent = async (req, res) => {
    console.log("게시글 수정 페이지");
    try {
        const conn = await mysql.createConnection(connect);
        const user_id = req.body.user_id;
        const post_id = req.body.id;
        const content = req.body.content;
        const sql = `UPDATE posts SET content = ? WHERE user_id = ? AND id = ?`;
        const result = await conn.query(sql, [content, user_id, post_id]);

        conn.end();
        if (result[0].affectedRows === 1) {
            res.status(200).json({ message: "게시글 수정 성공" });
        } else {
            res.status(404).json({ message: "게시글 수정 실패" });
        }

    } catch(error) {
        res.status(500).json({ message: "에러 발생: " + error.message });
    }
};

const deletePosts = async (req, res) => {
    console.log("삭제 페이지");
    try {
        const conn = await mysql.createConnection(connect);
        const sql = " DELETE FROM posts WHERE user_id = ? AND id = ? ";

        const user_id = req.body.user_id;
        const id = req.body.id;
        conn.query(sql, [user_id, id]);
        conn.end();
        res.status(200).json({ message: "게시글 삭제 완료"});
    } catch (error) {
        res.status(500).json({ message: "에러 발생: " + error.message });
    }
}

const likePost = async (req, res) => {
    console.log("아우~ 좋아유~");
    try {
        const conn = await mysql.createConnection(connect);
        const sql = " INSERT INTO likes ( user_id, post_id ) VALUES ( ?, ? ) ";
        const user_id = req.body.user_id;
        const post_id = req.body.post_id;

        conn.query(sql, [user_id, post_id]);
         res.status(201).json({message:"likeCreated"});
    } catch (error) {
        res.status(500).json({ message: "에러 발생: " + error.message });
    }
};

module.exports={
    writePost, showPosts, specificUser, modifyContent, deletePosts, likePost
}